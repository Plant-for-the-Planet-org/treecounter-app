import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import React from 'react';
import PropTypes from 'prop-types';

import ForgotPassword from '../../components/Authentication/ForgotPassword';
import { forgot_password } from '../../actions/authActions';
import { updateRoute } from '../../helpers/routerHelper';

class ForgotPasswordContainer extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }
  onPress = () => {
    // let result = this.refs.forgotPasswordForm.validate();
    // if (result.isValid()) {
    let value = this.refs.forgotPasswordContainer.refs.forgotPasswordForm.getValue();
    if (value) {
      this.onClick(value);
    }
    // } else if (this.props.onError) {
    //   this.props.onError(result.errors);
    // }
  };

  onClick(value) {
    this.props.forgot_password(value);
  }

  render() {
    return (
      <ForgotPassword
        ref="forgotPasswordContainer"
        onResetPassword={this.onPress}
        updateRoute={this.props.route}
      />
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      forgot_password,
      route: (routeName, id) => dispatch => updateRoute(routeName, dispatch, id)
    },
    dispatch
  );
};

export default connect(null, mapDispatchToProps)(ForgotPasswordContainer);

ForgotPasswordContainer.propTypes = {
  forgot_password: PropTypes.func,
  route: PropTypes.func
};
