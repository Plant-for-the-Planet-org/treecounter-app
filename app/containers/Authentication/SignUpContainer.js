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
    this.state = { formValue: {} };
  }

  onSignUpClicked = profileType => {
    console.log(this.refs.signupContainer.refs.signupForm.validate());
    let formValue = this.refs.signupContainer.refs.signupForm.getValue();
    if (formValue) {
      this.props.signUp(profileType, formValue);
      this.setState({ formValue: formValue });
    }
  };

  render() {
    return (
      <SignUp
        ref="signupContainer"
        onSignUpClicked={this.onSignUpClicked}
        formValue={this.state.formValue}
        updateRoute={(routeName, id) =>
          this.props.route(routeName, id, this.props.navigation)
        }
      />
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      signUp,
      route: (routeName, id, navigation) => dispatch =>
        updateRoute(routeName, navigation || dispatch, id)
    },
    dispatch
  );
};

export default connect(null, mapDispatchToProps)(SignUpContainer);

SignUpContainer.propTypes = {
  signUp: PropTypes.func,
  route: PropTypes.func,
  navigation: PropTypes.object
};
