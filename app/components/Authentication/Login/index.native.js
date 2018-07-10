import React, { Component } from 'react';
import t from 'tcomb-form-native';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  ScrollView
} from 'react-native';

import {
  loginFormSchema,
  schemaOptions
} from '../../../server/parsedSchemas/login';

import i18n from '../../../locales/i18n.js';

import styles from './login.styles.native';

let Form = t.form.Form;

export default class Login extends Component {
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
          <Text style={styles.titleText}>{i18n.t('label.login')}</Text>
          <View style={styles.titleTextUnderline} />
        </View>
        <View style={styles.inputContainer}>
          <Form
            ref={'loginForm'}
            type={loginFormSchema}
            options={schemaOptions}
          />
          <TouchableHighlight
            onPress={this.props.onPress}
            style={styles.button}
          >
            <Text style={styles.buttonText}>{i18n.t('label.login')}</Text>
          </TouchableHighlight>
          <View style={styles.bottomRow}>
            <Text style={styles.bottomText}>
              {i18n.t('label.forgot_ur_password')}
            </Text>
            <Text
              onPress={this.onForgotPasswordClicked}
              style={styles.bottomTextHighlight}
            >
              {i18n.t('label.reset')}
            </Text>
          </View>
          <View style={styles.bottomRow}>
            <Text style={styles.bottomText}>
              {i18n.t('label.dont_have_account')}
            </Text>
            <Text
              onPress={this.onSignupClicked}
              style={styles.bottomTextHighlight}
            >
              {i18n.t('label.signUp')}.
            </Text>
          </View>
        </View>
      </ScrollView>
    );
  }
}

Login.propTypes = {
  onPress: PropTypes.func.isRequired,
  onError: PropTypes.func,
  updateRoute: PropTypes.func
};
