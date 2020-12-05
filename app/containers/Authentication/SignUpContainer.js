import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import React from 'react';
import PropTypes from 'prop-types';
import { debug } from '../../debug';
import { updateRoute } from '../../helpers/routerHelper';
import { SignUp } from '../../components/Authentication';
import { signUp } from '../../actions/signupActions';
import { schemaOptions } from '../../server/parsedSchemas/signup';
import { handleServerResponseError } from '../../helpers/utils';

class SignUpContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { formValue: {}, schemaOptions };
  }

  componentWillUnmount() {
    if (!this.props.navigation) {
      let gBatch = document.getElementsByClassName('grecaptcha-badge');
      if (gBatch.length > 0) {
        gBatch[0].style.visibility = 'hidden';
      }
    }
  }

  onSignUpClicked = (profileType, signupForm, token, refreshToken) => {
    //debug(signupForm.validate());
    let formValue = signupForm.getValue();
    if (formValue) {
      this.props
        .signUp(profileType, formValue, token, this.props.navigation)
        .then((/* success */) => {})
        .catch(err => {
          if (refreshToken) refreshToken();
          debug('err signup data', err);
          let newSchemaOptions = handleServerResponseError(
            err,
            this.state.schemaOptions[profileType]
          );
          this.setState(
            {
              schemaOptions: {
                ...this.state.schemaOptions,
                [profileType]: newSchemaOptions
              }
            },
            () => {
              signupForm.validate();
            }
          );
        });
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
        {...this.props}
        schemaOptions={this.state.schemaOptions}
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
  navigation: PropTypes.any
};
