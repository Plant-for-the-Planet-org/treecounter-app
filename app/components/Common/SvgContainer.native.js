import React, { Component } from 'react';
import { View, Animated, Easing, Image } from 'react-native';
import PropTypes from 'prop-types';

import * as svgs from '../../assets/svgAssets';

import { svgBackground } from '../../assets';
import SvgUri from 'react-native-svg-uri';

import treecounterStyles from '../../styles/common/treecounter_svg';
import TreecounterGraphicsText from '../TreecounterGraphics/TreecounterGraphicsText';
import Svg, { Circle } from 'react-native-svg';
import _ from 'lodash';

export default class SvgContainer extends Component {
  constructor(props) {
    super(props);
    let { planted, target } = this.props;
    let plantedWidth = this.calculatePlantedWidth(planted, target, 112);
    let TreesWidth = this.calculateTreesWidth(planted, target);
    this.state = {
      plantedDasharray: plantedWidth + ',1000',
      treesWidth: TreesWidth
    };
    this.RotateBallonsValueHolder = new Animated.Value(0);
    this.RotateClouds1ValueHolder = new Animated.Value(0);
    this.RotateClouds2ValueHolder = new Animated.Value(0);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    let { planted, target } = nextProps;
    if (this.props.planted !== planted || this.props.target !== target) {
      let plantedWidth = this.calculatePlantedWidth(planted, target, 112);
      let TreesWidth = this.calculateTreesWidth(planted, target);
      this.setState({
        plantedDasharray: plantedWidth + ',1000',
        treesWidth: TreesWidth
      });
    }
  }

  componentDidMount() {
    this.StartBallonsRotateFunction();
    this.StartClouds1RotateFunction();
    this.StartClouds2RotateFunction();
  }

  shouldComponentUpdate(nextProps) {
    return JSON.stringify(nextProps) !== JSON.stringify(this.props);
  }

  calculatePlantedWidth(planted, target, radius) {
    let total = 2 * 3.14 * radius;
    if (target === 0) {
      return total;
    } else {
      return (total * planted) / target;
    }
  }

  calculateTreesWidth(planted, target) {
    if (target === 0) {
      return 72;
    } else {
      return Math.round((72 * planted) / target);
    }
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
    let treesSvgString =
      '<svg viewBox="0 0 850 850" xmlns="http://www.w3.org/2000/svg">';
    for (let i = 1; i <= treesWidth; i++) {
      treesSvgString =
        treesSvgString + svgs['darkCrownTree' + _.padStart('' + i, 3, '0')];
    }
    treesSvgString = treesSvgString + '</svg>';
    let potSvgString =
      '<svg viewBox="0 0 850 850" xmlns="http://www.w3.org/2000/svg">';
    for (let i = 1; i <= 72; i++) {
      if (i > treesWidth) {
        potSvgString = potSvgString + svgs['pot' + _.padStart('' + i, 2, '0')];
      }
    }
    potSvgString = potSvgString + '</svg>';
    return (
      <View style={treecounterStyles.container}>
        <View style={treecounterStyles.svgStyle}>
          <Image
            style={treecounterStyles.imageStyle}
            resizeMode="contain"
            source={svgBackground}
          />
          <View style={treecounterStyles.cloudStyle}>
            <Animated.View
              style={{
                transform: [{ rotate: RotateClouds1Data }]
              }}
            >
              <SvgUri width="100%" height="100%" svgXmlData={svgs['cloud1']} />
            </Animated.View>
          </View>
          <View style={treecounterStyles.cloudStyle}>
            <Animated.View
              style={{ transform: [{ rotate: RotateClouds2Data }] }}
            >
              <SvgUri width="100%" height="100%" svgXmlData={svgs['cloud2']} />
            </Animated.View>
          </View>
          <View style={treecounterStyles.cloudStyle}>
            <Animated.View
              style={{ transform: [{ rotate: RotateBallonsData }] }}
            >
              <SvgUri width="100%" height="100%" svgXmlData={svgs['ballons']} />
            </Animated.View>
          </View>
          <View key={'tree-'} style={treecounterStyles.potStyle}>
            <SvgUri width="100%" height="100%" svgXmlData={treesSvgString} />
          </View>
          <View key={'pot-'} style={treecounterStyles.potStyle}>
            <SvgUri width="100%" height="100%" svgXmlData={potSvgString} />
          </View>
          <View style={treecounterStyles.circleStyle}>
            <Svg height="100%" width="100%" viewBox="0 0 400 400">
              <Circle
                cx="200"
                cy="200"
                r="112"
                fill="none"
                stroke="#c4d19a"
                strokeWidth="30"
              />
              <Circle
                cx="200"
                cy="200"
                r="112"
                fill="none"
                stroke="#4d6c29"
                rotation="-90"
                origin="200, 200"
                strokeWidth="30"
                strokeDasharray={this.state.plantedDasharray}
              />
            </Svg>
          </View>
          <View style={treecounterStyles.svgContentContainer}>
            {this.props !== null ? (
              <TreecounterGraphicsText
                trillion={this.props.trillion}
                treecounterData={this.props}
                onToggle={toggleVal => this.props.onToggle(toggleVal)}
              />
            ) : null}
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
  exposeMissing: PropTypes.bool,
  trillion: PropTypes.bool,
  onToggle: PropTypes.func
};

SvgContainer.defaultProps = {
  id: 1,
  target: 0,
  planted: 0,
  community: 0,
  trillion: false,
  personal: 0,
  exposeMissing: true,
  targetYear: 2020
};
