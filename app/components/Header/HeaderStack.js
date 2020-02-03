import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  BackHandler,
  Animated,
  SafeAreaView
} from 'react-native';
import { backArrow } from '../../assets';
// import { SafeAreaView } from 'react-navigation';
import TouchableItem from '../Common/TouchableItem.native';

export default function HeaderStack(props) {
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

  const headerTop = props.scrollY.interpolate({
    inputRange: [0, 120],
    outputRange: [0, -56],
    extrapolate: 'clamp'
  });

  const textColor = '#4d5153';
  const whiteColor = 'white';
  const linkColor = '#89B53A';
  return (
    <>
      <SafeAreaView>
        <Animated.View
          style={{
            position: 'absolute',
            top: headerTop,
            left: 0,
            right: 0,
            backgroundColor: whiteColor,
            height: 56,
            zIndex: 5000,
            // alignItems: 'center',
            display: 'flex',
            flexDirection: 'row',
            width: '100%'
          }}
        >
          <View
            style={{
              position: 'absolute',
              left: 20,
              bottom: 4
            }}
          >
            <Text
              style={{
                fontFamily: 'OpenSans-ExtraBold',
                fontSize: 27,
                lineHeight: 40,
                letterSpacing: 0,
                color: textColor,
                textAlign: 'left'
              }}
            >
              {props.title}
            </Text>
          </View>

          <View
            style={{
              right: 24,
              bottom: 24,
              zIndex: 1002,
              position: 'absolute'
            }}
          >
            <TouchableItem onPress={props.rightLinkFunction}>
              <Text
                style={{
                  color: linkColor,
                  fontFamily: 'OpenSans-SemiBold'
                }}
              >
                {props.rightLink}
              </Text>
            </TouchableItem>
          </View>
        </Animated.View>
      </SafeAreaView>
    </>
  );
}
