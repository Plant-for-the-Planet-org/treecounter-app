import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TouchableNativeFeedback,
  ScrollView,
  SafeAreaView
} from 'react-native';
import MenuItem from '../Common/Menu/MenuItem';

export default class SideNavigationMenu extends Component {
  onPressMenu(item) {
    console.log('cliecked me');
  }

  render() {
    return (
      <SafeAreaView>
        <ScrollView>
          <MenuItem onPress={() => this.onPressMenu('test1')} titleId={23} />
          <MenuItem onPress={() => this.onPressMenu('test2')} titleId={23} />
        </ScrollView>
      </SafeAreaView>
    );
  }
}
