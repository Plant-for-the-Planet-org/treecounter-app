import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Redemption from '../../components/Redemption/index';
import { currentUserProfileSelector } from '../../selectors';
import { updateRoute } from '../../helpers/routerHelper';
import {
  redemptionCodeSelector,
  validationCodeSelector
} from '../../selectors/index';
import {
  validateCodeAction,
  setRedemptionCodeAction
} from '../../actions/redemptionAction';
import { setAccessDenied } from '../../actions/authActions';

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
      path: match.path.includes('claim') ? 'claim' : 'redeem'
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.match !== this.props.match) {
      // let isLoggedIn = null !== nextProps.userProfile;
      this.setState({ code: nextProps.match.params.code });
    }
  }
  componentDidMount() {
    let isLoggedIn = this.props.userProfile ? true : false;
    let isCode = this.state.code ? true : false;
    if (isCode && isLoggedIn) {
      this.props.validateCodeAction({
        type: this.state.type,
        code: this.state.code
      });
    }
  }
  componentDidUpdate() {
    let isLoggedIn = this.props.userProfile ? true : false;
    let isCode = this.state.code ? true : false;
    if (isCode && isLoggedIn && this.props.validateCodeInfo === null) {
      this.props.validateCodeAction({
        type: this.state.type,
        code: this.state.code
      });
    }
  }
  validateCode = () => {
    console.log(this.refs.redemptionContainer.refs.redemptionForm.getValue());
    let value = this.refs.redemptionContainer.refs.redemptionForm.getValue();
    let path;
    if (this.state.path === 'claim') {
      path = 'app_claim';
    } else if (this.state.path === 'redeem') {
      path = 'app_redeem';
    }
    if (value) {
      updateRoute(path, null, null, {
        type: this.state.type,
        code: value.code
      });
    }
  };
  setRedemptionCode = () => {
    console.log(this.refs.redemptionContainer.refs.redemptionForm.getValue());
    let value = this.refs.redemptionContainer.refs.redemptionForm.getValue();
    let path;
    if (this.state.path === 'claim') {
      path = 'app_claim';
    } else if (this.state.path === 'redeem') {
      path = 'app_redeem';
    }
    if (value) {
      this.props.setRedemptionCodeAction({
        type: this.state.type,
        code: this.state.code
      });
    }
  };
  loginButton = () => {
    const path =
      '/' + this.state.path + '/' + this.state.type + '/' + this.state.code;
    this.props.setAccessDenied({ uri: path }, null, 'app_login');
  };
  signupButton = () => {
    const path =
      '/' + this.state.path + '/' + this.state.type + '/' + this.state.code;
    this.props.setAccessDenied({ uri: path }, null, 'app_signup');
  };
  render() {
    return (
      <Redemption
        ref={'redemptionContainer'}
        code={this.state.code}
        page_status={this.state.page_status}
        validateCodeInfo={this.props.validateCodeInfo}
        updateRoute={this.props.route}
        setRedemptionCode={this.setRedemptionCode}
        isLoggedIn={this.props.userProfile}
        validateCode={this.validateCode}
        loginButton={this.loginButton}
        signupButton={this.signupButton}
        path={this.state.path}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    userProfile: currentUserProfileSelector(state),
    validateCodeInfo: validationCodeSelector(state),
    redemptCodeInfo: redemptionCodeSelector(state)
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      validateCodeAction,
      setAccessDenied,
      setRedemptionCodeAction,
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
  validateCodeInfo: PropTypes.func,
  redemptCodeInfo: PropTypes.func,
  validateCodeAction: PropTypes.func,
  setRedemptionCodeAction: PropTypes.func,
  setAccessDenied: PropTypes.func
};
