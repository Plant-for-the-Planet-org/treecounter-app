import React from 'react';
import { Text, View, TouchableOpacity, Image, BackHandler } from 'react-native';
import { backArrow } from './../../assets';

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

  return (
    <View
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
        style={{ height: 18, zIndex: 1001 }}
        onPress={() => props.navigation.goBack()}
      >
        <Image source={backArrow} resizeMode="contain" style={{ height: 18 }} />
      </TouchableOpacity>
      <View
        style={{
          position: 'absolute',
          bottom: 12,
          left: 72
        }}
      >
        <Text
          style={{
            fontFamily: 'OpenSans-Bold',
            fontSize: 18,
            lineHeight: 40,
            letterSpacing: 0,
            textAlign: 'left',
            color: textColor
          }}
        >
          {props.title}
        </Text>
      </View>
    </View>
  );
}
