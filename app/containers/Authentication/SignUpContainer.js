import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import React from 'react';
import PropTypes from 'prop-types';

import { updateRoute } from '../../helpers/routerHelper';
import { SignUp } from '../../components/Authentication';
import { signUp } from '../../actions/signupActions';

class SignUpContainer extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick(profileType, value) {
    this.props.signUp(profileType, value);
  }

  onSignUpClicked = profileType => {
    // let result = this.refs.loginForm.validate();
    // if (result.isValid()) {
    let value = this.refs.signupContainer.refs.signupForm.getValue();
    if (value) {
      this.onClick(profileType, value);
    }
    // } else if (this.props.onError) {
    //   this.props.onError(result.errors);
    // }
  };

  render() {
    return (
      <SignUp
        ref="signupContainer"
        onSignUpClicked={this.onSignUpClicked}
        updateRoute={this.props.route}
      />
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      signUp,
      route: (routeName, id) => dispatch => updateRoute(routeName, dispatch, id)
    },
    dispatch
  );
};

export default connect(null, mapDispatchToProps)(SignUpContainer);

SignUpContainer.propTypes = {
  signUp: PropTypes.func,
  route: PropTypes.func
};
