import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TouchableNativeFeedback,
  ScrollView,
  SafeAreaView,
  StyleSheet
} from 'react-native';
import MenuItem from './MenuItem.native';

export default class Menu extends Component {
  onPressMenu(item) {
    console.log('cliecked me');
  }

  render() {
    return (
      <SafeAreaView style={styles.outerContainer}>
        <ScrollView>
          <MenuItem onPress={() => this.onPressMenu('test1')} titleId={23} />
          <MenuItem onPress={() => this.onPressMenu('test2')} titleId={23} />
        </ScrollView>
      </SafeAreaView>
    );
  }
}
export const styles = StyleSheet.create({
  outerContainer: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flex: 1
  },
  imageStyle: {
    width: 17,
    height: 18,
    resizeMode: 'center'
  },
  textStyle: {
    fontSize: 11,
    color: '#6a6161'
  }
});
