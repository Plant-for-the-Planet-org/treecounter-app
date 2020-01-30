import React from 'react';
import { Text, View, TouchableOpacity, Image, BackHandler } from 'react-native';
import { backArrow } from '../../assets';
import { SafeAreaView } from 'react-navigation';
import TouchableItem from '../Common/TouchableItem.native';

export default function HeaderStatic(props) {
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
        height: 80,
        zIndex: 5000,
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        width: '100%'
      }}
    >
      <Text
        style={{
          fontFamily: 'OpenSans-Bold',
          fontSize: 27,
          lineHeight: 40,
          letterSpacing: 0,
          color: textColor,
          textAlign: 'left',
          left: 20
        }}
      >
        {props.title}
      </Text>
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
