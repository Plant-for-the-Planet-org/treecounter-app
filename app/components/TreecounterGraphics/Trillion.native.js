import React, { Component } from 'react';
import t from 'tcomb-form-native';
import temp from '../../server/formSchemas/parserLiformToTcomb';
import { StyleSheet, Text, View } from 'react-native';

let Form = t.form.Form;
let options = {};

export default class Trillion extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Form ref={'form'} type={temp} options={options} />
        <Text style={styles.welcome}>
          Welcome to React Native with react navigation navigation{' '}
        </Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  }
});
