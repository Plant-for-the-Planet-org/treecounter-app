import React, { Component } from 'react';
import t from 'tcomb-form-native';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

import {
  loginFormSchema,
  schemaOptions
} from '../../../server/parsedSchemas/login';

import i18n from '../../../locales/i18n.js';

import styles from '../../../styles/login';
import CardLayout from '../../Common/Card';
import PrimaryButton from '../../Common/Button/PrimaryButton';

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
      <ScrollView contentContainerStyle={styles.scrollViewStyle}>
        <View style={styles.container}>
          <CardLayout style={styles.inputContainer}>
            <Form
              ref={'loginForm'}
              type={loginFormSchema}
              options={schemaOptions}
            />
            <PrimaryButton onClick={this.props.onPress}>
              {i18n.t('label.login')}
            </PrimaryButton>
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
          </CardLayout>
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
