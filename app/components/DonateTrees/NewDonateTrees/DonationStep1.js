import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Picker,
  Platform,
  Keyboard
} from 'react-native';
import { darkTree } from './../../../assets';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { updateStaticRoute } from './../../../helpers/routerHelper';
import RNPickerSelect from 'react-native-picker-select';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default class DonationStep1 extends Component {
  state = {
    treeCount: '',
    frequency: '',
    treeNumberSelected: 50,
    showContinue: true
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
      showContinue: false
    });
  };

  _keyboardDidHide = () => {
    this.setState({
      showContinue: true
    });
  };

  changeSelectedState = number => {
    this.setState({
      treeNumberSelected: number
    });
  };
  render() {
    return (
      <View>
        <KeyboardAwareScrollView
          contentContainerStyle={styles.pageScrollView}
          keyboardDismissMode="on-drag"
          style={{ backgroundColor: 'white' }}
          resetScrollToCoords={{ x: 0, y: 0 }}
          scrollEnabled={true}
        >
          <View style={styles.pageView}>
            <Text style={styles.pageTitle}> Tree Donation</Text>

            {/* Project Information Card */}
            <View style={styles.projectCardView}>
              <View style={styles.projectImageView}>
                <Image style={styles.projectImage} source={darkTree} />
              </View>
              <View style={styles.projectInfoView}>
                <Text style={styles.projectName}>
                  Yucatan Reforestation by Plant-for-the-Planet
                </Text>
                <View style={styles.projectInfo}>
                  <Icon name="map-marker-alt" size={12} color="#707070" />
                  <Text style={styles.projectSubInfo}>Yucatan, Mexico</Text>
                </View>
                <View style={styles.projectInfo}>
                  <Icon name="money-bill" size={12} color="#707070" />
                  <Text style={styles.projectSubInfo}>1 Euro per Tree</Text>
                </View>
              </View>
            </View>
            {/* Project Information Card Ended */}

            {/* Tree Count Information */}
            <Text style={styles.treeCountTitle}>HOW MANY TREES?</Text>
            <View style={styles.treeCountView}>
              <TouchableOpacity
                style={
                  this.state.treeNumberSelected === 10
                    ? styles.treeCountNumberButtonSelected
                    : styles.treeCountNumberButton
                }
                onPress={() => {
                  this.changeSelectedState(10);
                }}
              >
                <Text
                  style={
                    this.state.treeNumberSelected == 10
                      ? styles.treeCountNumberSelected
                      : styles.treeCountNumber
                  }
                >
                  10
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={
                  this.state.treeNumberSelected == 50
                    ? styles.treeCountNumberButtonSelected
                    : styles.treeCountNumberButton
                }
                onPress={() => {
                  this.changeSelectedState(50);
                }}
              >
                <Text
                  style={
                    this.state.treeNumberSelected == 50
                      ? styles.treeCountNumberSelected
                      : styles.treeCountNumber
                  }
                >
                  50
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={
                  this.state.treeNumberSelected == 150
                    ? styles.treeCountNumberButtonSelected
                    : styles.treeCountNumberButton
                }
                onPress={() => {
                  this.changeSelectedState(150);
                }}
              >
                <Text
                  style={
                    this.state.treeNumberSelected == 150
                      ? styles.treeCountNumberSelected
                      : styles.treeCountNumber
                  }
                >
                  150
                </Text>
              </TouchableOpacity>
              {/* If the treeCountNumberSelected has value of 0 which means none from above, use the treeCount from state for setting value */}
              <TouchableOpacity
                style={
                  this.state.treeNumberSelected == 0
                    ? styles.treeCountNumberButtonSelected
                    : styles.treeCountNumberButton
                }
                onPress={() => {
                  this.changeSelectedState(0);
                }}
              >
                <TextInput
                  style={
                    this.state.treeNumberSelected == 0
                      ? styles.treeCountTextInputSelected
                      : styles.treeCountTextInput
                  }
                  onChangeText={treeCount => this.setState({ treeCount })}
                  value={this.state.treeCount}
                  keyboardType={'number-pad'}
                />
                <Text
                  style={
                    this.state.treeNumberSelected == 0
                      ? styles.treeCountNumberSelected
                      : styles.treeCountNumber
                  }
                >
                  Trees
                </Text>
              </TouchableOpacity>
            </View>
            {/* Tree Count Information Ended */}

            {/* Donation Frequency Information */}
            <Text style={styles.treeCountTitle}>HOW OFTEN?</Text>
            <View
              style={{
                borderBottomWidth: 2,
                borderBottomColor: '#d5d5d5',
                width: '70%',
                paddingBottom: Platform.OS === 'ios' ? 8 : 0
              }}
            >
              <RNPickerSelect
                onValueChange={value => console.log(value)}
                items={[
                  { label: 'One Time Donation', value: '1' },
                  { label: 'Every 3 Months', value: '3' },
                  { label: 'Every 6 Months', value: '6' },
                  { label: 'Every Year', value: '12' }
                ]}
                placeholder={{}}
              />
            </View>

            {/* Donation Frequency Information Ended */}

            {/* Tree Dedicated to Section */}
            <Text style={styles.treeDedicatedTitle}>
              Tree Gift to / Dedicated To / Pledged on
            </Text>
            <View style={styles.treeDedicatedContainer}>
              <View style={styles.treeDedicatedProfile} />
              <View style={styles.treeDedicatedInfo}>
                <Text style={styles.treeDedicatedName}>Christina Figurees</Text>
                <Text style={styles.treeDedicatedEmail}>c.fig@unfcccc.int</Text>
              </View>
              <View>
                <Icon name="times" size={18} color="#707070" />
              </View>
            </View>
            {/* Tree Dedicated to Section Ended */}
          </View>
        </KeyboardAwareScrollView>

        {/* Continue Button Section  */}
        {this.state.showContinue ? (
          <View style={styles.buttonSectionView}>
            <View style={styles.donationSummary}>
              <View style={styles.donationCost}>
                <Text style={styles.donationAmount}>€ 50</Text>
                <Text style={styles.donationTree}>for 50 Trees</Text>
              </View>
              <Text style={styles.donationFrequency}>One Time Donation</Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                updateStaticRoute('app_donate_detail2', this.props.navigation);
              }}
            >
              <View style={styles.continueButtonView}>
                <Icon name="arrow-right" size={30} color="#fff" />
                <Text style={styles.continueText}>Continue</Text>
              </View>
            </TouchableOpacity>
          </View>
        ) : null}

        {/* Continue Button Section Ended */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  pageScrollView: {
    backgroundColor: 'white',
    paddingBottom: 140
  },
  pageView: {
    padding: 20
  },
  pageTitle: {
    fontSize: 27,
    fontWeight: '800',
    fontStyle: 'normal',
    lineHeight: 40,
    letterSpacing: 0,
    textAlign: 'left',
    color: '#4d5153'
  },
  projectCardView: {
    borderRadius: 9,
    backgroundColor: '#ffffff',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#d5d5d5',
    padding: 16,
    marginTop: 20,
    flexDirection: 'row'
  },
  projectName: {
    fontSize: 18,
    fontWeight: '600',
    fontStyle: 'normal',
    lineHeight: 27,
    letterSpacing: 0,
    textAlign: 'left',
    color: '#4d5153'
  },
  projectSubInfo: {
    fontSize: 14,
    fontWeight: 'normal',
    fontStyle: 'normal',
    lineHeight: 21,
    letterSpacing: 0,
    textAlign: 'left',
    color: '#4d5153',
    marginLeft: 4
  },
  projectImageView: {
    width: 40,
    height: 40,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#d5d5d5',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  projectImage: {
    width: 28,
    height: 28,
    resizeMode: 'contain'
  },
  projectInfoView: {
    marginLeft: 14
  },
  projectInfo: {
    marginTop: 3,
    flexDirection: 'row',
    alignItems: 'center'
  },
  treeCountTitle: {
    fontSize: 14,
    fontWeight: '600',
    fontStyle: 'normal',
    lineHeight: 17,
    letterSpacing: 0,
    textAlign: 'left',
    color: '#4d5153',
    marginTop: 27,
    marginBottom: 20
  },
  treeCountView: {
    flexDirection: 'row',
    marginTop: 20
  },
  treeCountNumber: {
    fontSize: 14,
    fontWeight: 'normal',
    fontStyle: 'normal',
    lineHeight: 19,
    letterSpacing: 0,
    textAlign: 'center',
    color: '#4d5153'
  },
  treeCountNumberSelected: {
    fontSize: 14,
    fontWeight: 'normal',
    fontStyle: 'normal',
    lineHeight: 19,
    letterSpacing: 0,
    textAlign: 'center',
    color: '#ffffff'
  },
  treeCountNumberButton: {
    borderRadius: 30,
    backgroundColor: '#ffffff',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#d5d5d5',
    padding: 12,
    marginRight: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 60,
    minWidth: 60
  },
  treeCountNumberButtonSelected: {
    borderRadius: 30,
    backgroundColor: '#89b53a',
    padding: 12,
    marginRight: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 60,
    minWidth: 60
  },

  treeCountTextInput: {
    borderColor: 'gray',
    borderWidth: 0,
    borderBottomWidth: 1,
    padding: 0,
    width: 50,
    color: '#fff'
  },
  treeCountTextInputSelected: {
    borderColor: 'white',
    borderWidth: 0,
    borderBottomWidth: 1,
    padding: 0,
    width: 50,
    color: '#fff'
  },

  donationFrequencyTitle: {
    fontSize: 14,
    fontWeight: '600',
    fontStyle: 'normal',
    lineHeight: 17,
    letterSpacing: 0,
    textAlign: 'left',
    color: '#4d5153',
    marginTop: 40
  },
  treeDedicatedTitle: {
    fontSize: 14,
    fontWeight: '600',
    fontStyle: 'normal',
    lineHeight: 17,
    letterSpacing: 0,
    textAlign: 'left',
    color: '#4d5153',
    marginTop: 40,
    textTransform: 'uppercase'
  },
  treeDedicatedContainer: {
    flexDirection: 'row',
    marginTop: 24,
    alignItems: 'center'
  },
  treeDedicatedProfile: {
    width: 32,
    height: 32,
    backgroundColor: '#e3e3e3',
    borderRadius: 16
  },
  treeDedicatedInfo: {
    marginLeft: 10,
    flexGrow: 1
  },
  treeDedicatedName: {
    fontSize: 16,
    fontWeight: 'normal',
    fontStyle: 'normal',
    lineHeight: 22,
    letterSpacing: 0.21,
    textAlign: 'left',
    color: '#000000'
  },
  treeDedicatedEmail: {
    fontSize: 12,
    fontWeight: 'normal',
    fontStyle: 'normal',
    lineHeight: 17,
    letterSpacing: 0,
    textAlign: 'left',
    color: '#707070'
  },
  buttonSectionView: {
    width: '100%',
    backgroundColor: '#f7f7f7',
    height: 88,
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    top: '80%'
  },
  donationSummary: {
    padding: 20
  },
  donationCost: {
    flexDirection: 'row'
  },
  donationAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    fontStyle: 'normal',
    lineHeight: 21,
    letterSpacing: 0,
    textAlign: 'left',
    color: '#89b53a'
  },
  donationTree: {
    fontSize: 14,
    fontWeight: '600',
    fontStyle: 'normal',
    lineHeight: 21,
    letterSpacing: 0,
    textAlign: 'left',
    color: '#707070',
    marginLeft: 6
  },
  donationFrequency: {
    fontSize: 12,
    fontWeight: '600',
    fontStyle: 'normal',
    lineHeight: 12,
    letterSpacing: 0,
    textAlign: 'left',
    color: '#4d5153',
    marginTop: 8
  },
  continueButtonView: {
    backgroundColor: '#89b53a',
    padding: 18,
    justifyContent: 'center',
    alignItems: 'center'
  },
  continueText: {
    fontSize: 16,
    fontWeight: '600',
    fontStyle: 'normal',
    lineHeight: 22,
    letterSpacing: 0.21,
    textAlign: 'center',
    color: '#ffffff',
    marginTop: 4
  }
});
