import React, { Component, lazy } from 'react';
import t from 'tcomb-form-native';
import PropTypes from 'prop-types';
import { Text, View, Image, Keyboard } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import scrollStyle from '../../../styles/common/scrollStyle';
import ReCaptchaV3 from '@haskkor/react-native-recaptchav3';
import { loginFormSchema } from '../../../server/parsedSchemas/login';
import i18n from '../../../locales/i18n.js';
import styles from '../../../styles/login';
const PrimaryButton = lazy(() => import('../../Common/Button/PrimaryButton'));
import { planetLogo } from '../../../assets';
const TouchableItem = lazy(() => import('../../Common/TouchableItem.native'));

let Form = t.form.Form;

export default class Login extends Component {
  constructor(props) {
    super(props);
    // eslint-disable-next-line no-underscore-dangle
    this._recaptchaToken = undefined;
  }

  onForgotPasswordClicked = () => {
    this.props.updateRoute('app_forgotPassword');
  };

  onSignupClicked = () => {
    this.props.updateRoute('app_signup');
  };

  onProfilePickerClick = () => {
    this.props.updateRoute('pickup_profile_modal');
  };

  verifyCallback = token => {
    // Here you will get the final token!!!
    // eslint-disable-next-line no-underscore-dangle
    this._recaptchaToken = token;
  };

  refreshToken = () => {
    // eslint-disable-next-line no-underscore-dangle
    if (this._captchaRef) {
      // eslint-disable-next-line no-underscore-dangle
      this._captchaRef.refreshToken();
    }
  };

  handleLoginClick = () => {
    if (this.refs.loginForm.getValue()) {
      Keyboard.dismiss();
    }
    // eslint-disable-next-line no-underscore-dangle
    this.props.onPress(this._recaptchaToken, this.refreshToken);
  };
  render() {
    const backgroundColor = 'white';
    return (
      <KeyboardAwareScrollView
        contentContainerStyle={[
          scrollStyle.styleContainer,
          { backgroundColor: backgroundColor, marginBottom: 300 }
        ]}
        enableOnAndroid
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps="always"
        style={styles.keyboardScrollView}
        resetScrollToCoords={{ x: 0, y: 0 }}
        scrollEnabled
      >
        <ReCaptchaV3
          // eslint-disable-next-line no-underscore-dangle
          ref={ref => (this._captchaRef = ref)}
          captchaDomain={'https://www.trilliontreecampaign.org'}
          siteKey={'6Ldl8WoUAAAAAGj0OIKqbvkm_XiDPbve07JJySBF'}
          onReceiveToken={token => this.verifyCallback(token)}
        />
        <View style={styles.parentContainer}>
          <View style={styles.headerContainer}>
            <Image
              style={styles.imageStyle}
              resizeMode={'contain'}
              source={planetLogo}
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
                options={this.props.schemaOptions}
                value={this.props.formValue}
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
                onClick={this.handleLoginClick}
                buttonStyle={styles.loginButtonStyle}
                textStyle={{ fontSize: 16 }}
              >
                {i18n.t('label.login')}
              </PrimaryButton>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

Login.propTypes = {
  onPress: PropTypes.func.isRequired,
  onError: PropTypes.func,
  updateRoute: PropTypes.func,
  formValue: PropTypes.any,
  schemaOptions: PropTypes.any
};
