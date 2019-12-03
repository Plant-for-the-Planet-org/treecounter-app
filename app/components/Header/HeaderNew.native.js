import React from 'react';
import { Text, View, TouchableOpacity, Image, BackHandler } from 'react-native';
import { backArrow } from './../../assets';

export default function HeaderNew(props) {
  _navigateBack = () => {
    props.navigation.goBack();
    return true;
  };

  React.useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', _navigateBack);
    // clean up
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', _navigateBack);
    };
  });

  return (
    <View
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: 'white',
        height: 70,
        zIndex: 1000,
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        width: '100%'
      }}
    >
      <TouchableOpacity
        style={{ height: 18 }}
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
            color: '#4d5153'
          }}
        >
          {props.title}
        </Text>
      </View>
    </View>
  );
}
