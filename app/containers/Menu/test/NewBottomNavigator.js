import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Dimensions,
  View,
  Animated
} from 'react-native';
import { line, curveBasis } from 'd3-shape';
import Svg, { Path } from 'react-native-svg';
import StaticTabbar from './StaticTabbar';

export default class NewBottomNavigator extends Component {
  render() {
    const value = new Animated.Value(0);
    const AnimatedSvg = Animated.createAnimatedComponent(Svg);
    const { width } = Dimensions.get('window');
    const height = 64;
    // const { Path } = Svg;
    const tabs = [
      {
        name: 'grid'
      },
      {
        name: 'list'
      },
      {
        name: 'repeat'
      },
      {
        name: 'map'
      },
      {
        name: 'user'
      }
    ];
    const tabWidth = width / tabs.length;

    const getPath = () => {
      const left = line()
        .x(d => d.x)
        .y(d => d.y)([{ x: 0, y: 0 }, { x: width, y: 0 }]);
      const tab = line()
        .x(d => d.x)
        .y(d => d.y)
        .curve(curveBasis)([
        { x: width, y: 0 },
        { x: width + 5, y: 0 },
        { x: width + 10, y: 10 },
        { x: width + 15, y: height },
        { x: width + tabWidth - 15, y: height },
        { x: width + tabWidth - 10, y: 10 },
        { x: width + tabWidth - 5, y: 0 },
        { x: width + tabWidth, y: 0 }
      ]);
      const right = line()
        .x(d => d.x)
        .y(d => d.y)([
        { x: width + tabWidth, y: 0 },
        { x: width * 2, y: 0 },
        { x: width * 2, y: height },
        { x: 0, y: height },
        { x: 0, y: 0 }
      ]);
      return `${left} ${tab} ${right}`;
    };
    const d = getPath();
    const translateX = value.interpolate({
      inputRange: [0, width],
      outputRange: [-width, 0]
    });
    let backgroundColor = 'white';

    return (
      <>
        <View {...{ height, width }}>
          <AnimatedSvg
            width={width * 2}
            {...{ height }}
            style={{ transform: [{ translateX }] }}
          >
            <Path fill={'white'} {...{ d }} />
          </AnimatedSvg>
          <View style={StyleSheet.absoluteFill}>
            <StaticTabbar {...{ tabs, value }} />
          </View>
        </View>
        <SafeAreaView style={styles.container} />
      </>
    );
  }
}

// export default function NewBottomNavigator() {

//     return (
//         <>
//             <View {...{ height, width }}>
//                 <AnimatedSvg width={width * 2} {...{ height }} style={{ transform: [{ translateX }] }}>
//                     <Path fill={"white"} {...{ d }} />
//                 </AnimatedSvg>
//                 <View style={StyleSheet.absoluteFill}>
//                     <StaticTabbar {...{ tabs, value }} />
//                 </View>
//             </View>
//             <SafeAreaView style={styles.container} />
//         </>
//     );
// }

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white'
  }
});
