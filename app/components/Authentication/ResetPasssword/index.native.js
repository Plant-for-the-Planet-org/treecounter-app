import React, { Component } from 'react';
import t from 'tcomb-form-native';
import PropTypes from 'prop-types';
import { Text, View, ScrollView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import scrollStyle from '../../../styles/common/scrollStyle';

import {
  resetPasswordFormSchema,
  schemaOptions
} from '../../../server/parsedSchemas/resetPassword';

import i18n from '../../../locales/i18n.js';

import styles from '../../../styles/forgetpassword';

import PrimaryButton from '../../Common/Button/PrimaryButton';

let Form = t.form.Form;

export default class ResetPassword extends Component {
  render() {
    return (
      <ScrollView contentContainerStyle={styles.scrollViewStyle}>
        <View style={styles.container}>
          <View style={styles.inputContainer}>
            <Form
              ref={'resetPasswordForm'}
              type={resetPasswordFormSchema}
              options={this.props.schemaProp}
              value={this.props.formValue}
            />
          </View>
          <PrimaryButton
            onClick={this.props.onSetPassword}
            buttonStyle={styles.button}
            textStyle={{ fontSize: 16 }}
          >
            {i18n.t('label.set_password')}
          </PrimaryButton>
        </View>
      </ScrollView>
    );
  }
}

ResetPassword.propTypes = {
  onSetPassword: PropTypes.func,
  formValue: PropTypes.object,
  schemaProp: PropTypes.object
};
