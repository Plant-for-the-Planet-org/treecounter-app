import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  View,
  Keyboard,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  Dimensions,
  ActivityIndicator
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { debug } from ',,/../../debug';
import loginFormSchema from '../../../server/formSchemas/login';
import i18n from '../../../locales/i18n.js';
import styles from '../../../styles/login';
import TouchableItem from '../../Common/TouchableItem.native';
import { TextField } from 'react-native-material-textfield';
import { Formik } from 'formik';
import { generateFormikSchemaFromFormSchema } from './../../../helpers/utils';
import HeaderNew from './../../Header/HeaderNew.native';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hidePassword: true,
      shortHeight: 401,
      loadButton: false
    };
  }

  togglePassword = () => {
    this.setState({
      hidePassword: !this.state.hidePassword
    });
  };
  UNSAFE_componentWillMount() {
    this.validationSchema = generateFormikSchemaFromFormSchema(loginFormSchema);

    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      // eslint-disable-next-line no-underscore-dangle
      this._keyboardDidShow
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      // eslint-disable-next-line no-underscore-dangle
      this._keyboardDidHide
    );
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

  // eslint-disable-next-line no-underscore-dangle
  _keyboardDidShow = e => {
    let shortHeight = Dimensions.get('window').height - e.endCoordinates.height;
    this.setState({
      shortHeight: shortHeight
    });
  };

  // eslint-disable-next-line no-underscore-dangle
  _keyboardDidHide = e => {
    let shortHeight = Dimensions.get('window').height - e.endCoordinates.height;
    this.setState({
      shortHeight: shortHeight
    });
  };
  handleLoginClick = () => {
    if (this.state.formValue) {
      Keyboard.dismiss();

      debug('Form value', this.state.formValue);
    }
    debug('Form value', this.state.formValue);
    // eslint-disable-next-line no-underscore-dangle
    this.props.onPress(this.state.formValue);
  };
  render() {
    const backgroundColor = 'white';
    const lockedButton = 'rgba(137, 181, 58, 0.19)';
    return (
      <View style={{ flex: 1 }}>
        <HeaderNew
          title={''}
          navigation={this.props.navigation}
          rightLink={i18n.t('label.forgot_ur_password')}
          rightLinkFunction={this.onForgotPasswordClicked}
        />
        <Formik
          initialValues={{
            // eslint-disable-next-line no-underscore-dangle
            _username: '',
            // eslint-disable-next-line no-underscore-dangle
            _password: ''
          }}
          ref={'loginForm'}
          onSubmit={values => {
            this.setState({
              loadButton: true
            });
            const formValue = {
              // eslint-disable-next-line no-underscore-dangle
              _username: values._username,
              // eslint-disable-next-line no-underscore-dangle
              _password: values._password
            };

            this.props.onPress(formValue);

            setTimeout(
              () =>
                this.setState({
                  loadButton: false
                }),
              3000
            );
          }}
          validationSchema={this.validationSchema}
        >
          {props => (
            <>
              <KeyboardAvoidingView
                //behavior={Platform.OS === 'ios' ? 'padding' : null}
                style={{
                  minHeight: '100%'
                }}
              >
                <KeyboardAwareScrollView
                  contentContainerStyle={[
                    styles.parentContainer,
                    {
                      backgroundColor: backgroundColor,
                      padding: 24,
                      paddingTop: Platform.OS === 'ios' ? 110 : 80,
                      minHeight: '100%'
                    }
                  ]}
                  enableOnAndroid
                  keyboardDismissMode="on-drag"
                  //  keyboardShouldPersistTaps="always"
                  resetScrollToCoords={{ x: 0, y: 0 }}
                  //  scrollEnabled
                >
                  <Text style={styles.loginTitle}>
                    {i18n.t('label.log-in')}
                  </Text>
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
                      autoCorrect={false}
                      returnKeyType="next"
                      onChangeText={props.handleChange('_username')}
                      onBlur={props.handleBlur('_username')}
                      onSubmitEditing={() => {
                        this.passwordTextInput.focus();
                      }}
                    />
                  </View>

                  <View style={[styles.formView]}>
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
                        // blurOnSubmit={false}
                        error={
                          // eslint-disable-next-line no-underscore-dangle
                          props.touched._password && props.errors._password
                        }
                        returnKeyType="done"
                        onChangeText={props.handleChange('_password')}
                        onBlur={props.handleBlur('_password')}
                        ref={input => {
                          this.passwordTextInput = input;
                        }}
                        onSubmitEditing={
                          props.isValid ? props.handleSubmit : null
                        }
                      />
                      <TouchableOpacity
                        onPress={() => this.togglePassword()}
                        style={{
                          bottom: -6,
                          alignItems: 'flex-end'
                        }}
                      >
                        {this.state.hidePassword ? (
                          <Text style={styles.forgotPasswordHighlight}>
                            {i18n.t('label.show')}
                          </Text>
                        ) : (
                          <Text style={styles.forgotPasswordHighlight}>
                            {' '}
                            {i18n.t('label.hide')}
                          </Text>
                        )}
                      </TouchableOpacity>
                    </View>
                  </View>

                  <View style={[styles.bottomRow]}>
                    <TouchableItem
                      style={{ paddingRight: 5 }}
                      onPress={this.onSignupClicked}
                    >
                      <Text style={styles.forgotPasswordHighlight}>
                        {i18n.t('label.dont_have_account')}{' '}
                        {i18n.t('label.signUp')}
                      </Text>
                    </TouchableItem>
                  </View>

                  {this.state.shortHeight > 400 && Platform.OS === 'ios' ? (
                    <TouchableOpacity
                      style={[
                        styles.actionButtonTouchable,
                        { marginLeft: 24, marginRight: 24 }
                      ]}
                      onPress={props.isValid ? props.handleSubmit : null}
                    >
                      <View
                        style={[
                          styles.actionButtonView,
                          !props.isValid
                            ? { backgroundColor: lockedButton }
                            : {}
                        ]}
                      >
                        {this.state.loadButton ? (
                          <ActivityIndicator
                            size="large"
                            color={backgroundColor}
                          />
                        ) : (
                          <Text style={styles.actionButtonText}>
                            {i18n.t('label.login')}
                          </Text>
                        )}
                      </View>
                    </TouchableOpacity>
                  ) : null}
                </KeyboardAwareScrollView>
                {this.state.shortHeight > 400 && Platform.OS === 'android' ? (
                  <TouchableOpacity
                    style={[
                      styles.actionButtonTouchable,
                      { marginLeft: 24, marginRight: 24, paddingHorizontal: 24 }
                    ]}
                    onPress={props.isValid ? props.handleSubmit : null}
                  >
                    <View
                      style={[
                        styles.actionButtonView,
                        !props.isValid ? { backgroundColor: lockedButton } : {}
                      ]}
                    >
                      {this.state.loadButton ? (
                        <ActivityIndicator
                          size="large"
                          color={backgroundColor}
                        />
                      ) : (
                        <Text style={styles.actionButtonText}>
                          {i18n.t('label.login')}
                        </Text>
                      )}
                    </View>
                  </TouchableOpacity>
                ) : null}
              </KeyboardAvoidingView>
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
