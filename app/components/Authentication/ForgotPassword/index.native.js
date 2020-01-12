import React, { Component } from 'react';
import t from 'tcomb-form-native';
import PropTypes from 'prop-types';
import i18n from '../../../locales/i18n.js';
// import { forgotPasswordFormSchema } from '../../../server/parsedSchemas/forgotpassword';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import TouchableItem from '../../Common/TouchableItem.native';

// import styles from '../../../styles/forgetpassword';
import forgotPasswordFormSchema from '../../../server/formSchemas/forgotpassword';
import styles from '../../../styles/login';
import {
  Text,
  View,
  ImageBackground,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity
} from 'react-native';
import PrimaryButton from '../../Common/Button/PrimaryButton';
let Form = t.form.Form;
import HeaderNew from './../../Header/HeaderNew.native';
import { Formik } from 'formik';
import { generateFormikSchemaFromFormSchema } from './../../../helpers/utils';
import { TextField } from 'react-native-material-textfield';

export default class ForgotPassword extends Component {
  onLoginClicked = () => {
    this.props.updateRoute('app_login');
  };

  componentWillMount() {
    this.validationSchema = generateFormikSchemaFromFormSchema(
      forgotPasswordFormSchema
    );
  }

  render() {
    const backgroundColor = 'white';
    const lockedButton = 'rgba(137, 181, 58, 0.19)';
    return (
      <View style={{ flex: 1 }}>
        <HeaderNew title={''} navigation={this.props.navigation} />
        <Formik
          initialValues={{
            email: ''
          }}
          ref={'forgotPasswordForm'}
          onSubmit={values => {
            const formValue = {
              email: values.email
            };
            this.props.onResetPassword();
            this.props.forgetPasswordFunction(formValue, this.props.navigation);
          }}
          validationSchema={this.validationSchema}
        >
          {props => (
            <>
              <KeyboardAvoidingView behavior={'padding'} style={{ flex: 1 }}>
                <KeyboardAwareScrollView
                  contentContainerStyle={[
                    styles.parentContainer,
                    {
                      backgroundColor: backgroundColor,
                      padding: 24,
                      paddingTop: 120,
                      height: '100%'
                    }
                  ]}
                  enableOnAndroid
                  keyboardDismissMode="on-drag"
                  keyboardShouldPersistTaps="always"
                  resetScrollToCoords={{ x: 0, y: 0 }}
                  scrollEnabled
                >
                  <Text style={styles.loginTitle}>
                    {i18n.t('label.forgot_ur_password')}
                  </Text>
                  <View>
                    <TextField
                      label={i18n.t('label.email')}
                      // eslint-disable-next-line no-underscore-dangle
                      value={props.values.email}
                      tintColor={'#89b53a'}
                      titleFontSize={12}
                      lineWidth={1}
                      // eslint-disable-next-line no-underscore-dangle
                      error={props.touched.email && props.errors.email}
                      labelTextStyle={{ fontFamily: 'OpenSans-Regular' }}
                      titleTextStyle={{ fontFamily: 'OpenSans-SemiBold' }}
                      affixTextStyle={{ fontFamily: 'OpenSans-Regular' }}
                      returnKeyType="next"
                      onChangeText={props.handleChange('email')}
                      onBlur={props.handleBlur('email')}
                    />
                  </View>
                  {/* <View style={styles.inputContainer}>
                  <Form
                    ref={'forgotPasswordForm'}
                    type={forgotPasswordFormSchema}
                    options={this.props.schemaOptions}
                  />
                  <PrimaryButton onClick={() => this.props.onResetPassword()}>
                    {i18n.t('label.reset_password')}
                  </PrimaryButton>
                  <View style={styles.bottomRow}>
                    <Text
                      onPress={this.onLoginClicked}
                      style={styles.bottomTextHighlight}
                    >
                      {i18n.t('label.try_again_login')}
                    </Text>
                  </View>
                </View> */}
                  <View style={[styles.bottomRow]}>
                    <TouchableItem
                      style={{ paddingRight: 5 }}
                      onPress={this.onLoginClicked}
                    >
                      <Text style={styles.forgotPasswordHighlight}>
                        {i18n.t('label.try_again_login')}{' '}
                      </Text>
                    </TouchableItem>
                  </View>
                  <TouchableOpacity
                    style={[
                      styles.actionButtonTouchable,
                      { marginLeft: 24, marginRight: 24 }
                    ]}
                    onPress={props.isValid && props.handleSubmit}
                  >
                    <View
                      style={[
                        styles.actionButtonView,
                        !props.isValid ? { backgroundColor: lockedButton } : {}
                      ]}
                    >
                      <Text style={styles.actionButtonText}>
                        {i18n.t('label.reset_password')}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </KeyboardAwareScrollView>
              </KeyboardAvoidingView>
            </>
          )}
        </Formik>
      </View>
    );
  }
}

ForgotPassword.propTypes = {
  onResetPassword: PropTypes.func.isRequired,
  onError: PropTypes.func,
  updateRoute: PropTypes.func
};
