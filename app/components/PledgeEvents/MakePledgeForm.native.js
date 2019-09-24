import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Keyboard,
  TextInput,
  Button
} from 'react-native';
import { TextField } from 'react-native-material-textfield';
import { Formik } from 'formik';
import * as Yup from 'yup';
import styles from './../../styles/pledgeevents/pledgeevents.native';
import { forward } from './../../assets';
import t from 'tcomb-form-native';
import { postPledge } from './../../actions/pledgeAction';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { updateStaticRoute } from '../../helpers/routerHelper';

import i18n from '../../locales/i18n';
import { connect } from 'react-redux';

// import {
//   pledgeFormSchema,
//   pledgeSchemaOptions
// } from './../../server/parsedSchemas/pledge';

import pledgeFormSchema from './../../server/formSchemas/pledge';
import { generateFormikSchemaFromFormSchema } from '../../helpers/utils';

const validationSchema = generateFormikSchemaFromFormSchema(pledgeFormSchema);

let _ = require('lodash');

class MakePledgeForm extends Component {
  state = {
    buttonType: 'pledge'
  };
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
      buttonType: 'pledge'
    });
  };

  stringValidator = (firstname, lastname) => {
    if (
      typeof firstname === 'string' ||
      (firstname instanceof String && typeof lastname === 'string') ||
      lastname instanceof String
    ) {
      return true;
    } else {
      return false;
    }
  };

  onFormChange(value) {
    this.setState({ value }); // <- keep track of value changes
  }

  render() {
    const treeCost = this.props.navigation.getParam('plantProject').treeCost;
    const projectName = this.props.navigation.getParam('plantProject').name;
    const currency = this.props.navigation.getParam('plantProject').currency;

    return (
      <KeyboardAwareScrollView
        contentContainerStyle={styles.formScrollView}
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps="always"
        style={styles.keyboardScrollView}
        resetScrollToCoords={{ x: 0, y: 0 }}
        scrollEnabled={true}
      >
        <View>
          <Text style={styles.titleText}>{i18n.t('label.pledgeToPlant')}</Text>
          <Text style={styles.subtitleText}>
            {i18n.t('label.pledgeToPlantDesc', {
              treeCost: treeCost,
              currency: currency,
              projectName: projectName
            })}
          </Text>
        </View>
        <Formik
          initialValues={{
            firstname: '',
            lastname: '',
            email: '',
            treeCount: ''
          }}
          onSubmit={values => {
            const data = {
              firstname: values.firstname,
              lastname: values.lastname,
              email: values.email,
              treeCount: values.treeCount
            };
            console.log(data);
            const params = this.props.navigation.getParam('slug');
            this.props.postPledge(data, {
              pledgeEventSlug: params
            });
            //this.RBSheet.open();
            updateStaticRoute('app_pledge_events', this.props.navigation, {
              slug: this.props.navigation.getParam('slug'),
              plantProject: this.props.navigation.getParam('plantProject'),
              eventName: this.props.navigation.getParam('eventName'),
              eventDate: this.props.navigation.getParam('eventDate'),
              totalTrees: this.props.navigation.getParam('totalTrees'),
              eventImage: this.props.navigation.getParam('eventImage'),
              description: this.props.navigation.getParam('description'),
              treeCount: data.treeCount
            });
          }}
          validationSchema={validationSchema}
        >
          {props => (
            <>
              <View>
                <View style={styles.formView}>
                  <View style={styles.formHalfTextField}>
                    <TextField
                      label={i18n.t('label.pledgeFormFName')}
                      value={props.values.firstname}
                      tintColor={'#89b53a'}
                      titleFontSize={12}
                      returnKeyType="next"
                      lineWidth={1}
                      blurOnSubmit={false}
                      onSubmitEditing={() => {
                        this.lastnameTextInput.focus();
                      }}
                      error={props.touched.firstname && props.errors.firstname}
                      onChangeText={props.handleChange('firstname')}
                      onBlur={props.handleBlur('firstname')}
                    />
                  </View>

                  <View style={styles.formHalfTextField}>
                    <TextField
                      label={i18n.t('label.pledgeFormLName')}
                      value={props.values.lastname}
                      tintColor={'#89b53a'}
                      titleFontSize={12}
                      returnKeyType="next"
                      lineWidth={1}
                      ref={input => {
                        this.lastnameTextInput = input;
                      }}
                      onSubmitEditing={() => {
                        this.emailTextInput.focus();
                      }}
                      error={props.touched.lastname && props.errors.lastname}
                      onChangeText={props.handleChange('lastname')}
                      onBlur={props.handleBlur('lastname')}
                    />
                  </View>
                </View>

                <View>
                  <TextField
                    label={i18n.t('label.pledgeFormEmail')}
                    value={props.values.email}
                    tintColor={'#89b53a'}
                    titleFontSize={12}
                    lineWidth={1}
                    keyboardType="email-address"
                    ref={input => {
                      this.emailTextInput = input;
                    }}
                    onSubmitEditing={() => {
                      this.treecountTextInput.focus();
                    }}
                    error={props.touched.email && props.errors.email}
                    returnKeyType="next"
                    onChangeText={props.handleChange('email')}
                    onBlur={props.handleBlur('email')}
                  />
                </View>
                <View style={styles.formtreecountView}>
                  <View style={styles.formHalfTextField}>
                    <TextField
                      label={i18n.t('label.pledgeFormTreecount')}
                      tintColor={'#89b53a'}
                      value={props.values.treeCount}
                      titleFontSize={12}
                      lineWidth={1}
                      keyboardType="numeric"
                      ref={input => {
                        this.treecountTextInput = input;
                      }}
                      error={props.touched.treeCount && props.errors.treeCount}
                      returnKeyType="done"
                      onChangeText={props.handleChange('treeCount')}
                      onBlur={props.handleBlur('treeCount')}
                    />
                  </View>
                </View>
              </View>

              {this.state.buttonType === 'pledge' ? (
                <TouchableOpacity
                  style={styles.makePledgeButton2}
                  onPress={props.handleSubmit}
                >
                  <View style={styles.makePledgeButtonView}>
                    <Text style={styles.makePledgeButtonText}>
                      {i18n.t('label.pledge')}
                    </Text>
                  </View>
                </TouchableOpacity>
              ) : null}

              {this.state.buttonType === '>' ? (
                <TouchableOpacity
                  style={styles.pledgeSmallButton}
                  onPress={props.handleSubmit}
                >
                  <Image
                    source={forward}
                    resizeMode="cover"
                    style={styles.pledgeSmallButtonIcon}
                  />
                </TouchableOpacity>
              ) : null}
            </>
          )}
        </Formik>
      </KeyboardAwareScrollView>
    );
  }
}

const mapStateToProps = state => ({
  // postedPledge: postedPledgeSelector(state)
});

export default connect(mapStateToProps, { postPledge })(MakePledgeForm);

// To Do - Replace form with Tcomb Form
