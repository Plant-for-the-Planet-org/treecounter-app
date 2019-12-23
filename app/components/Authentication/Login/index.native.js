import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  View,
  Image,
  Keyboard,
  TouchableOpacity,
  // ScrollView
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import loginFormSchema from '../../../server/formSchemas/login';
import i18n from '../../../locales/i18n.js';
import styles from '../../../styles/login';
import { planetLogo, eye, closeeye, forward } from '../../../assets';
import TouchableItem from '../../Common/TouchableItem.native';
import { TextField } from 'react-native-material-textfield';
import { Formik } from 'formik';
import { generateFormikSchemaFromFormSchema } from './../../../helpers/utils';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hidePassword: true,
      buttonType: 'login'
    };
  }

  togglePassword = () => {
    this.setState({
      hidePassword: !this.state.hidePassword
    });
  };
  componentWillMount() {
    this.validationSchema = generateFormikSchemaFromFormSchema(loginFormSchema);

    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this.keyboardDidShow
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this.keyboardDidHide
    );
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  keyboardDidShow = () => {
    this.setState({
      buttonType: '>'
    });
  };

  keyboardDidHide = () => {
    this.setState({
      buttonType: 'login'
    });
  };
  onForgotPasswordClicked = () => {
    this.props.updateRoute('app_forgotPassword');
  };

  onSignupClicked = () => {
    this.props.updateRoute('app_signup');
  };

  onProfilePickerClick = () => {
    this.props.updateRoute('pickup_profile_modal');
  };

  handleLoginClick = () => {
    if (this.state.formValue) {
      Keyboard.dismiss();
      console.log('Form value', this.state.formValue);
    }
    console.log('Form value', this.state.formValue);
    // eslint-disable-next-line no-underscore-dangle
    this.props.onPress(this.state.formValue);
  };
  render() {
    const backgroundColor = 'white';
    const lockedButton = 'rgba(137, 181, 58, 0.19)';
    return (
      <View style={{ flex: 1 }}>
        <Formik
          initialValues={{
            // eslint-disable-next-line no-underscore-dangle
            _username: '',
            // eslint-disable-next-line no-underscore-dangle
            _password: ''
          }}
          ref={'loginForm'}
          onSubmit={values => {
            const formValue = {
              // eslint-disable-next-line no-underscore-dangle
              _username: values._username,
              // eslint-disable-next-line no-underscore-dangle
              _password: values._password
            };

            this.props.onPress(formValue);
          }}
          validationSchema={this.validationSchema}
        >
          {props => (
            <>
              <KeyboardAwareScrollView
                contentContainerStyle={[
                  styles.parentContainer,
                  {
                    backgroundColor: backgroundColor,
                    padding: 20
                  }
                ]}
                enableOnAndroid
                keyboardDismissMode="on-drag"
                keyboardShouldPersistTaps="always"
                resetScrollToCoords={{ x: 0, y: 0 }}
                scrollEnabled
              >
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
                <View>
                  <TextField
                    label={i18n.t('label.email')}
                    // eslint-disable-next-line no-underscore-dangle
                    value={props.values._username}
                    tintColor={'#89b53a'}
                    titleFontSize={12}
                    lineWidth={1}
                    // eslint-disable-next-line no-underscore-dangle
                    error={props.touched._username && props.errors._username}
                    labelTextStyle={{ fontFamily: 'OpenSans-Regular' }}
                    titleTextStyle={{ fontFamily: 'OpenSans-SemiBold' }}
                    affixTextStyle={{ fontFamily: 'OpenSans-Regular' }}
                    returnKeyType="next"
                    onChangeText={props.handleChange('_username')}
                    onBlur={props.handleBlur('_username')}
                  />
                </View>

                <View style={styles.formView}>
                  <View style={{ width: '100%' }}>
                    <TextField
                      label={i18n.t('label.password')}
                      // eslint-disable-next-line no-underscore-dangle
                      value={props.values._password}
                      tintColor={'#89b53a'}
                      titleFontSize={12}
                      lineWidth={1}
                      secureTextEntry={this.state.hidePassword}
                      labelTextStyle={{ fontFamily: 'OpenSans-Regular' }}
                      titleTextStyle={{ fontFamily: 'OpenSans-SemiBold' }}
                      affixTextStyle={{ fontFamily: 'OpenSans-Regular' }}
                      blurOnSubmit={false}
                      error={
                        // eslint-disable-next-line no-underscore-dangle
                        props.touched._password && props.errors._password
                      }
                      onChangeText={props.handleChange('_password')}
                      onBlur={props.handleBlur('_password')}
                    />
                  </View>

                  <TouchableOpacity
                    onPress={() => this.togglePassword()}
                    style={{ marginLeft: '-14%', bottom: -6 }}
                  >
                    {this.state.hidePassword ? (
                      <Image
                        source={eye}
                        resizeMode={'contain'}
                        style={{ height: 24 }}
                      />
                    ) : (
                      <Image
                        source={closeeye}
                        resizeMode={'contain'}
                        style={{ height: 24 }}
                      />
                    )}
                  </TouchableOpacity>
                </View>

                <View style={styles.bottomRow}>
                  <TouchableItem onPress={this.onForgotPasswordClicked}>
                    <Text style={styles.bottomTextHighlight}>
                      {i18n.t('label.forgot_ur_password')}
                    </Text>
                  </TouchableItem>
                </View>
                <View style={[styles.bottomRow]}>
                  <TouchableItem
                    style={{ paddingRight: 5 }}
                    onPress={this.onSignupClicked}
                  >
                    <Text style={styles.bottomTextHighlight}>
                      {i18n.t('label.dont_have_account')}{' '}
                      {i18n.t('label.signUp')}
                    </Text>
                  </TouchableItem>
                </View>
              </KeyboardAwareScrollView>

              {this.state.buttonType === 'login' ? (
                <TouchableOpacity
                  style={[styles.actionButtonTouchable]}
                  onPress={props.isValid && props.handleSubmit}
                >
                  <View
                    style={[
                      styles.actionButtonView,
                      !props.isValid ? { backgroundColor: lockedButton } : {}
                    ]}
                  >
                    <Text style={styles.actionButtonText}>
                      {i18n.t('label.login')}
                    </Text>
                  </View>
                </TouchableOpacity>
              ) : null}

              {this.state.buttonType === '>' ? (
                <TouchableOpacity
                  style={styles.actionButtonSmallTouchable}
                  onPress={props.isValid && props.handleSubmit}
                >
                  <Image
                    source={forward}
                    resizeMode="cover"
                    style={styles.actionButtonSmallImage}
                  />
                </TouchableOpacity>
              ) : null}
            </>
          )}
        </Formik>
      </View>
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
