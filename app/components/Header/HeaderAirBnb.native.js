import React from 'react';
import {
  Animated,
  TouchableOpacity,
  Image,
  BackHandler,
  View,
  Platform,
  StyleSheet
} from 'react-native';

import { Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

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

  // const iconColor = props.scrollY.interpolate({
  //   inputRange: [0, 32, 72],
  //   outputRange: [0, 0, 1],
  //   extrapolate: 'clamp'
  // });

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

  const blackColor = 'black';
  const styles = StyleSheet.create({
    whiteWithShadow: {
      shadowColor: blackColor,
      shadowOpacity: 0.5,
      shadowRadius: 1,
      // iOS
      shadowOffset: {
        width: 0, // These can't both be 0
        height: 1 // i.e. the shadow has to be offset in some way
      },
      // Android
      shadowOffset: {
        width: 0, // Same rules apply from above
        height: 1 // Can't both be 0
      },
      fontSize: 32,
      height: 32,
      width: 32,
      alignSelf: 'center'
    }
  });

  const whiteColor = 'white';
  const transparent = 'rgba(52, 52, 52, 0.0)';
  return (
    <>
      <Animated.View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          backgroundColor: whiteColor,
          height: Platform.OS === 'ios' ? 100 : 76,
          zIndex: 1000,
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
          paddingTop: Platform.OS === 'ios' ? 36 : 24,
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
            <Icon
              name="clear"
              color="black"
              style={{
                fontSize: 32,
                height: 32,
                width: 32,
                alignSelf: 'center'
              }}
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
          backgroundColor: transparent,
          height: Platform.OS === 'ios' ? 100 : 76,
          zIndex: 999,
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
          paddingTop: Platform.OS === 'ios' ? 36 : 24
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
            <Icon name="clear" color="white" style={styles.whiteWithShadow} />
          </TouchableOpacity>
        </View>
      </Animated.View>
    </>
  );
}
