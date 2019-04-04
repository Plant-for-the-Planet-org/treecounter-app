import React, { Component } from 'react';
import t from 'tcomb-form-native';
import PropTypes from 'prop-types';
import { Text, View, ImageBackground, Linking } from 'react-native';

import { signupFormSchema } from '../../../server/parsedSchemas/signup';
import i18n from '../../../locales/i18n.js';
import PrimaryButton from '../../Common/Button/PrimaryButton';
import styles from '../../../styles/login.native';
import SignupTypes from './SignupType';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ReCaptchaV3 from '@haskkor/react-native-recaptchav3';

let Form = t.form.Form;

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Profiletype: 'individual'
    };
    this.changeProfile = this.changeProfile.bind(this);
    this._recaptchaToken = undefined;
  }

  onLoginClicked = () => {
    this.props.updateRoute('app_login');
  };

  changeProfile(type) {
    this.setState({
      Profiletype: type
    });
  }

  verifyCallback = token => {
    this._recaptchaToken = token;
    // Here you will get the final token!!!
  };

  render() {
    let { Profiletype } = this.state;
    let ProfileTypeParam = this.props.navigation.getParam('profileTypeParam');
    let type;
    if (signupFormSchema[ProfileTypeParam]) {
      type = ProfileTypeParam;
    } else {
      type = Profiletype;
    }
    return (
      <KeyboardAwareScrollView enableOnAndroid={true}>
        <ReCaptchaV3
          captchaDomain={'https://www.plant-for-the-planet.org'}
          siteKey={'6Ldl8WoUAAAAAGj0OIKqbvkm_XiDPbve07JJySBF'}
          onReceiveToken={token => this.verifyCallback(token)}
        />
        <ImageBackground style={[styles.container, styles.parentContainer]}>
          {!ProfileTypeParam ? (
            <SignupTypes changeProfile={this.changeProfile} />
          ) : (
            <Text style={{ textAlign: 'center' }}>
              {type.toUpperCase()} Profile Type
            </Text>
          )}
          <View style={styles.inputContainer}>
            <Form
              ref={'signupForm'}
              type={signupFormSchema[type]}
              options={this.props.schemaOptions[type]}
              value={this.props.formValue}
            />
            <PrimaryButton
              onClick={() => {
                this.props.onSignUpClicked(type, this._recaptchaToken);
              }}
            >
              {i18n.t('label.signUp')}
            </PrimaryButton>
            <View style={styles.bottomRow}>
              <Text style={styles.bottomText}>
                {i18n.t('label.already_have_account')}
              </Text>
              <Text
                onPress={this.onLoginClicked}
                style={styles.bottomTextHighlight}
              >
                {i18n.t('label.login')}
              </Text>
            </View>
          </View>
        </ImageBackground>
      </KeyboardAwareScrollView>
    );
  }
}

SignUp.propTypes = {
  updateRoute: PropTypes.func,
  onSignUpClicked: PropTypes.func,
  onError: PropTypes.func,
  formValue: PropTypes.any,
  schemaOptions: PropTypes.any
};
