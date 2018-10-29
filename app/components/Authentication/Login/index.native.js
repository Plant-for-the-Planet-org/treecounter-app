import React, { Component } from 'react';
import t from 'tcomb-form-native';
import PropTypes from 'prop-types';
import { Text, View, Image } from 'react-native';

import {
  loginFormSchema,
  schemaOptions
} from '../../../server/parsedSchemas/login';

import i18n from '../../../locales/i18n.js';

import styles from '../../../styles/login';

import PrimaryButton from '../../Common/Button/PrimaryButton';
import { SideMenuImage } from '../../../assets';
import TouchableItem from '../../Common/TouchableItem.native';

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
      <View style={styles.parentContainer}>
        <View style={styles.headerContainer}>
          <Image style={styles.imageStyle} source={SideMenuImage} />
          <Text style={styles.loginTextStyle}>Login</Text>
          <Text style={styles.loginDescriptionStyle}>
            {i18n.t('label.login_description')}
          </Text>
        </View>

        <View style={styles.container}>
          <View style={styles.inputContainer}>
            <Form
              ref={'loginForm'}
              type={loginFormSchema}
              options={schemaOptions}
            />
          </View>
          <View style={styles.bottomRow}>
            <TouchableItem onPress={this.onForgotPasswordClicked}>
              <Text style={styles.bottomTextHighlight}>
                {i18n.t('label.forgot_ur_password')}
              </Text>
            </TouchableItem>
          </View>
          <View style={styles.bottomRow}>
            <TouchableItem onPress={this.onSignupClicked}>
              <Text style={styles.bottomTextHighlight}>
                {i18n.t('label.dont_have_account')}
                {'  '}
                {i18n.t('label.signUp')}
              </Text>
            </TouchableItem>

            <PrimaryButton
              onClick={this.props.onPress}
              buttonStyle={{
                width: 60,
                height: 20,
                borderWidth: 0,
                borderRadius: 0,
                padding: 0,
                margin: 0,
                alignSelf: 'center',
                position: 'absolute',
                right: 0
              }}
              textStyle={{ fontSize: 12 }}
            >
              {i18n.t('label.login')}
            </PrimaryButton>
          </View>
        </View>
      </View>
    );
  }
}

Login.propTypes = {
  onPress: PropTypes.func.isRequired,
  onError: PropTypes.func,
  updateRoute: PropTypes.func
};
