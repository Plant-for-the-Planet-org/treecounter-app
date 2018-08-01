import React, { Component } from 'react';

import { Image, View, TouchableHighlight } from 'react-native';
import { iosSearchWhite, iosNotificationWhite } from '../../assets';

export default (HeaderRight = function(navigation) {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Image
        source={iosSearchWhite}
        style={{ height: 30, width: 30, marginRight: 20 }}
      />
      <Image
        source={iosNotificationWhite}
        style={{ height: 30, width: 30, marginRight: 20 }}
      />
    </View>
  );
});
