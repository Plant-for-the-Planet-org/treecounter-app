import React, { Component } from 'react';

import { Image, View, TouchableOpacity } from 'react-native';
import { iosSearchWhite, iosNotificationWhite } from '../../assets';

export default (HeaderRight = function(navigation, isLoggedIn) {
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
});
