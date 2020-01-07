import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import { login } from '../../actions/authActions';
import { updateRoute } from '../../helpers/routerHelper';
import Login from '../../components/Authentication/Login/index';
import { schemaOptions } from '../../server/parsedSchemas/login';
import { handleServerResponseError } from '../../helpers/utils';

class LoginContainer extends React.Component {
  static navigationOptions = {
    header: null
  };
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

  onPress = (value, recaptchaToken, refreshToken) => {
    // let result = this.refs.loginContainer.refs.loginForm.validate();
    // console.log(result);
    // let value = this.refs.loginContainer.refs.loginForm.getValue();
    if (value) {
      this.onClick(value, recaptchaToken, refreshToken);
    }
  };

  onClick(formValue, recaptchaToken, refreshToken) {
    // console.log(this.refs.loginContainer.refs.loginForm.validate());
    // let formValue = this.refs.loginContainer.refs.loginForm.getValue();
    if (formValue) {
      this.props
        .login(formValue, recaptchaToken, this.props.navigation)
        .then(val => val)
        .catch(err => {
          if (refreshToken) refreshToken();
          console.log('err signup data', err);
          let newSchemaOptions = handleServerResponseError(
            err,
            this.state.schemaOptions
          );
          this.setState(
            {
              schemaOptions: {
                ...newSchemaOptions
              }
            }
            // () => {
            //   this.refs.loginContainer.refs.loginForm.validate();
            // }
          );
        });
      this.setState({ formValue: formValue });
    }
  }

  render() {
    return (
      <Login
        ref={'loginContainer'}
        onPress={this.onPress}
        updateRoute={(routeName, id) =>
          this.props.route(routeName, id, this.props.navigation)
        }
        formValue={this.state.formValue}
        schemaOptions={this.state.schemaOptions}
      />
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      login,
      route: (routeName, id, navigation) => dispatch =>
        updateRoute(routeName, navigation || dispatch, id)
    },
    dispatch
  );
};

export default connect(null, mapDispatchToProps)(LoginContainer);

LoginContainer.propTypes = {
  login: PropTypes.func,
  route: PropTypes.func,
  navigation: PropTypes.any
};
