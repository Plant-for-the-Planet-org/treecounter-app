import React, { Component } from 'react';
import { StyleSheet, Text, View, Animated, Easing, Image } from 'react-native';
import i18n from '../../locales/i18n';
import ballonsSvg from '../../assets/images/ballons.svg';
import cloud1Svg from '../../assets/images/cloud1.svg';
import cloud2Svg from '../../assets/images/cloud2.svg';
import { svgBackground } from '../../assets';
import SvgUri from 'react-native-svg-uri';

export default class Trillion extends Component {
  constructor() {
    super();
    this.RotateBallonsValueHolder = new Animated.Value(0);
    this.RotateClouds1ValueHolder = new Animated.Value(0);
    this.RotateClouds2ValueHolder = new Animated.Value(0);
  }
  componentDidMount() {
    this.StartBallonsRotateFunction();
    this.StartClouds1RotateFunction();
    this.StartClouds2RotateFunction();
  }

  StartBallonsRotateFunction() {
    this.RotateBallonsValueHolder.setValue(0);

    Animated.timing(this.RotateBallonsValueHolder, {
      toValue: 1,
      duration: 150000,
      easing: Easing.linear,
      useNativeDriver: true
    }).start(() => this.StartBallonsRotateFunction());
  }

  StartClouds1RotateFunction() {
    this.RotateClouds1ValueHolder.setValue(0);

    Animated.timing(this.RotateClouds1ValueHolder, {
      toValue: 1,
      duration: 120000,
      easing: Easing.linear,
      useNativeDriver: true
    }).start(() => this.StartClouds1RotateFunction());
  }

  StartClouds2RotateFunction() {
    this.RotateClouds2ValueHolder.setValue(0);

    Animated.timing(this.RotateClouds2ValueHolder, {
      toValue: 1,
      duration: 90000,
      easing: Easing.linear,
      useNativeDriver: true
    }).start(() => this.StartClouds2RotateFunction());
  }
  render() {
    const RotateBallonsData = this.RotateBallonsValueHolder.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg']
    });
    const RotateClouds1Data = this.RotateClouds1ValueHolder.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg']
    });
    const RotateClouds2Data = this.RotateClouds2ValueHolder.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg']
    });
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          {i18n.t('label.logged_in')}
          {' ' + i18n.t('name.label')}
        </Text>
        <View style={styles.svgStyle}>
          <Image style={styles.imageStyle} source={svgBackground} />
          <Animated.View style={{ transform: [{ rotate: RotateBallonsData }] }}>
            <SvgUri width="400" height="400" source={ballonsSvg} />
          </Animated.View>
          <View style={styles.cloud1Style}>
            <Animated.View
              style={{ transform: [{ rotate: RotateClouds1Data }] }}
            >
              <SvgUri width="400" height="400" source={cloud1Svg} />
            </Animated.View>
          </View>
          <View style={styles.cloud1Style}>
            <Animated.View
              style={{ transform: [{ rotate: RotateClouds2Data }] }}
            >
              <SvgUri width="400" height="400" source={cloud2Svg} />
            </Animated.View>
          </View>
        </View>
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
  svgStyle: {
    width: 400,
    height: 400
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  cloud1Style: {
    flex: 1,
    width: 400,
    height: 400,
    elevation: 2,
    position: 'absolute',
    top: 0
  },
  imageStyle: {
    overflow: 'visible',
    width: 400,
    height: 400,
    flex: 1,
    top: 190,
    left: 0
  }
});
