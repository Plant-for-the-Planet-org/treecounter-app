import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Animated,
  PanResponder,
  ScrollView
} from 'react-native';

import MapView from 'react-native-maps';

export default class animatedbasic extends Component {
  componentWillMount() {
    this.animatedValue = new Animated.ValueXY();
    this._value = { x: 0, y: 0 };
    this.animatedValue.addListener(value => (this._value = value));
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderGrant: (e, gestureState) => {
        this.animatedValue.setOffset({
          x: this._value.x,
          y: this._value.y
        });
        this.animatedValue.setValue({ x: 0, y: 0 });
      },
      onPanResponderMove: Animated.event([
        null,
        { dx: this.animatedValue.x, dy: this.animatedValue.y }
      ]),
      onPanResponderRelease: (e, gestureState) => {
        this.animatedValue.flattenOffset();
        Animated.decay(this.animatedValue, {
          deceleration: 0.997,
          velocity: { x: gestureState.vx, y: gestureState.vy }
        }).start();
      }
    });
  }

  render() {
    const animatedStyle = {
      transform: this.animatedValue.getTranslateTransform()
    };
    return (
      <View style={{ flex: 1 }}>
        <MapView style={{ flex: 1 }} />
        <ScrollView alwaysBounceVertical horizontal style={styles.container}>
          <Animated.View
            style={[styles.box, animatedStyle]}
            {...this.panResponder.panHandlers}
          >
            <Text style={styles.text}>Drag Me</Text>
          </Animated.View>
          <Animated.View
            style={[styles.box, animatedStyle]}
            {...this.panResponder.panHandlers}
          >
            <Text style={styles.text}>Drag Me</Text>
          </Animated.View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // position: "absolute",
    // bottom: 0,
    // flex: 1,
    borderWidth: 2,
    borderColor: 'yellow'
    // zIndex: 1000
  },
  box: {
    width: 150,
    height: 150,
    backgroundColor: '#333',
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    color: '#FFF',
    fontSize: 20
  }
});
