import React, { Component } from 'react';
import t from 'tcomb-form-native';
import PropTypes from 'prop-types';
import i18n from '../../../locales/i18n.js';
import {
  forgotPasswordFormSchema,
  schemaOptions
} from '../../../server/parsedSchemas/forgotpassword';

import styles from './styles/forgetpassword';

import { Text, View, TouchableHighlight, ImageBackground } from 'react-native';

let Form = t.form.Form;

export default class ForgotPassword extends Component {
  onLoginClicked = () => {
    this.props.updateRoute('app_login');
  };

  render() {
    return (
      <ImageBackground style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.titleText}>
            {i18n.t('label.forgot_ur_password')}
          </Text>
          <View style={styles.titleTextUnderline} />
        </View>
        <View style={styles.inputContainer}>
          <Form
            ref={'forgotPasswordForm'}
            type={forgotPasswordFormSchema}
            options={schemaOptions}
          />
          <TouchableHighlight
            onPress={this.onResetPassword}
            style={styles.button}
          >
            <Text style={styles.buttonText}>
              {i18n.t('label.reset_password')}
            </Text>
          </TouchableHighlight>
          <View style={styles.bottomRow}>
            <Text
              onPress={this.onLoginClicked}
              style={styles.bottomTextHighlight}
            >
              {i18n.t('label.try_again_login')}
            </Text>
          </View>
        </View>
      </ImageBackground>
    );
  }
}

ForgotPassword.propTypes = {
  onResetPassword: PropTypes.func.isRequired,
  onError: PropTypes.func,
  updateRoute: PropTypes.func
};
