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
import loginFormSchema from '../../../server/formSchemas/login';
import i18n from '../../../locales/i18n.js';
import styles from '../../../styles/login';
import TouchableItem from '../../Common/TouchableItem.native';
import { TextField } from 'react-native-material-textfield';
import { Formik } from 'formik';
import { generateFormikSchemaFromFormSchema } from './../../../helpers/utils';
import HeaderNew from './../../Header/HeaderNew.native';
import { auth0Login } from '../../../actions/auth0Actions';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      shortHeight: 401,
      loadButton: false
    };
  }

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

      //debug('Form value', this.state.formValue);
    }
    //debug('Form value', this.state.formValue);
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
        />
        <Formik
          initialValues={{
            // eslint-disable-next-line no-underscore-dangle
            _username: ''
          }}
          /* ExceptionsManager.js:126 Warning: Function components cannot be given refs. Attempts to access this ref will fail. Did you mean to use React.forwardRef()?
             Check the render method of `Login`.
             in Formik (at Login/index.native.js:103) */
          // ref={'loginForm'}
          onSubmit={values => {
            this.setState({
              loadButton: true
            });

            auth0Login(values._username, this.props.navigation);

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
                    {i18n.t('label.login_or_signup')}
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
                      returnKeyType="done"
                      onChangeText={props.handleChange('_username')}
                      onBlur={props.handleBlur('_username')}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      onSubmitEditing={props.isValid ? props.handleSubmit : null}
                    />
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
