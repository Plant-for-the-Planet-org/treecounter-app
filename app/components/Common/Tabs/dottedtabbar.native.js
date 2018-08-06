import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import dottedTabBarStyle from '../../../styles/common/dotted_tabbar';

export const renderDottedTabbar = (routes, selectedIndex, onPress) => {
  return (
    <View style={dottedTabBarStyle.tabBar}>
      {routes.map((route, i) => {
        return (
          <TouchableOpacity
            style={
              selectedIndex === i
                ? dottedTabBarStyle.tabItemActive
                : dottedTabBarStyle.tabItem
            }
            key={'route' + i}
            onPress={() => onPress(i)}
          />
        );
      })}
    </View>
  );
};
