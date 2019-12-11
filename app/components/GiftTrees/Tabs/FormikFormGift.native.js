import React, { useState, useEffect, Component } from 'react';
import { Text, View, Image, TouchableOpacity, Keyboard } from 'react-native';
import { forward } from '../../../assets';
import styles from '../../../styles/competition/competition-form.native';
import i18n from '../../../locales/i18n';
import { Formik } from 'formik';
import { TextField } from 'react-native-material-textfield';
import { generateFormikSchemaFromFormSchema } from '../../../helpers/utils';
import buttonStyles from '../../../styles/common/button.native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import giftInvitationFormSchema from '../../../server/formSchemas/giftTrees';

export default class FormikFormGift extends Component {
  constructor(props) {
    super(props);

    this.state = { buttonType: 'next' };
  }
  componentWillMount() {
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this._keyboardDidShow
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this._keyboardDidHide
    );
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  _keyboardDidShow = () => {
    this.setState({
      buttonType: '>'
    });
  };

  _keyboardDidHide = () => {
    this.setState({
      buttonType: 'next'
    });
  };
  render() {
    let { props } = this;
    const validationSchema = generateFormikSchemaFromFormSchema(
      giftInvitationFormSchema.properties.giftInvitation
    );
    console.log('buttonType', this.buttonType);
    let buttonType = props.buttonType;
    return (
      <Formik
        initialValues={props.initialValues}
        onSubmit={values => {
          props.openProjects(values, 'invitation');
        }}
        validationSchema={validationSchema}
      >
        {props => (
          <>
            <View style={styles.view_container}>
              <KeyboardAwareScrollView
                contentContainerStyle={styles.formScrollView}
                enableOnAndroid
                keyboardDismissMode="on-drag"
                keyboardShouldPersistTaps="always"
                resetScrollToCoords={{ x: 0, y: 0 }}
                scrollEnabled
              >
                <View style={styles.formView}>
                  <View style={styles.formHalfTextField}>
                    <TextField
                      label={i18n.t('label.firstname')}
                      value={props.values.firstname}
                      tintColor={'#89b53a'}
                      titleFontSize={12}
                      returnKeyType="next"
                      lineWidth={1}
                      labelTextStyle={{ fontFamily: 'OpenSans-Regular' }}
                      titleTextStyle={{ fontFamily: 'OpenSans-Regular' }}
                      affixTextStyle={{ fontFamily: 'OpenSans-Regular' }}
                      blurOnSubmit={false}
                      keyboardType="numeric"
                      error={props.touched.firstname && props.errors.firstname}
                      onChangeText={props.handleChange('firstname')}
                      onBlur={props.handleBlur('firstname')}
                    />
                  </View>

                  <View style={styles.formHalfTextField}>
                    <TextField
                      label={i18n.t('label.lastname')}
                      value={props.values.lastname}
                      tintColor={'#89b53a'}
                      titleFontSize={12}
                      returnKeyType="next"
                      lineWidth={1}
                      labelTextStyle={{ fontFamily: 'OpenSans-Regular' }}
                      titleTextStyle={{ fontFamily: 'OpenSans-Regular' }}
                      affixTextStyle={{ fontFamily: 'OpenSans-Regular' }}
                      blurOnSubmit={false}
                      keyboardType="numeric"
                      error={props.touched.lastname && props.errors.lastname}
                      onChangeText={props.handleChange('lastname')}
                      onBlur={props.handleBlur('lastname')}
                    />
                  </View>
                </View>
                <View>
                  <TextField
                    label={i18n.t('label.email')}
                    value={props.values.email}
                    tintColor={'#89b53a'}
                    titleFontSize={12}
                    returnKeyType="next"
                    lineWidth={1}
                    labelTextStyle={{ fontFamily: 'OpenSans-Regular' }}
                    titleTextStyle={{ fontFamily: 'OpenSans-Regular' }}
                    affixTextStyle={{ fontFamily: 'OpenSans-Regular' }}
                    blurOnSubmit={false}
                    error={props.touched.email && props.errors.email}
                    onChangeText={props.handleChange('email')}
                    onBlur={props.handleBlur('email')}
                  />
                </View>
                <View>
                  <TextField
                    label={i18n.t('label.gift_message')}
                    value={props.values.message}
                    tintColor={'#89b53a'}
                    titleFontSize={12}
                    returnKeyType="next"
                    lineWidth={1}
                    multiline
                    labelTextStyle={{ fontFamily: 'OpenSans-Regular' }}
                    titleTextStyle={{ fontFamily: 'OpenSans-Regular' }}
                    affixTextStyle={{ fontFamily: 'OpenSans-Regular' }}
                    blurOnSubmit={false}
                    error={props.touched.message && props.errors.message}
                    onChangeText={props.handleChange('message')}
                    onBlur={props.handleBlur('message')}
                  />
                </View>
              </KeyboardAwareScrollView>

              {this.state.buttonType === 'next' ? (
                <>
                  <TouchableOpacity
                    style={[
                      buttonStyles.dualActionButtonTouchable2,
                      { top: undefined, bottom: 55 }
                    ]}
                    onPress={props.handleSubmit}
                  >
                    <View style={buttonStyles.dualActionButtonView2}>
                      <Text style={buttonStyles.dualActionButtonText2}>
                        {i18n.t('label.next')}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </>
              ) : null}

              {this.state.buttonType === '>' ? (
                <TouchableOpacity
                  style={[
                    buttonStyles.actionButtonSmallTouchable,
                    { top: undefined, bottom: '20%' }
                  ]}
                  onPress={props.handleSubmit}
                >
                  <Image
                    source={forward}
                    resizeMode="cover"
                    style={buttonStyles.actionButtonSmallImage}
                  />
                </TouchableOpacity>
              ) : null}
            </View>
          </>
        )}
      </Formik>
    );
  }
}
