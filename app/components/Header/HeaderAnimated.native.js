import React from 'react';
import {
  Animated,
  TouchableOpacity,
  Image,
  BackHandler,
  View
} from 'react-native';
import { backArrow } from '../../assets';

let HEADER_MAX_HEIGHT = 80;
let HEADER_MIN_HEIGHT = 80;

// let HEADER_TEXT_MAX_HEIGHT = 80;
let HEADER_TEXT_MIN_HEIGHT = 40;

export default function HeaderAnimated(props) {
  const headerTop = props.scrollY.interpolate({
    inputRange: [0, 80],
    outputRange: [0, -100],
    extrapolate: 'clamp'
  });
  const headerZindex = props.scrollY.interpolate({
    inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT, 120],
    outputRange: [100, 100, 1000],
    extrapolate: 'clamp'
  });

  const headerTitleZIndex = props.scrollY.interpolate({
    inputRange: [
      0,
      HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT,
      HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT + 5 + HEADER_TEXT_MIN_HEIGHT,
      100
    ],
    outputRange: [100, 100, 100, 1001],
    extrapolate: 'clamp'
  });

  const headerTitleBottom = props.scrollY.interpolate({
    inputRange: [0, 116],
    outputRange: [-116, 0],
    extrapolate: 'clamp'
  });

  const headerTitleLeft = props.scrollY.interpolate({
    inputRange: [
      0,
      HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT,
      HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT + 5 + HEADER_TEXT_MIN_HEIGHT,
      HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT + 5 + HEADER_TEXT_MIN_HEIGHT + 26
    ],
    outputRange: [24, 24, 24, 72],
    extrapolate: 'clamp'
  });

  const headerFontSize = props.scrollY.interpolate({
    inputRange: [
      0,
      HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT,
      HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT + 5 + HEADER_TEXT_MIN_HEIGHT,
      HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT + 5 + HEADER_TEXT_MIN_HEIGHT + 26
    ],
    outputRange: [27, 27, 27, 18],
    extrapolate: 'clamp'
  });

  let navigateBack = () => {
    props.navigation.goBack();
    return true;
  };

  React.useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', navigateBack);
    // clean up
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', navigateBack);
    };
  });

  const textColor = '#4d5153';
  const whiteColor = 'white';
  return (
    <View>
      <Animated.View
        style={{
          position: 'absolute',
          top: headerTop,
          left: 0,
          right: 0,
          backgroundColor: whiteColor,
          height: 80,
          zIndex: headerZindex,
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'row',
          width: '100%'
        }}
      >
        <TouchableOpacity
          style={{ height: 18, zIndex: 1001 }}
          onPress={() => props.navigation.goBack()}
        >
          <Image
            source={backArrow}
            resizeMode="contain"
            style={{ height: 18 }}
          />
        </TouchableOpacity>
      </Animated.View>
      <Animated.View
        style={{
          position: 'absolute',
          bottom: headerTitleBottom,
          left: 24,
          zIndex: headerTitleZIndex
        }}
      >
        <Animated.Text
          style={{
            fontFamily: 'OpenSans-Bold',
            fontSize: 27,
            lineHeight: 40,
            letterSpacing: 0,
            textAlign: 'left',
            color: textColor
          }}
        >
          {props.title}
        </Animated.Text>
      </Animated.View>
    </View>
  );
}
