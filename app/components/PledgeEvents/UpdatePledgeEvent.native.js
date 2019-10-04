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
import { updatePledge } from './../../actions/pledgeAction';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { updateStaticRoute } from '../../helpers/routerHelper';
import { loadUserProfile } from './../../actions/loadUserProfileAction';

import i18n from '../../locales/i18n';
import { connect } from 'react-redux';
import CheckBox from 'react-native-check-box';
import { currentUserProfileSelector } from './../../selectors';
import { bindActionCreators } from 'redux';

let _ = require('lodash');

class MakePledgeForm extends Component {
  state = {
    treeCount: '',
    buttonType: 'pledge',
    treeCountValidator: 'Please enter Tree Count',
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
    const unfulfilledEvent = this.props.navigation.getParam('unfulfilledEvent');
    this.setState({
      treeCount: unfulfilledEvent.treeCount
    });
    if (this.props.userProfile) {
      this.setState({
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
    const { treeCount } = this.state;
    const { navigation } = this.props;
    if (treeCount === '') {
      alert('Please Enter Tree Count');
    } else {
      // Create data object
      const data = {
        treeCount
      };
      console.log(data);
      // Update pledge using token
      const token = this.props.navigation.getParam('unfulfilledEvent').token;
      this.props.updatePledge(
        data,
        {
          token: token,
          version: 'v1.3'
        },
        this.state.loggedIn
      );

      //saveItem('pledgedEvent', JSON.stringify(date));

      // updateStaticRoute('app_pledge_events', this.props.navigation, {
      //   slug: this.props.navigation.getParam('slug'),
      //   plantProject: this.props.navigation.getParam('plantProject'),
      //   eventName: this.props.navigation.getParam('eventName'),
      //   eventDate: this.props.navigation.getParam('eventDate'),
      //   totalTrees: this.props.navigation.getParam('totalTrees'),
      //   eventImage: this.props.navigation.getParam('eventImage'),
      //   description: this.props.navigation.getParam('description'),
      //   treeCount: treeCount
      // });
    }
  };

  onFormChange(value) {
    this.setState({ value }); // <- keep track of value changes
  }

  render() {
    let { treeCount } = this.state;
    const { navigation } = this.props;
    const unfulfilledEvent = this.props.navigation.getParam('unfulfilledEvent');
    const treeCost = unfulfilledEvent.plantProjectTreeCost;
    const projectName = unfulfilledEvent.plantProjectName;
    const currency = unfulfilledEvent.plantProjectCurrency;

    return (
      <View>
        <KeyboardAwareScrollView
          contentContainerStyle={styles.formScrollView}
          keyboardDismissMode="on-drag"
          keyboardShouldPersistTaps="always"
          style={styles.keyboardScrollView}
          resetScrollToCoords={{ x: 0, y: 0 }}
          scrollEnabled
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
                {i18n.t('Update Pledge')}
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
  return bindActionCreators({ updatePledge, loadUserProfile }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(MakePledgeForm);
