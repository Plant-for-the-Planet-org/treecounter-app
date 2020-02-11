import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { debug } from '../../debug';
import Redemption from '../../components/Redemption/index';
import { currentUserProfileSelector } from '../../selectors';
import { updateRoute } from '../../helpers/routerHelper';
import {
  validateCodeAction,
  setRedemptionCodeAction
} from '../../actions/redemptionAction';
import { setAccessDenied } from '../../actions/authActions';
import i18n from '../../locales/i18n.js';

class RedemptionContainer extends Component {
  constructor(props) {
    super(props);
    const { match } = props;
    let type = 'gift',
      code = null,
      path = null;
    if (match) {
      if (match.params.type) {
        type = match.params.type;
      }
      if (match.params.code) {
        code = match.params.code;
      }
      path = match.path;
    } else if (props.navigation) {
      type = props.navigation.getParam('type', type);
      code = props.navigation.getParam('code', code);
      path = props.navigation.state.routeName;
    }
    this.state = {
      code: code,
      type: type,
      pageStatus: 'code-unknown',
      codeStatus: 'error',
      statusText: '',
      successText: '',
      errorText: '',
      actionText: '',
      buttonText: i18n.t('label.redeem_code'),
      tpos: null,
      loading: true,
      path: path.includes('claim') ? 'claim' : 'redeem'
    };
  }
  callSetState(isCode, isLoggedIn, code, type) {
    if (isCode && isLoggedIn) {
      this.setState({ loading: true });
      validateCodeAction({
        type: type,
        code: code
      }).then(
        success => {
          this.setState({
            loading: false,
            pageStatus: 'code-validated',
            codeStatus: success.data.status,
            statusText: success.data.statusText,
            successText: success.data.successText,
            errorText: success.data.errorText,
            actionText: success.data.actionText,
            buttonText: success.data.buttonText,
            tpos: success.data.tpos
          });
        },
        error => {
          debug(error);
        }
      );
    } else if (isCode && !isLoggedIn) {
      this.setState({
        loading: false,
        pageStatus: 'not-logged-in',
        actionText: i18n.t('label.log_in'),
        statusText: '',
        successText: '',
        errorText: '',
        buttonText: i18n.t('label.redeem_code'),
        tpos: null
      });
    } else {
      this.setState({
        loading: false,
        pageStatus: 'code-unknown',
        actionText: i18n.t('label.enter_code'),
        statusText: '',
        successText: '',
        errorText: '',
        code: '',
        buttonText: i18n.t('label.redeem_code'),
        tpos: null
      });
    }
  }
  componentDidMount() {
    let isLoggedIn = this.props.userProfile ? true : false;
    let isCode = this.state.code ? true : false;
    this.callSetState(isCode, isLoggedIn, this.state.code, this.state.type);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.match && this.props.match) {
      if (
        nextProps.match !== this.props.match ||
        nextProps.userProfile != this.props.userProfile
      ) {
        // let isLoggedIn = null !== nextProps.userProfile;
        this.setState({ code: nextProps.match.params.code });
        let isLoggedIn = nextProps.userProfile ? true : false;
        let isCode = nextProps.match.params.code ? true : false;
        this.callSetState(
          isCode,
          isLoggedIn,
          nextProps.match.params.code,
          nextProps.match.params.type
        );
      }
    } else if (nextProps.navigation && this.props.navigation) {
      if (
        nextProps.navigation !== this.props.navigation ||
        nextProps.userProfile != this.props.userProfile
      ) {
        let type = 'gift';
        let code = null;
        type = nextProps.navigation.getParam('type', type);
        code = nextProps.navigation.getParam('code', code);
        this.setState({ code: code });
        let isLoggedIn = nextProps.userProfile ? true : false;
        let isCode = code ? true : false;
        this.callSetState(isCode, isLoggedIn, code, type);
      }
    }
  }
  validateCode(data) {
    let value = data;
    let path;
    if (this.state.path === 'claim') {
      path = 'app_claim';
    } else if (this.state.path === 'redeem') {
      path = 'app_redeem';
    }
    if (value) {
      updateRoute(path, this.props.navigation, null, {
        type: this.state.type,
        code: value.replace(/\s/g, '')
      });
    }
  }
  setRedemptionCode(data) {
    let value = data;
    this.setState({ loading: true });
    if (value) {
      setRedemptionCodeAction({
        type: this.state.type,
        code: this.state.code.replace(/\s/g, '')
      }).then(
        success => {
          this.setState({
            loading: false,
            pageStatus: 'success',
            codeStatus: success.data.response.status,
            statusText: success.data.response.statusText,
            successText: success.data.response.successText,
            errorText: success.data.response.errorText,
            actionText: success.data.response.actionText,
            buttonText: i18n.t('label.my_trees'),
            tpos: success.data.response.tpos
          });
          if (success.data.response.status === 'error') {
            this.setState({ pageStatus: 'code-validated' });
          }
        },
        error => {
          debug(error);
        }
      );
    }
  }
  loginButton = () => {
    const path =
      '/' + this.state.path + '/' + this.state.type + '/' + this.state.code;
    this.setState({ loading: true });
    this.props.setAccessDenied(
      { uri: path },
      null,
      'app_login',
      this.props.navigation
    );
  };
  signupButton = () => {
    const path =
      '/' + this.state.path + '/' + this.state.type + '/' + this.state.code;
    this.setState({ loading: true });
    this.props.setAccessDenied(
      { uri: path },
      null,
      'app_signup',
      this.props.navigation
    );
  };
  render() {
    return (
      <Redemption
        code={this.state.code}
        pageStatus={this.state.pageStatus}
        route={(routeName, id, params) =>
          this.props.route(routeName, id, params, this.props.navigation)
        }
        setRedemptionCode={data => this.setRedemptionCode(data)}
        isLoggedIn={this.props.userProfile}
        validateCode={data => this.validateCode(data)}
        loginButton={this.loginButton}
        signupButton={this.signupButton}
        path={this.state.path}
        codeStatus={this.state.codeStatus}
        statusText={this.state.statusText}
        successText={this.state.successText}
        errorText={this.state.errorText}
        actionText={this.state.actionText}
        buttonText={this.state.buttonText}
        tpos={this.state.tpos}
        loading={this.state.loading}
        navigation={this.props.navigation}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    userProfile: currentUserProfileSelector(state)
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      setAccessDenied,
      route: (routeName, id, params, navigation) => dispatch =>
        updateRoute(routeName, navigation || dispatch, id, params)
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(
  RedemptionContainer
);

RedemptionContainer.propTypes = {
  match: PropTypes.object,
  route: PropTypes.func,
  userProfile: PropTypes.object,
  setRedemptionCode: PropTypes.func,
  setAccessDenied: PropTypes.func,
  navigation: PropTypes.any,
  location: PropTypes.object
};
