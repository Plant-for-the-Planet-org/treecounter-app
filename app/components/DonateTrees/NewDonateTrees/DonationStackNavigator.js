import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import DonationStep1 from './DonationStep1';
import DonationStep2 from './DonationStep2';
import DonationStep3 from './DonationStep3';

export default class DonationStackNavigator extends Component {
  render() {
    return <View>{appStackNavigator}</View>;
  }
}

const appStackNavigator = createStackNavigator(
  {
    ['app_donate_detail']: {
      screen: DonationStep1
    },
    ['app_donate_detail2']: {
      screen: DonationStep2
    },
    ['app_donate_detail3']: {
      screen: DonationStep3
    }
  },
  {
    navigationOptions: ({ navigation }) => {
      let navigationConfig = {
        headerStyle: styles.container,
        headerTitleStyle: { paddingRight: 16 },
        headerBackTitle: null,
        title: getTitle(navigation)
      };
      return navigationConfig;
    }
  }
);
const styles = StyleSheet.create({
  // This is to try white header
  container: {
    backgroundColor: '#fff',
    borderBottomWidth: 0,
    shadowColor: 'transparent'
  }
});
