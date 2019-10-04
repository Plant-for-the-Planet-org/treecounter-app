import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Keyboard
} from 'react-native';
import { TextField } from 'react-native-material-textfield';
import styles from './../../styles/pledgeevents/pledgeevents.native';
import { forward } from './../../assets';
import { postPledge } from './../../actions/pledgeAction';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { updateStaticRoute } from '../../helpers/routerHelper';
import { loadUserProfile } from './../../actions/loadUserProfileAction';

import i18n from '../../locales/i18n';
import { connect } from 'react-redux';
import CheckBox from 'react-native-check-box';
import AsyncStorage from '@react-native-community/async-storage';
import { fetchItem, saveItem } from '../../stores/localStorage';
import { currentUserProfileSelector } from './../../selectors';
import { bindActionCreators } from 'redux';

let _ = require('lodash');

class MakePledgeForm extends Component {
  state = {
    firstname: '',
    lastname: '',
    email: '',
    treeCount: '',
    buttonType: 'pledge',
    firstnameValidator: 'Please enter First Name',
    lastnameValidator: 'Please enter Last Name',
    emailValidator: 'Please enter Email',
    treeCountValidator: 'Please enter Tree Count',
    isAnonymous: false,
    loggedIn: false
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

  componentDidMount() {
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

  onFormSubmit = async () => {
    const { firstname, lastname, email, treeCount, isAnonymous } = this.state;
    const { navigation } = this.props;
    let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (
      firstname === '' ||
      lastname === '' ||
      email === '' ||
      treeCount === ''
    ) {
      if (firstname === '') {
        alert('Please Enter First Name');
      } else if (lastname === '') {
        alert('Please Enter Last Name');
      } else if (email === '') {
        alert('Please Enter Email ID');
      } else if (treeCount === '') {
        alert('Please Enter Tree Count');
      }
    } else {
      if (typeof firstname === 'string' && typeof lastname === 'string') {
        if (email.match(mailformat)) {
          // Create data object
          const data = {
            firstname,
            lastname,
            email,
            treeCount,
            isAnonymous
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

          //saveItem('pledgedEvent', JSON.stringify(date));

          updateStaticRoute('app_pledge_events', this.props.navigation, {
            slug: this.props.navigation.getParam('slug'),
            plantProject: this.props.navigation.getParam('plantProject'),
            eventName: this.props.navigation.getParam('eventName'),
            eventDate: this.props.navigation.getParam('eventDate'),
            totalTrees: this.props.navigation.getParam('totalTrees'),
            eventImage: this.props.navigation.getParam('eventImage'),
            description: this.props.navigation.getParam('description'),
            treeCount: treeCount
          });
        } else {
          alert('Incorrect Email Entered');
        }
      } else {
        alert('Only characters allowed in First Name and Last Name');
      }
    }
  };

  onFormChange(value) {
    this.setState({ value }); // <- keep track of value changes
  }

  render() {
    let { firstname, lastname, email, treeCount } = this.state;
    const { navigation } = this.props;
    const treeCost = this.props.navigation.getParam('plantProject').treeCost;
    const projectName = this.props.navigation.getParam('plantProject').name;
    const currency = this.props.navigation.getParam('plantProject').currency;

    return (
      <View>
        <KeyboardAwareScrollView
          contentContainerStyle={styles.formScrollView}
          keyboardDismissMode="on-drag"
          keyboardShouldPersistTaps="always"
          style={styles.keyboardScrollView}
          resetScrollToCoords={{ x: 0, y: 0 }}
          scrollEnabled={true}
        >
          <View>
            <Text style={styles.titleText}>
              {i18n.t('label.pledgeToPlant')}
            </Text>
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
                  value={firstname}
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
                  onChangeText={firstname => this.setState({ firstname })}
                />
              </View>

              <View style={styles.formHalfTextField}>
                <TextField
                  label={i18n.t('label.pledgeFormLName')}
                  value={lastname}
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
                  onChangeText={lastname => this.setState({ lastname })}
                />
              </View>
            </View>

            <View>
              <TextField
                label={i18n.t('label.pledgeFormEmail')}
                value={email}
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
                labelTextStyle={{ fontFamily: 'OpenSans-Regular' }}
                titleTextStyle={{ fontFamily: 'OpenSans-SemiBold' }}
                affixTextStyle={{ fontFamily: 'OpenSans-Regular' }}
                returnKeyType="next"
                onChangeText={email => this.setState({ email })}
              />
            </View>
            <View style={styles.formtreecountView}>
              <View style={styles.formHalfTextField}>
                <TextField
                  label={i18n.t('label.pledgeFormTreecount')}
                  tintColor={'#89b53a'}
                  value={treeCount}
                  titleFontSize={12}
                  lineWidth={1}
                  keyboardType="numeric"
                  ref={input => {
                    this.treecountTextInput = input;
                  }}
                  labelTextStyle={{ fontFamily: 'OpenSans-Regular' }}
                  titleTextStyle={{ fontFamily: 'OpenSans-SemiBold' }}
                  affixTextStyle={{ fontFamily: 'OpenSans-Regular' }}
                  returnKeyType="done"
                  onChangeText={treeCount => this.setState({ treeCount })}
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
                  fontFamily: 'OpenSans-Regular',
                  color: '#4d5153'
                }}
                rightText="Hide my Name from the list (Anonymous Pledge)"
              />
            </View>
          </View>
        </KeyboardAwareScrollView>

        {this.state.buttonType === 'pledge' ? (
          <TouchableOpacity
            style={styles.makePledgeButton2}
            onPress={() => {
              this.onFormSubmit();
            }}
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
            onPress={() => {
              this.onFormSubmit();
            }}
          >
            <Image
              source={forward}
              resizeMode="cover"
              style={styles.pledgeSmallButtonIcon}
            />
          </TouchableOpacity>
        ) : null}
      </View>
    );
  }
}

// To Do - Replace form with Tcomb Form

const mapStateToProps = state => ({
  userProfile: currentUserProfileSelector(state)
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ postPledge, loadUserProfile }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(MakePledgeForm);
