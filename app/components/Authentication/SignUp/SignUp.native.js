import React, { Component } from 'react';
import t from 'tcomb-form-native';
import PropTypes from 'prop-types';
import { Text, View, ImageBackground, Linking } from 'react-native';

import { signupFormSchema } from '../../../server/parsedSchemas/signup';
import i18n from '../../../locales/i18n.js';
import PrimaryButton from '../../Common/Button/PrimaryButton';
import styles from '../../../styles/login.native';
import { SignupTypes, SignUpType } from './SignupType';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ReCaptchaV3 from '@haskkor/react-native-recaptchav3';
import { SignupOrganization, SignupJustMe } from '../../../assets';

let Form = t.form.Form;

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Profiletype: 'individual',
      recaptchaToken: null
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

  verifyCallback = token => {
    // Here you will get the final token!!!
    this.setState({
      recaptchaToken: token
    });
  };

  render() {
    let { Profiletype } = this.state;
    let ProfileTypeParam = this.props.navigation.getParam('profileTypeParam');
    let type, icon;
    if (signupFormSchema[ProfileTypeParam]) {
      type = ProfileTypeParam;
    } else {
      type = Profiletype;
    }
    if (type === 'individual') {
      icon = SignupJustMe;
    } else {
      icon = SignupOrganization;
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
            <View style={{ alignSelf: 'center' }}>
              <SignUpType
                iconUrl={icon}
                title={type.toUpperCase()}
                profileType={type}
              />
            </View>
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
                this.props.onSignUpClicked(type, this.state.recaptchaToken);
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
