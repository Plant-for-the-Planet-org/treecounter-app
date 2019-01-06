import React, { Component } from 'react';

import { Image, View, TouchableOpacity } from 'react-native';
import {
  iosSearchWhite,
  iosNotificationWhite,
  selector_menu
} from '../../assets';

const HeaderFields = ({ navigation, isLoggedIn, sortHandler }) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <TouchableOpacity onPress={() => navigation.navigate('Search')}>
        <Image
          source={iosSearchWhite}
          style={{ height: 25, width: 25, marginRight: 20 }}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => sortHandler && sortHandler()}>
        <Image
          source={selector_menu}
          style={{
            height: 25,
            width: 25,
            marginRight: 20,
            resizeMode: 'contain'
          }}
        />
      </TouchableOpacity>
      {isLoggedIn && (
        <TouchableOpacity>
          <Image
            source={iosNotificationWhite}
            style={{ height: 25, width: 25, marginRight: 20 }}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};
export default HeaderFields;
