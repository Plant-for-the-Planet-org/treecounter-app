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
      page_status: 'code-unknown',
      code_status: 'error',
      status_text: '',
      success_text: '',
      error_text: '',
      action_text: '',
      button_text: i18n.t('label.redeem_code'),
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
            page_status: 'code-validated',
            code_status: success.data.status,
            status_text: success.data.statusText,
            success_text: success.data.successText,
            error_text: success.data.errorText,
            action_text: success.data.actionText,
            button_text: success.data.buttonText,
            tpos: success.data.tpos
          });
        },
        error => {}
      );
    } else if (isCode && !isLoggedIn) {
      this.setState({
        loading: false,
        page_status: 'not-logged-in',
        action_text: i18n.t('label.log_in')
      });
    } else {
      this.setState({
        loading: false,
        page_status: 'code-unknown',
        action_text: i18n.t('label.enter_code')
      });
    }
  }
  componentWillMount() {
    let isLoggedIn = this.props.userProfile ? true : false;
    let isCode = this.state.code ? true : false;
    this.callSetState(isCode, isLoggedIn, this.state.code, this.state.type);
  }
  componentWillUpdate(nextProps, nextState) {
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
  validateCode = () => {
    let value = this.refs.redemptionContainer.refs.redemptionForm.getValue();
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
  };
  setRedemptionCode = () => {
    let value = this.refs.redemptionContainer.refs.redemptionForm.getValue();
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
            page_status: 'success',
            code_status: success.data.response.status,
            status_text: success.data.response.statusText,
            success_text: success.data.response.successText,
            error_text: success.data.response.errorText,
            action_text: success.data.response.actionText,
            button_text: success.data.response.buttonText,
            tpos: success.data.response.tpos
          });
          if (success.data.response.status === 'error') {
            this.setState({ page_status: 'code-validated' });
          }
        },
        error => {}
      );
    }
  };
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
        ref={'redemptionContainer'}
        code={this.state.code}
        page_status={this.state.page_status}
        updateRoute={this.props.route}
        setRedemptionCode={this.setRedemptionCode}
        isLoggedIn={this.props.userProfile}
        validateCode={this.validateCode}
        loginButton={this.loginButton}
        signupButton={this.signupButton}
        path={this.state.path}
        code_status={this.state.code_status}
        status_text={this.state.status_text}
        success_text={this.state.success_text}
        error_text={this.state.error_text}
        action_text={this.state.action_text}
        button_text={this.state.button_text}
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
