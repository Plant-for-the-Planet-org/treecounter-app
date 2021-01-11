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
//import { debug } from ',,/../../debug';
import i18n from '../../../locales/i18n.js';
import styles from '../../../styles/login';
import { TextField } from 'react-native-material-textfield';
import { Formik } from 'formik';
import HeaderNew from '../../Header/HeaderNew.native';
import { auth0OTP, auth0Login } from '../../../actions/auth0Actions';
import { updateRoute } from '../../../helpers/routerHelper/routerHelper';
import * as yup from 'yup';
import { setLocale } from 'yup';
import LoadingIndicator from '../../Common/LoadingIndicator';

setLocale({
  number: {
    default: i18n.t('label.validCode'),
    integer: i18n.t('label.validCode'),
    positive: i18n.t('label.validCode')
  }
});

let schema = yup.object().shape({
  loginCode: yup.number().integer().positive(),
});

export default class OTPCode extends Component {
  constructor(props) {
    super(props);
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
    this.timer = 0;
    this.state = {
      shortHeight: 401,
      loadButton: false,
      loadingPage: false,
      seconds: 30
    };
  }

  UNSAFE_componentWillMount() {

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

  componentDidMount() {
    this.startTimer()
  }

  startTimer() {
    if (this.timer == 0 && this.state.seconds > 0) {
      this.timer = setInterval(this.countDown, 1000);
    }
  }

  countDown() {
    // Remove one second, set state so a re-render happens.
    let seconds = this.state.seconds - 1;
    this.setState({
      seconds: seconds,
    });

    // Check if we're at zero.
    if (seconds == 0) {
      clearInterval(this.timer);
    }
  }

  handleTryAgain = () => {
    this.setState({
      loadingPage: true
    });
    auth0Login(this.props.email, this.props.navigation);
    setTimeout(
      () =>
        this.setState({
          loadingPage: false
        }),
      3000
    );
  };

  render() {

    const backgroundColor = 'white';
    const lockedButton = 'rgba(137, 181, 58, 0.19)';
    return !this.state.loadingPage ? (
      <View style={{ flex: 1 }}>
        <HeaderNew
          title={''}
          navigation={this.props.navigation}
        />
        <Formik
          initialValues={{
            loginCode: ''
          }}
          /* ExceptionsManager.js:126 Warning: Function components cannot be given refs. Attempts to access this ref will fail. Did you mean to use React.forwardRef()?
             Check the render method of `Login`.
             in Formik (at Login/index.native.js:103) */
          // ref={'loginForm'}
          onSubmit={(values, actions) => {
            this.setState({
              loadButton: true
            });
            const email = this.props.email;
            auth0OTP(email, values.loginCode, this.props.navigation).then((res) => {

              if (res.accessToken) {
                const data = {
                  navigation: this.props.navigation
                }
                this.props.loadUserProfile(data).catch(err => {
                  updateRoute('app_signup', this.props.navigation);
                });
              } else {
                updateRoute('app_homepage', this.props.navigation);
              }
            }).catch((err) => {
              this.setState({
                loadButton: false
              });
              actions.setFieldError('loginCode', i18n.t('label.validCode'))
              // actions.resetForm();
              actions.setSubmitting(false)
            })

            setTimeout(
              () =>
                this.setState({
                  loadButton: false
                }),
              3000
            );
          }}
          validationSchema={schema}
        >
          {props => (
            <>
              <KeyboardAvoidingView
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
                    {i18n.t('label.OTPSent')}
                  </Text>
                  <View>
                    <TextField
                      label={i18n.t('label.enter_login_code')}
                      // eslint-disable-next-line no-underscore-dangle
                      value={props.values.loginCode}
                      tintColor={'#89b53a'}
                      titleFontSize={12}
                      lineWidth={1}
                      // eslint-disable-next-line no-underscore-dangle
                      error={props.touched.loginCode && props.errors.loginCode}
                      labelTextStyle={{ fontFamily: 'OpenSans-Regular' }}
                      titleTextStyle={{ fontFamily: 'OpenSans-SemiBold' }}
                      affixTextStyle={{ fontFamily: 'OpenSans-Regular' }}
                      autoCorrect={false}
                      returnKeyType="done"
                      onChangeText={props.handleChange('loginCode')}
                      onBlur={props.handleBlur('loginCode')}
                      keyboardType="numeric"
                      autoCapitalize="none"
                      onSubmitEditing={props.isValid ? props.handleSubmit : null}
                    />
                  </View>
                  <View style={[styles.bottomRow]}>
                    <Text style={styles.enterCode}>
                      {i18n.t('label.please_enter_code', {
                        count: this.state.seconds
                      })}
                      {this.state.seconds > 0 ? (
                        <Text>{""}</Text>
                      ) : (
                          <Text onPress={this.handleTryAgain} style={styles.forgotPasswordHighlight}>{i18n.t('label.tryAgain')}</Text>
                        )}
                    </Text>
                  </View>

                  {this.state.shortHeight > 400 && Platform.OS === 'ios' ? (
                    <TouchableOpacity
                      style={[
                        styles.actionButtonTouchable,
                        { marginLeft: 24, marginRight: 24 }
                      ]}
                      onPress={props.isValid || !props.isSubmitting ? props.handleSubmit : null}
                    >
                      <View
                        style={[
                          styles.actionButtonView,
                          !props.isValid || props.isSubmitting
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
                              {i18n.t('label.submit_code')}
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
                    onPress={props.isValid || !props.isSubmitting ? props.handleSubmit : null}
                  >
                    <View
                      style={[
                        styles.actionButtonView,
                        !props.isValid || props.isSubmitting ? { backgroundColor: lockedButton } : {}
                      ]}
                    >
                      {this.state.loadButton ? (
                        <ActivityIndicator
                          size="large"
                          color={backgroundColor}
                        />
                      ) : (
                          <Text style={styles.actionButtonText}>
                            {i18n.t('label.submit_code')}
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
    ) : (
        <LoadingIndicator contentLoader screen="profileLoader" />
      );
  }
}

OTPCode.propTypes = {
  onPress: PropTypes.func.isRequired,
  onError: PropTypes.func,
  updateRoute: PropTypes.func,
  formValue: PropTypes.any,
  schemaOptions: PropTypes.any,
  email: PropTypes.any,
  loadUserProfile: PropTypes.any
};
