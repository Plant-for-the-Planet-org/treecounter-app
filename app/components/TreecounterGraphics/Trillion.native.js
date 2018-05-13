import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class Trillion extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native with react navigation navigation{' '}
        </Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
      </View>
    );
  }
}

const skyBlue = '#F5FCFF';
const red = '#333333';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: skyBlue
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: red,
    marginBottom: 5
  }
});
