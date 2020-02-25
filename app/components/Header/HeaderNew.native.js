import React from 'react';
import { Text, View, TouchableOpacity, Image, BackHandler } from 'react-native';
import { backArrow } from './../../assets';
import { SafeAreaView } from 'react-navigation';
import TouchableItem from './../Common/TouchableItem.native';

export default function HeaderNew(props) {
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
  const linkColor = '#89B53A';
  return (
    <SafeAreaView
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: whiteColor,
        height: 70,
        zIndex: 1000,
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        width: '100%'
      }}
    >
      <TouchableOpacity
        style={{
          height: 36,
          zIndex: 1001,
          width: 36,
          left: 24,
          justifyContent: 'center'
        }}
        onPress={() => props.navigation.goBack()}
      >
        <Image
          source={backArrow}
          resizeMode="contain"
          style={{ height: 18, width: 18.48, alignSelf: 'flex-start' }}
        />
      </TouchableOpacity>
      <View
        style={{
          position: 'absolute',
          bottom: -36,
          left: 24
        }}
      >
        <Text
          style={{
            fontFamily: 'OpenSans-ExtraBold',
            fontSize: 27,
            lineHeight: 40,
            letterSpacing: 0,
            textAlign: 'left',
            color: textColor
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
    </SafeAreaView>
  );
}
