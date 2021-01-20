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
import { getAuth0AccessToken } from '../../utils/user';
import Config from 'react-native-config';
import Auth0 from 'react-native-auth0';

const auth0 = new Auth0({ domain: Config.AUTH0_DOMAIN, clientId: Config.AUTH0_CLIENT_ID });

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

  async componentDidMount() {
    let authtoken = await getAuth0AccessToken();
    auth0.auth.userInfo({ token: authtoken })
      .then((res) => {
        let formValue = {
          ...this.state.formValue,
          email: res.email
        }
        this.setState({ formValue: formValue })
      })
  }

  async componentDidUpdate() {
    if (this.state.formValue === {}) {
      let authtoken = await getAuth0AccessToken();
      auth0.auth.userInfo({ token: authtoken })
        .then((res) => {
          let formValue = {
            ...this.state.formValue,
            email: res.email
          }
          this.setState({ formValue: formValue })
        })
    }
  }
  onSignUpClicked = async (profileType, signupForm, token, refreshToken) => {
    //debug(signupForm.validate());
    let formValue = signupForm.getValue();
    let authtoken = await getAuth0AccessToken();
    if (formValue) {
      auth0.auth
        .userInfo({ token: authtoken })
        .then((res) => {
          formValue = {
            ...formValue,
            email: res.email
          }
          this.props
            .signUp(profileType, formValue, token, this.props.navigation)
            .then((/* success */) => { })
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
        })
        .catch(console.error);
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
