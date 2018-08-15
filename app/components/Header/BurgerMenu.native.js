import React, { Component } from 'react';

import { Image, TouchableHighlight } from 'react-native';
import { burgur_menu_icon } from '../../assets';

export default (BurgerMenu = function(navigation) {
  return (
    <TouchableHighlight
      onPress={() => {
        console.log('Press data');
        navigation.openDrawer();
      }}
    >
      <Image
        source={burgur_menu_icon}
        style={{ height: 30, width: 30, margin: 5 }}
      />
    </TouchableHighlight>
  );
});
