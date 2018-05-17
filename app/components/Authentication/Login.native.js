import React, { Component } from 'react';
import t from 'tcomb-form-native';
import PropTypes from 'prop-types';
import { loginFormSchema, schemaOptions } from '../../server/formSchemas/login';

import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  ScrollView
} from 'react-native';

let Form = t.form.Form;

let allSchemaOptions = {
  fields: {
    _password: {
      ...schemaOptions.fields._password,
      config: { iconUrl: require('../../images/login/key.png') }
    },
    _username: {
      ...schemaOptions.fields._username,
      config: { iconUrl: require('../../images/login/mail.png') }
    }
  }
};

export default class Login extends Component {
  onPress = () => {
    let result = this.refs.loginForm.validate();
    if (result.isValid()) {
      let value = this.refs.loginForm.getValue();
      if (value) {
        this.props.onClick(value);
      }
    } else if (this.props.onError) {
      this.props.onError(result.errors);
    }
  };

  onForgotPasswordClicked = () => {
    this.props.updateRoute('app_forgotPassword');
  };

  onSignupClicked = () => {
    this.props.updateRoute('app_signup');
  };

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.loginHeader}>
          <Text style={styles.titleText}>Log In</Text>
          <View style={styles.titleTextUnderline} />
        </View>
        <View style={styles.inputContainer}>
          <Form
            ref={'loginForm'}
            type={loginFormSchema}
            options={allSchemaOptions}
          />
          <TouchableHighlight onPress={this.onPress} style={styles.button}>
            <Text style={styles.buttonText}>Log in</Text>
          </TouchableHighlight>
          <View style={styles.bottomRow}>
            <Text style={styles.bottomText}>Forgot your password?</Text>
            <Text
              onPress={this.onForgotPasswordClicked}
              style={styles.bottomTextHighlight}
            >
              Reset.
            </Text>
          </View>
          <View style={styles.bottomRow}>
            <Text style={styles.bottomText}>Don't have an account? </Text>
            <Text
              onPress={this.onSignupClicked}
              style={styles.bottomTextHighlight}
            >
              Sign up.
            </Text>
          </View>
        </View>
      </ScrollView>
    );
  }
}

Login.propTypes = {
  onClick: PropTypes.func.isRequired,
  onError: PropTypes.func,
  updateRoute: PropTypes.func
};

export const loginStyles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#f0f0f0'
  },
  inputContainer: {
    width: '100%',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: 'white',
    padding: 10,
    shadowOffset: { width: 0, height: 4 },
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowRadius: 12
  },
  button: {
    height: 50,
    backgroundColor: '#b9d384',
    borderColor: '#b9d384',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 21,
    marginTop: 30,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 29,
    color: 'white',
    alignSelf: 'center'
  },
  titleText: {
    fontSize: 41,
    color: '#575756',
    width: 117,
    fontWeight: 'bold',
    justifyContent: 'flex-start',
    marginBottom: 20
  },
  titleTextUnderline: {
    height: 3,
    width: 117,
    backgroundColor: '#b9d384'
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  bottomText: {
    fontSize: 11,
    color: '#696261'
  },
  bottomTextHighlight: {
    fontSize: 11,
    color: '#ec6453'
  },
  loginHeader: {
    marginBottom: 60
  }
};
const styles = StyleSheet.create(loginStyles);
