import React, { Component } from 'react';
import t from 'tcomb-form-native';
import PropTypes from 'prop-types';
import { Text, View, Image, ScrollView } from 'react-native';
import scrollStyle from '../../../styles/common/scrollStyle';

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
      <ScrollView
        contentContainerStyle={[scrollStyle.styleContainer, { flex: 1 }]}
      >
        <View style={styles.parentContainer}>
          <View style={styles.headerContainer}>
            <Image
              style={styles.imageStyle}
              resizeMode={'contain'}
              source={SideMenuImage}
            />
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
              <TouchableItem
                style={{ paddingRight: 5 }}
                onPress={this.onSignupClicked}
              >
                <Text style={styles.bottomTextHighlight}>
                  {i18n.t('label.dont_have_account')} {i18n.t('label.signUp')}
                </Text>
              </TouchableItem>

              <PrimaryButton
                onClick={this.props.onPress}
                buttonStyle={styles.loginButtonStyle}
                textStyle={{ fontSize: 16 }}
              >
                {i18n.t('label.login')}
              </PrimaryButton>
            </View>
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
