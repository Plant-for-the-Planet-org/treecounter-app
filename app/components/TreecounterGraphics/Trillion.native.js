import React, { Component } from 'react';
import { StyleSheet, Text, View, Animated, Easing } from 'react-native';
import i18n from '../../locales/i18n';
import testSvg from '../../assets/images/ballons.svg';
import SvgUri from 'react-native-svg-uri';

export default class Trillion extends Component {
  constructor() {
    super();
    this.RotateValueHolder = new Animated.Value(0);
  }
  componentDidMount() {
    this.StartImageRotateFunction();
  }

  StartImageRotateFunction() {
    this.RotateValueHolder.setValue(0);

    Animated.timing(this.RotateValueHolder, {
      toValue: 1,
      duration: 100000,
      easing: Easing.linear,
      useNativeDriver: true
    }).start(() => this.StartImageRotateFunction());
  }
  render() {
    const RotateData = this.RotateValueHolder.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg']
    });
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          {i18n.t('label.logged_in')}
          {' ' + i18n.t('name.label')}
        </Text>
        <Animated.View style={{ transform: [{ rotate: RotateData }] }}>
          <SvgUri width="400" height="400" source={testSvg} />
        </Animated.View>
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
