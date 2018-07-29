import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import i18n from '../../locales/i18n';

export default class Trillion extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          {i18n.t('label.logged_in')}
          {' ' + i18n.t('name.label')}
        </Text>
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
