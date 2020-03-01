import React from 'react';
import {
  Text,
  View,
  BackHandler,
  SafeAreaView,
  Platform,
  TouchableOpacity,
  Image
} from 'react-native';
// import TouchableItem from '../Common/TouchableItem.native';
import HeaderRight from './HeaderSearch.native';
import { backArrow } from './../../assets';

export default function HeaderStatic(props) {
  let navigateBack = () => {
    props.showBackButton ? props.navigation.goBack() : BackHandler.exitApp();
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
  // const linkColor = '#89B53A';
  return (
    <SafeAreaView
      style={{
        position: 'absolute',
        top: Platform.OS === 'ios' ? 30 : 0,
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
          bottom: 4,
          flexDirection: 'row'
        }}
      >
        {props.showBackButton ? (
          <TouchableOpacity
            style={{
              height: 36,
              zIndex: 1001,
              width: 36,
              left: 0,
              justifyContent: 'center',
              bottom: -6
            }}
            onPress={() => props.navigation.goBack()}
          >
            <Image
              source={backArrow}
              resizeMode="contain"
              style={{ height: 18, width: 18.48 }}
            />
          </TouchableOpacity>
        ) : null}

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
        {/* <TouchableItem onPress={props.rightLinkFunction}>
          <Text
            style={{
              color: linkColor,
              fontFamily: 'OpenSans-SemiBold'
            }}
          >
            {props.rightLink}
          </Text>
        </TouchableItem> */}
        {props.showSearch ? (
          <HeaderRight navigation={props.navigation} />
        ) : null}
      </View>
    </SafeAreaView>
  );
}
