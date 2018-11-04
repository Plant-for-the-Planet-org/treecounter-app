import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
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
    let type;
    if (
      (match.path.includes('redeem') && match.params.type === null) ||
      match.params.type === undefined
    ) {
      type = 'gift';
    } else {
      type = match.params.type;
    }
    this.state = {
      code: match.params.code,
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
      path: match.path.includes('claim') ? 'claim' : 'redeem'
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
        error => {}
      );
    } else if (isCode && !isLoggedIn) {
      this.setState({
        loading: false,
        pageStatus: 'not-logged-in',
        actionText: i18n.t('label.log_in')
      });
    } else {
      this.setState({
        loading: false,
        pageStatus: 'code-unknown',
        actionText: i18n.t('label.enter_code')
      });
    }
  }
  componentDidMount() {
    let isLoggedIn = this.props.userProfile ? true : false;
    let isCode = this.state.code ? true : false;
    this.callSetState(isCode, isLoggedIn, this.state.code, this.state.type);
  }
  componentWillReceiveProps(nextProps) {
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
      // let isCode = value ? true : false;
      // this.callSetState(isCode);
      updateRoute(path, null, null, {
        type: this.state.type,
        code: value.code
      });
    }
  }
  setRedemptionCode(data) {
    let value = data;
    let path;
    if (this.state.path === 'claim') {
      path = 'app_claim';
    } else if (this.state.path === 'redeem') {
      path = 'app_redeem';
    }
    this.setState({ loading: true });
    if (value) {
      setRedemptionCodeAction({
        type: this.state.type,
        code: this.state.code
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
            buttonText: success.data.response.buttonText,
            tpos: success.data.response.tpos
          });
          if (success.data.response.status === 'error') {
            this.setState({ pageStatus: 'code-validated' });
          }
        },
        error => {}
      );
    }
  }
  loginButton = () => {
    const path =
      '/' + this.state.path + '/' + this.state.type + '/' + this.state.code;
    this.setState({ loading: true });
    this.props.setAccessDenied({ uri: path }, null, 'app_login');
  };
  signupButton = () => {
    const path =
      '/' + this.state.path + '/' + this.state.type + '/' + this.state.code;
    this.setState({ loading: true });
    this.props.setAccessDenied({ uri: path }, null, 'app_signup');
  };
  render() {
    return (
      <Redemption
        code={this.state.code}
        pageStatus={this.state.pageStatus}
        updateRoute={this.props.route}
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
      route: (routeName, id) => dispatch => updateRoute(routeName, dispatch, id)
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
  setAccessDenied: PropTypes.func
};
