import React from 'react';
import {
  Animated,
  TouchableOpacity,
  Image,
  BackHandler,
  View,
  SafeAreaView
} from 'react-native';

import { Dimensions } from 'react-native';
import { crossBlack, crossWhite } from '../../assets';
const Layout = {
  window: {
    height: Dimensions.get('window').height - (56 + 70 + 20),
    width: Dimensions.get('window').width
  }
};
export default function HeaderAnimated(props) {
  const headerOpacityReverse = props.scrollY.interpolate({
    inputRange: [
      0,
      Layout.window.width * 0.7833 * 0.9,
      Layout.window.width * 0.7833 * 0.96
    ],
    outputRange: [0, 0, 1],
    extrapolate: 'clamp'
  });

  const iconColor = props.scrollY.interpolate({
    inputRange: [0, 32, 72],
    outputRange: [0, 0, 1],
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

  const whiteColor = 'white';
  return (
    <SafeAreaView>
      <Animated.View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          backgroundColor: whiteColor,
          height: 76,
          zIndex: 1000,
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
          paddingTop: 12,
          opacity: headerOpacityReverse
        }}
      >
        <View
          style={{
            height: 48,
            width: 48,
            justifyContent: 'center',
            marginLeft: 12
          }}
        >
          <TouchableOpacity
            style={{
              height: 38,
              width: 38,
              zIndex: 1001,
              justifyContent: 'center',
              alignSelf: 'center'
            }}
            onPress={() => props.navigation.goBack()}
          >
            {/* <Icon
              name={'close'}
              size={24}
              color="#707070"
              style={{ height: 24, width: 24, alignSelf: 'center' }}
            /> */}
            <Image
              source={crossBlack}
              resizeMode="contain"
              style={{ height: 18, width: 18, alignSelf: 'center' }}
            />
          </TouchableOpacity>
        </View>
      </Animated.View>
      <Animated.View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          backgroundColor: 'rgba(52, 52, 52, 0.0)',
          height: 76,
          zIndex: 999,
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
          paddingTop: 12
        }}
      >
        <View
          style={{
            height: 48,
            width: 48,
            justifyContent: 'center',
            marginLeft: 12
          }}
        >
          <TouchableOpacity
            style={{
              height: 38,
              width: 38,
              zIndex: 1001,
              justifyContent: 'center',
              alignSelf: 'center'
            }}
            onPress={() => props.navigation.goBack()}
          >
            {/* <Icon
              name={'close'}
              size={24}
              color="#fff"
              style={{ height: 24, width: 24, alignSelf: 'center', elevation: 1 }}
            /> */}
            <Image
              source={crossWhite}
              resizeMode="contain"
              style={{ height: 18, width: 18, alignSelf: 'center' }}
            />
          </TouchableOpacity>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
}
