import React, { Component } from 'react';
import { Formik } from 'formik';
import { TextField } from 'react-native-material-textfield';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Text, View, Image, TouchableOpacity, Keyboard } from 'react-native';
import { forward } from '../../../assets';
import styles from '../../../styles/competition/competition-form.native';
import stylesGift from '../../../styles/gifttrees/giftrees';
import i18n from '../../../locales/i18n';
import { generateFormikSchemaFromFormSchema } from '../../../helpers/utils';
import buttonStyles from '../../../styles/common/button.native';
import giftInvitationFormSchema from '../../../server/formSchemas/giftTrees';

export default class FormikFormGift extends Component {
  constructor(props) {
    super(props);

    this.state = { buttonType: 'next' };
  }
  UNSAFE_componentWillMount() {
    this.validationSchema = generateFormikSchemaFromFormSchema(
      giftInvitationFormSchema.properties.giftInvitation
    );
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
      buttonType: 'next'
    });
  };
  render() {
    let { props } = this;

    const backgroundColor = 'rgba(137, 181, 58, 0.19)';
    return (
      <Formik
        initialValues={props.initialValues}
        onSubmit={values => {
          props.openProjects(values, 'invitation');
        }}
        validationSchema={this.validationSchema}
      >
        {props => {
          let isValid = props;
          return (
            <>
              <View style={styles.view_container}>
                <KeyboardAwareScrollView
                  contentContainerStyle={[
                    styles.formScrollView,
                    { paddingTop: 0 }
                  ]}
                  enableOnAndroid
                  keyboardDismissMode="on-drag"
                  keyboardShouldPersistTaps="always"
                  resetScrollToCoords={{ x: 0, y: 0 }}
                  scrollEnabled
                >
                  <View style={{ paddingTop: 20, paddingBottom: 0 }}>
                    {/*<Text style={styles.add_competition_title}>
                      {i18n.t('label.gift_receipient')}
                    </Text>*/}
                    <Text style={stylesGift.description}>
                      {i18n.t('label.gift_trees_description')}
                    </Text>
                  </View>
                  <View style={styles.formView}>
                    <View style={styles.formHalfTextField}>
                      <TextField
                        label={i18n.t('label.First_Name')}
                        value={props.values.firstname}
                        tintColor={'#89b53a'}
                        titleFontSize={12}
                        returnKeyType="next"
                        lineWidth={1}
                        labelTextStyle={{ fontFamily: 'OpenSans-Regular' }}
                        titleTextStyle={{ fontFamily: 'OpenSans-Regular' }}
                        affixTextStyle={{ fontFamily: 'OpenSans-Regular' }}
                        blurOnSubmit={false}
                        error={
                          props.touched.firstname && props.errors.firstname
                        }
                        onChangeText={props.handleChange('firstname')}
                        onBlur={props.handleBlur('firstname')}
                      />
                    </View>

                    <View style={styles.formHalfTextField}>
                      <TextField
                        label={i18n.t('label.Last_Name')}
                        value={props.values.lastname}
                        tintColor={'#89b53a'}
                        titleFontSize={12}
                        returnKeyType="next"
                        lineWidth={1}
                        labelTextStyle={{ fontFamily: 'OpenSans-Regular' }}
                        titleTextStyle={{ fontFamily: 'OpenSans-Regular' }}
                        affixTextStyle={{ fontFamily: 'OpenSans-Regular' }}
                        blurOnSubmit={false}
                        error={props.touched.lastname && props.errors.lastname}
                        onChangeText={props.handleChange('lastname')}
                        onBlur={props.handleBlur('lastname')}
                      />
                    </View>
                  </View>
                  <View>
                    <TextField
                      label={i18n.t('label.Email')}
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
                      label={i18n.t('label.Gift_Message')}
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
                        buttonStyles.dualActionButtonTouchable,
                        { top: undefined, bottom: 55, flex: 1, padding: 20 }
                      ]}
                      onPress={props.isValid ? props.handleSubmit : null}
                    >
                      <View
                        style={[
                          buttonStyles.dualActionButtonView2,
                          !props.isValid
                            ? { backgroundColor: backgroundColor }
                            : {}
                        ]}
                      >
                        <Text style={buttonStyles.dualActionButtonText2}>
                          {i18n.t('label.continue_to_select_project')}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </>
                ) : null}

                {this.state.buttonType === '>' ? (
                  <TouchableOpacity
                    style={[
                      buttonStyles.actionButtonSmallTouchable,
                      { top: undefined, bottom: '16%' },
                      !props.isValid ? { backgroundColor: backgroundColor } : {}
                    ]}
                    onPress={props.isValid ? props.handleSubmit : null}
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
          );
        }}
      </Formik>
    );
  }
}
