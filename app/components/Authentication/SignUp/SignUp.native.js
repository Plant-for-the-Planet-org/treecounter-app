import React, { Component } from 'react';
import t from 'tcomb-form-native';
import PropTypes from 'prop-types';
import { Text, View, ImageBackground, Keyboard } from 'react-native';

import { signupFormSchema } from '../../../server/parsedSchemas/signup';
import i18n from '../../../locales/i18n.js';
import PrimaryButton from '../../Common/Button/PrimaryButton';
import styles from '../../../styles/login.native';
import { SignupTypes, SignUpType } from './SignupType';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SignupOrganization, SignupJustMe } from '../../../assets';

let Form = t.form.Form;

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Profiletype: 'individual'
    };
    this.changeProfile = this.changeProfile.bind(this);
    // eslint-disable-next-line no-underscore-dangle
  }

  onLoginClicked = () => {
    this.props.updateRoute('app_login');
  };

  changeProfile(type) {
    this.setState({
      Profiletype: type
    });
  }

  refreshToken = () => {
    // eslint-disable-next-line no-underscore-dangle
    if (this._captchaRef) {
      // eslint-disable-next-line no-underscore-dangle
      this._captchaRef.refreshToken();
    }
  };

  onSignUpClicked = type => {
    if (this.signupForm.getValue()) {
      Keyboard.dismiss();
    }
    // eslint-disable-next-line no-underscore-dangle
    this.props.onSignUpClicked(type, this.signupForm);
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
      <KeyboardAwareScrollView
      // contentContainerStyle={[{ flex: 1 }]}
      // keyboardShouldPersistTaps={'handled'}
      >
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
          <View style={{ flex: 1 }}>
            <Form
              ref={ref => (this.signupForm = ref)}
              type={signupFormSchema[!ProfileTypeParam ? Profiletype : type]}
              options={
                this.props.schemaOptions[!ProfileTypeParam ? Profiletype : type]
              }
              value={this.props.formValue}
            />
            <PrimaryButton
              onClick={() =>
                this.onSignUpClicked(!ProfileTypeParam ? Profiletype : type)
              }
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
