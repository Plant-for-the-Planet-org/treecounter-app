import React from 'react';
import { View, Animated, TouchableOpacity } from 'react-native';
import filledTabBar from '../../../styles/common/filled_tabbar.native';

export const renderFilledTabBar = (routes, selectedIndex, onPress) => {
  return (
    <View style={filledTabBar.tabBar}>
      {routes.map((route, i) => {
        return (
          <TouchableOpacity
            style={
              selectedIndex === i
                ? filledTabBar.tabItemActive
                : filledTabBar.tabItem
            }
            key={'route' + i}
            onPress={() => onPress(i)}
          >
            <Animated.Text
              style={
                selectedIndex === i
                  ? filledTabBar.textActive
                  : filledTabBar.text
              }
            >
              {route.title}
            </Animated.Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
