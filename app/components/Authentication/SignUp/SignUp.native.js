import React, { Component } from 'react';
import t from 'tcomb-form-native';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  ImageBackground,
  ScrollView
} from 'react-native';

import {
  schemaOptions,
  signupFormSchema
} from '../../../server/parsedSchemas/signup';
import i18n from '../../../locales/i18n.js';
let lng = 'en';

import { loginStyles } from '../Login';
import SignupTypes from './SignupType';

let Form = t.form.Form;

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Profiletype: i18n.t('label.signUplabels.individual', { lng })
    };
    this.changeProfile = this.changeProfile.bind(this);
  }

  onLoginClicked = () => {
    this.props.updateRoute('app_login');
  };

  changeProfile(type) {
    this.setState({
      Profiletype: type
    });
  }

  render() {
    let { Profiletype } = this.state;
    return (
      <ScrollView>
        <ImageBackground style={styles.container}>
          <View style={styles.loginHeader}>
            <Text style={styles.titleText}>
              {i18n.t('label.signUplabels.signup', { lng })}
            </Text>
            <View style={styles.titleTextUnderline} />
          </View>
          <SignupTypes changeProfile={this.changeProfile} />
          <View style={styles.inputContainer}>
            <Form
              ref={'signupForm'}
              type={signupFormSchema[Profiletype]}
              options={schemaOptions[Profiletype]}
            />
            <TouchableHighlight
              onPress={this.props.onSignUpClicked.bind(this, Profiletype)}
              style={styles.button}
            >
              <Text style={styles.buttonText}>
                {i18n.t('label.signUplabels.signup_button', { lng })}
              </Text>
            </TouchableHighlight>
            <View style={styles.bottomRow}>
              <Text style={styles.bottomText}>
                {i18n.t('label.signUplabels.already_have_account', { lng })}
              </Text>
              <Text
                onPress={this.onLoginClicked}
                style={styles.bottomTextHighlight}
              >
                {i18n.t('label.signUplabels.logint', { lng })}
              </Text>
            </View>
          </View>
        </ImageBackground>
      </ScrollView>
    );
  }
}

SignUp.propTypes = {
  updateRoute: PropTypes.func,
  onSignUpClicked: PropTypes.func,
  onError: PropTypes.func
};

export const styles = StyleSheet.create({
  ...loginStyles,
  titleText: { ...loginStyles.titleText, width: 129 },
  titleTextUnderline: { ...loginStyles.titleTextUnderline, width: 119 }
});
