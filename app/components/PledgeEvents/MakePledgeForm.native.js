/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Keyboard,
  Animated
} from 'react-native';
import { TextField } from 'react-native-material-textfield';
import { Formik } from 'formik';
import styles from './../../styles/pledgeevents/pledgeevents.native';
import { forward } from './../../assets';
import { postPledge } from './../../actions/pledgeAction';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { updateStaticRoute } from '../../helpers/routerHelper';
import { loadUserProfile } from './../../actions/loadUserProfileAction';

import i18n from '../../locales/i18n';
import { connect } from 'react-redux';
import CheckBox from 'react-native-check-box';
import { currentUserProfileSelector } from './../../selectors';
import { bindActionCreators } from 'redux';

import pledgeFormSchema from './../../server/formSchemas/pledge';
import { generateFormikSchemaFromFormSchema } from '../../helpers/utils';
import HeaderAnimated from './../Header/HeaderAnimated.native';

const validationSchema = generateFormikSchemaFromFormSchema(pledgeFormSchema, [
  'firstname',
  'lastname',
  'email',
  'treeCount'
]);

class MakePledgeForm extends Component {
  static navigationOptions = {
    header: null
  };
  state = {
    firstname: '',
    lastname: '',
    email: '',
    treeCount: '',
    buttonType: 'pledge',
    isAnonymous: false,
    loggedIn: false,
    scrollY: new Animated.Value(0)
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

    if (this.props.userProfile) {
      const userProfile = this.props.userProfile;
      this.setState({
        firstname: userProfile.firstname,
        lastname: userProfile.lastname,
        email: userProfile.email,
        loggedIn: true
      });
    }
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

  onFormChange(value) {
    this.setState({ value }); // <- keep track of value changes
  }

  render() {
    let { firstname, lastname, email, treeCount } = this.state;

    const treeCost = this.props.navigation.getParam('plantProject').treeCost;
    const projectName = this.props.navigation.getParam('plantProject').name;
    const currency = this.props.navigation.getParam('plantProject').currency;

    return (
      <View style={styles.createPledgeRootView}>
        <HeaderAnimated
          navigation={this.props.navigation}
          title={i18n.t('label.pledgeToPlant')}
          scrollY={this.state.scrollY}
        />
        <KeyboardAwareScrollView
          contentContainerStyle={styles.formScrollView}
          keyboardDismissMode="on-drag"
          keyboardShouldPersistTaps="always"
          resetScrollToCoords={{ x: 0, y: 0 }}
          scrollEnabled
          scrollEventThrottle={16}
          onScroll={Animated.event([
            { nativeEvent: { contentOffset: { y: this.state.scrollY } } }
          ])}
        >
          <View>
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
              firstname,
              lastname,
              email,
              treeCount
            }}
            onSubmit={values => {
              const data = {
                firstname: values.firstname,
                lastname: values.lastname,
                email: values.email,
                treeCount: values.treeCount,
                isAnonymous: this.state.isAnonymous
              };
              console.log(data);
              const params = this.props.navigation.getParam('slug');
              this.props.postPledge(
                data,
                {
                  pledgeEventSlug: params,
                  version: 'v1.3'
                },
                this.state.loggedIn
              );
              //this.RBSheet.open();
              updateStaticRoute('app_pledge_events', this.props.navigation, {
                slug: this.props.navigation.getParam('slug'),
                plantProject: this.props.navigation.getParam('plantProject'),
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
                        labelTextStyle={{ fontFamily: 'OpenSans-Regular' }}
                        titleTextStyle={{ fontFamily: 'OpenSans-SemiBold' }}
                        affixTextStyle={{ fontFamily: 'OpenSans-Regular' }}
                        blurOnSubmit={false}
                        onSubmitEditing={() => {
                          this.lastnameTextInput.focus();
                        }}
                        error={
                          props.touched.firstname && props.errors.firstname
                        }
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
                        labelTextStyle={{ fontFamily: 'OpenSans-Regular' }}
                        titleTextStyle={{ fontFamily: 'OpenSans-SemiBold' }}
                        affixTextStyle={{ fontFamily: 'OpenSans-Regular' }}
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
                      labelTextStyle={{ fontFamily: 'OpenSans-Regular' }}
                      titleTextStyle={{ fontFamily: 'OpenSans-SemiBold' }}
                      affixTextStyle={{ fontFamily: 'OpenSans-Regular' }}
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
                        error={
                          props.touched.treeCount && props.errors.treeCount
                        }
                        labelTextStyle={{ fontFamily: 'OpenSans-Regular' }}
                        titleTextStyle={{ fontFamily: 'OpenSans-SemiBold' }}
                        affixTextStyle={{ fontFamily: 'OpenSans-Regular' }}
                        returnKeyType="done"
                        onChangeText={props.handleChange('treeCount')}
                        onBlur={props.handleBlur('treeCount')}
                      />
                    </View>
                  </View>
                  <View style={{ width: '100%', marginTop: 30 }}>
                    <CheckBox
                      onClick={() => {
                        this.setState({
                          isAnonymous: !this.state.isAnonymous
                        });
                      }}
                      checkedCheckBoxColor="#89b53a"
                      isChecked={this.state.isAnonymous}
                      rightTextStyle={{
                        fontFamily: 'OpenSans-Regular'
                      }}
                      rightText="Hide my Name from the list (Anonymous Pledge)"
                    />
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
      </View>
    );
  }
}

const mapStateToProps = state => ({
  userProfile: currentUserProfileSelector(state)
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ postPledge, loadUserProfile }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(MakePledgeForm);
