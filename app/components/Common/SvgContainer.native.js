import React, { Component } from 'react';
import { StyleSheet, Text, View, Animated, Easing, Image } from 'react-native';
import i18n from '../../locales/i18n';
import PropTypes from 'prop-types';

import * as svgs from '../../assets/svgAssets';

import { svgBackground } from '../../assets';
import SvgUri from 'react-native-svg-uri';

import treecounterStyles from '../../styles/common/treecounter_svg';
import Svg, { Circle } from 'react-native-svg';

const totalCount = Array.from({ length: 72 }, (v, k) => k + 1);
export default class SvgContainer extends Component {
  constructor() {
    super();
    this.state = {
      treesWidth: 0,
      plantedDasharray: '0,1000'
    };
    this.RotateBallonsValueHolder = new Animated.Value(0);
    this.RotateClouds1ValueHolder = new Animated.Value(0);
    this.RotateClouds2ValueHolder = new Animated.Value(0);
  }
  componentWillReceiveProps(nextProps) {
    let { planted, target } = nextProps;
    let plantedWidth = this.calculatePlantedWidth(planted, target, 112);
    let TreesWidth = this.calculateTreesWidth(planted, target);
    this.setState({
      plantedDasharray: plantedWidth + ',1000',
      treesWidth: TreesWidth
    });
  }
  componentDidMount() {
    this.StartBallonsRotateFunction();
    this.StartClouds1RotateFunction();
    this.StartClouds2RotateFunction();
  }

  calculatePlantedWidth(planted, target, radius) {
    let total = 2 * 3.14 * radius;
    return total / (1 + target / planted);
  }

  calculateTreesWidth(planted, target) {
    return parseInt(72 / (1 + target / planted));
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
    let treesWidth = this.state.treesWidth;
    return (
      <View style={treecounterStyles.container}>
        <View style={treecounterStyles.svgStyle}>
          <Image style={treecounterStyles.imageStyle} source={svgBackground} />
          <View style={treecounterStyles.cloudStyle}>
            <Animated.View
              style={{ transform: [{ rotate: RotateClouds1Data }] }}
            >
              <SvgUri width="420" height="420" source={svgs['cloud1']} />
            </Animated.View>
          </View>
          <View style={treecounterStyles.cloudStyle}>
            <Animated.View
              style={{ transform: [{ rotate: RotateClouds2Data }] }}
            >
              <SvgUri width="420" height="420" source={svgs['cloud2']} />
            </Animated.View>
          </View>
          <Animated.View style={{ transform: [{ rotate: RotateBallonsData }] }}>
            <SvgUri width="400" height="400" source={svgs['ballons']} />
          </Animated.View>
          {totalCount.map(
            i =>
              i <= treesWidth ? (
                <View key={'tree-' + i} style={treecounterStyles.potStyle}>
                  <SvgUri
                    width="420"
                    height="420"
                    source={svgs['darkCrownTree' + ('' + i).padStart(3, '0')]}
                  />
                </View>
              ) : null
          )}
          {totalCount.map(
            i =>
              i > treesWidth ? (
                <View key={'pot-' + i} style={treecounterStyles.potStyle}>
                  <SvgUri
                    width="420"
                    height="420"
                    source={svgs['pot' + ('' + i).padStart(2, '0')]}
                  />
                </View>
              ) : null
          )}
          <View style={treecounterStyles.circleStyle}>
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
        </View>
      </View>
    );
  }
}

SvgContainer.propTypes = {
  id: PropTypes.number.isRequired,
  target: PropTypes.number.isRequired,
  planted: PropTypes.number.isRequired,
  community: PropTypes.number.isRequired,
  personal: PropTypes.number.isRequired,
  targetYear: PropTypes.number,
  exposeMissing: PropTypes.bool
};

SvgContainer.defaultProps = {
  id: 1,
  target: 0,
  planted: 0,
  community: 0,
  personal: 0,
  exposeMissing: true,
  targetYear: 2020
};
