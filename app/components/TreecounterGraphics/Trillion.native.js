import React, { Component } from 'react';
import { StyleSheet, Text, View, Animated, Easing, Image } from 'react-native';
import i18n from '../../locales/i18n';
import ballonsSvg from '../../assets/svgAssets/ballons.svg';
import cloud1Svg from '../../assets/svgAssets/cloud1.svg';
import cloud2Svg from '../../assets/svgAssets/cloud2.svg';
import pot01 from '../../assets/svgAssets/pot01.svg';
import darkCrownTree001 from '../../assets/svgAssets/darkCrownTree001.svg';
import darkCrownTree002 from '../../assets/svgAssets/darkCrownTree002.svg';

import { svgBackground } from '../../assets';
import { trillionCampaign } from '../../actions/trillionAction';
import SvgUri from 'react-native-svg-uri';
import Svg, { Circle } from 'react-native-svg';

export default class Trillion extends Component {
  constructor() {
    super();
    this.state = {
      svgData: {},
      displayName: '',
      loading: true,
      plantedDasharray: '0,1000'
    };
    this.RotateBallonsValueHolder = new Animated.Value(0);
    this.RotateClouds1ValueHolder = new Animated.Value(0);
    this.RotateClouds2ValueHolder = new Animated.Value(0);
  }
  componentDidMount() {
    trillionCampaign()
      .then(({ data }) => {
        let planted = this.calculatePlantedWidth(
          data.countPlanted,
          data.countTarget,
          112
        );
        this.setState({
          svgData: {
            id: 1,
            target: data.countTarget,
            planted: data.countPlanted,
            community: data.countCommunity,
            personal: data.countPersonal
          },
          plantedDasharray: planted + ',1000',
          displayName: data.displayName,
          loading: false
        });
      })
      .catch(error => console.log(error));
    this.StartBallonsRotateFunction();
    this.StartClouds1RotateFunction();
    this.StartClouds2RotateFunction();
  }

  calculatePlantedWidth(planted, target, radius) {
    let total = 2 * 3.14 * radius;
    return total / (1 + target / planted);
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
          <View style={styles.cloudStyle}>
            <Animated.View
              style={{ transform: [{ rotate: RotateClouds1Data }] }}
            >
              <SvgUri width="400" height="400" source={cloud1Svg} />
            </Animated.View>
          </View>
          <View style={styles.cloudStyle}>
            <Animated.View
              style={{ transform: [{ rotate: RotateClouds2Data }] }}
            >
              <SvgUri width="400" height="400" source={cloud2Svg} />
            </Animated.View>
          </View>
          <View style={styles.circleStyle}>
            <Svg height="400" width="400">
              <Circle
                cx="200"
                cy="197"
                r="112"
                fill="none"
                stroke="#c4d19a"
                strokeWidth="30"
              />
              <Circle
                cx="200"
                cy="197"
                r="112"
                fill="none"
                stroke="#4d6c29"
                rotation="-90"
                origin="200, 197"
                strokeWidth="30"
                strokeDasharray={this.state.plantedDasharray}
              />
            </Svg>
          </View>
          <View style={styles.potStyle}>
            <SvgUri width="400" height="350" source={darkCrownTree001} />
          </View>
          <View style={styles.potStyle}>
            <SvgUri width="400" height="350" source={darkCrownTree002} />
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
  cloudStyle: {
    flex: 1,
    width: 400,
    height: 400,
    elevation: 2,
    position: 'absolute',
    top: 0
  },
  potStyle: {
    flex: 1,
    width: 400,
    height: 400,
    elevation: 4,
    position: 'absolute',
    top: 0
  },
  circleStyle: {
    flex: 1,
    width: 400,
    height: 400,
    elevation: 3,
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
