import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class Trillion extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Logged In </Text>
      </View>
    );
  }
}

const skyBlue = '#F5FCFF';

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
  }
});
