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
    console.log(this.refs.signupContainer.refs.signupForm.validate());
    let value = this.refs.signupContainer.refs.signupForm.getValue();
    if (value) {
      this.onClick(profileType, value);
    }
  };

  render() {
    return (
      <SignUp
        ref="signupContainer"
        onSignUpClicked={this.onSignUpClicked}
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
  navigation: PropTypes.object.isRequired
};
