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
import { Formik } from 'formik';

let _ = require('lodash');

import pledgeFormSchema from './../../server/formSchemas/pledge';
import { generateFormikSchemaFromFormSchema } from '../../helpers/utils';

const validationSchema = generateFormikSchemaFromFormSchema(pledgeFormSchema, [
  'treeCount'
]);

class MakePledgeForm extends Component {
  state = {
    treeCount: '',
    buttonType: 'pledge',
    loggedIn: false
  };

  componentWillMount() {
    const unfulfilledEvent = this.props.navigation.getParam('unfulfilledEvent');
    this.setState({
      treeCount: unfulfilledEvent.treeCount.toString()
    });
    if (this.props.userProfile) {
      this.setState({
        loggedIn: true
      });
    }

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
              {i18n.t('label.increasePledge')}
            </Text>
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
              treeCount
            }}
            onSubmit={values => {
              const data = {
                treeCount: values.treeCount
              };
              console.log(data);
              // Update pledge using token
              const token = this.props.navigation.getParam('unfulfilledEvent')
                .token;
              this.props.updatePledge(
                data,
                {
                  token: token,
                  version: 'v1.3'
                },
                this.state.loggedIn
              );

              //saveItem('pledgedEvent', JSON.stringify(date));

              updateStaticRoute(
                'app_unfulfilled_pledge_events',
                this.props.navigation,
                {
                  unfulfilledEvent: this.props.unfulfilledEvent
                }
              );
            }}
            validationSchema={validationSchema}
          >
            {props => (
              <>
                <View>
                  <View style={styles.formtreecountView}>
                    <View style={styles.formHalfTextField}>
                      <TextField
                        label={i18n.t('label.pledgeFormTreecount')}
                        tintColor={'#89b53a'}
                        value={props.values.treeCount}
                        titleFontSize={12}
                        lineWidth={1}
                        keyboardType="numeric"
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
                </View>

                {this.state.buttonType === 'pledge' ? (
                  <TouchableOpacity
                    style={styles.makePledgeButton2}
                    onPress={props.handleSubmit}
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

// To Do - Replace form with Tcomb Form

const mapStateToProps = state => ({
  userProfile: currentUserProfileSelector(state)
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ updatePledge, loadUserProfile }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(MakePledgeForm);
