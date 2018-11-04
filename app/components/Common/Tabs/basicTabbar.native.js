import React from 'react';
import { View, Animated, TouchableOpacity } from 'react-native';
import styles from '../../../styles/common/tabbar';

export const renderBasicTabbar = (routes, selectedIndex, onPress) => {
  return (
    <View style={styles.tabBar}>
      {routes.map((route, i) => {
        return (
          <TouchableOpacity
            style={selectedIndex === i ? styles.tabItemActive : styles.tabItem}
            key={'route' + i}
            onPress={() => onPress(i)}
          >
            <Animated.Text
              style={selectedIndex === i ? styles.textActive : styles.text}
            >
              {route.title}
            </Animated.Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
