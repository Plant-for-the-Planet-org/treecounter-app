import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Step2Tabs from './Step2Tabs';
import { updateStaticRoute } from './../../../helpers/routerHelper';

export default class DonationStep2 extends Component {
  state = {};
  render() {
    return (
      <View>
        <ScrollView contentContainerStyle={styles.pageScrollView}>
          <View style={styles.pageView}>
            <Text style={styles.pageTitle}>Donation Details</Text>
            <Text style={styles.pageSubTitle}>
              Please add your billing details.
            </Text>
          </View>

          <Step2Tabs />
        </ScrollView>
        {/* Continue Button Section  */}
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
              updateStaticRoute('app_donate_detail3', this.props.navigation);
            }}
          >
            <View style={styles.continueButtonView}>
              <Icon name="arrow-right" size={30} color="#fff" />
              <Text style={styles.continueText}>Continue</Text>
            </View>
          </TouchableOpacity>
        </View>
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
  pageSubTitle: {
    fontSize: 18,
    fontWeight: '400',
    fontStyle: 'normal',
    lineHeight: 24,
    letterSpacing: 0,
    textAlign: 'left',
    color: '#4d5153',
    marginTop: 7
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
