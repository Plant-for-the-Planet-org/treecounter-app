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
import styles from './../../styles/pledgeevents/pledgeevents.native';
import { forward } from './../../assets';
import { updatePledge } from './../../actions/pledgeAction';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { updateStaticRoute } from '../../helpers/routerHelper';
import { loadUserProfile } from './../../actions/loadUserProfileAction';
import CheckBox from 'react-native-check-box';

import i18n from '../../locales/i18n';
import { connect } from 'react-redux';
import { currentUserProfileSelector } from './../../selectors';
import { bindActionCreators } from 'redux';
import { Formik } from 'formik';
import { SafeAreaView } from 'react-navigation';

import pledgeFormSchema from './../../server/formSchemas/pledge';
import { generateFormikSchemaFromFormSchema } from '../../helpers/utils';
import HeaderAnimated from './../Header/HeaderAnimated.native';

class MakePledgeForm extends Component {
  static navigationOptions = {
    header: null
  };
  state = {
    treeCount: '',
    buttonType: 'pledge',
    loggedIn: false,
    firstname: '',
    lastname: '',
    isAnonymous: false,
    scrollY: new Animated.Value(0),
    oldTreeCount: ''
  };

  componentWillMount() {
    this.validationSchema = generateFormikSchemaFromFormSchema(
      pledgeFormSchema,
      ['firstname', 'lastname', 'treeCount']
    );

    const unfulfilledEvent = this.props.navigation.getParam('unfulfilledEvent');
    this.setState({
      treeCount: unfulfilledEvent.treeCount.toString(),
      oldTreeCount: unfulfilledEvent.treeCount.toString(),
      firstname: unfulfilledEvent.firstname,
      lastname: unfulfilledEvent.lastname,
      isAnonymous: unfulfilledEvent.isAnonymous
    });
    if (this.props.userProfile) {
      this.setState({
        loggedIn: true
      });
    }

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
      buttonType: 'pledge'
    });
  };

  onFormChange(value) {
    this.setState({ value }); // <- keep track of value changes
  }

  render() {
    let { firstname, lastname, treeCount } = this.state;
    const unfulfilledEvent = this.props.navigation.getParam('unfulfilledEvent');
    const treeCost = unfulfilledEvent.plantProjectTreeCost;
    const projectName = unfulfilledEvent.plantProjectName;
    const currency = unfulfilledEvent.plantProjectCurrency;
    const token = unfulfilledEvent.token;

    return (
      <SafeAreaView style={styles.createPledgeRootView}>
        <View>
          <HeaderAnimated
            navigation={this.props.navigation}
            title={i18n.t('label.updatePledgeButton')}
            scrollY={this.state.scrollY}
          />
          <View />
          <Formik
            initialValues={{
              firstname,
              lastname,
              treeCount
            }}
            onSubmit={values => {
              const data = {
                firstname: values.firstname,
                lastname: values.lastname,
                treeCount: values.treeCount,
                isAnonymous: this.state.isAnonymous
              };
              console.log(data);
              // Update pledge using token

              this.props.updatePledge(
                data,
                {
                  token: token,
                  version: 'v1.3'
                },
                this.state.loggedIn
              );

              //saveItem('pledgedEvent', JSON.stringify(date));

              updateStaticRoute('app_pledge_events', this.props.navigation, {
                slug: this.props.slug,
                plantProject: this.props.navigation.getParam('plantProject'),
                treeCount: data.treeCount
              });
            }}
            validationSchema={this.validationSchema}
            validate={values => {
              let errors = {};
              if (values.treeCount < this.state.oldTreeCount) {
                errors.treeCount = i18n.t('label.higherTreeCount', {
                  treeCount: this.state.oldTreeCount
                });
              }
              return errors;
            }}
          >
            {props => (
              <>
                <KeyboardAwareScrollView
                  contentContainerStyle={styles.formScrollView}
                  keyboardDismissMode="on-drag"
                  keyboardShouldPersistTaps="always"
                  resetScrollToCoords={{ x: 0, y: 0 }}
                  scrollEnabled
                  scrollEventThrottle={16}
                  onScroll={Animated.event([
                    {
                      nativeEvent: {
                        contentOffset: { y: this.state.scrollY }
                      }
                    }
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
                          error={
                            props.touched.lastname && props.errors.lastname
                          }
                          onChangeText={props.handleChange('lastname')}
                          onBlur={props.handleBlur('lastname')}
                        />
                      </View>
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
                        rightText={i18n.t('label.createPledgeFormHint')}
                      />
                    </View>
                  </View>
                </KeyboardAwareScrollView>

                {this.state.buttonType === 'pledge' ? (
                  <TouchableOpacity
                    style={styles.makePledgeButton2}
                    onPress={props.handleSubmit}
                  >
                    <View style={styles.makePledgeButtonView}>
                      <Text style={styles.makePledgeButtonText}>
                        {i18n.t('label.updatePledgeButton')}
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
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  userProfile: currentUserProfileSelector(state)
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ updatePledge, loadUserProfile }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(MakePledgeForm);
