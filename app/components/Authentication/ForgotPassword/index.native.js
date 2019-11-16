import React, { Component, lazy } from 'react';
import t from 'tcomb-form-native';
import PropTypes from 'prop-types';
import i18n from '../../../locales/i18n.js';
import { forgotPasswordFormSchema } from '../../../server/parsedSchemas/forgotpassword';

import styles from '../../../styles/forgetpassword';

import { Text, View, ImageBackground, ScrollView } from 'react-native';
const PrimaryButton = lazy(() => import('../../Common/Button/PrimaryButton'));
let Form = t.form.Form;

export default class ForgotPassword extends Component {
  onLoginClicked = () => {
    this.props.updateRoute('app_login');
  };

  render() {
    return (
      <ScrollView contentContainerStyle={styles.scrollViewStyle}>
        <ImageBackground style={styles.container}>
          <View style={styles.inputContainer}>
            <Form
              ref={'forgotPasswordForm'}
              type={forgotPasswordFormSchema}
              options={this.props.schemaOptions}
            />
            <PrimaryButton onClick={() => this.props.onResetPassword()}>
              {i18n.t('label.reset_password')}
            </PrimaryButton>
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
      </ScrollView>
    );
  }
}

ForgotPassword.propTypes = {
  onResetPassword: PropTypes.func.isRequired,
  onError: PropTypes.func,
  updateRoute: PropTypes.func
};
