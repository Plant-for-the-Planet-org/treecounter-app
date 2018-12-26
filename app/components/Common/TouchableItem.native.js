/**
 * TouchableItem renders a touchable that looks native on both iOS and Android.
 *
 * It provides an abstraction on top of TouchableNativeFeedback and
 * TouchableOpacity.
 *
 * On iOS you can pass the props of TouchableOpacity, on Android pass the props
 * of TouchableNativeFeedback.
 */
import React from 'react';
import {
  Platform,
  TouchableNativeFeedback,
  TouchableOpacity,
  View
} from 'react-native';

const ANDROID_VERSION_LOLLIPOP = 21;

export default class TouchableItem extends React.Component {
  static defaultProps = {
    borderless: false,
    pressColor: 'rgba(0, 0, 0, .32)'
  };

  render() {
    /*
     * All touchables on Android should have the ripple effect according to
     * platform design guidelines.
     * We need to pass the background prop to specify a borderless ripple effect.
     */
    if (!this.props.onPress) {
      return <View {...this.props}>{this.props.children}</View>;
    }
    if (
      Platform.OS === 'android' &&
      Platform.Version >= ANDROID_VERSION_LOLLIPOP
    ) {
      const { style, onPress, ...rest } = this.props;

      return (
        <TouchableNativeFeedback
          onPress={onPress ? () => requestAnimationFrame(onPress) : null}
          {...rest}
          style={null}
          background={TouchableNativeFeedback.Ripple(
            this.props.pressColor,
            this.props.borderless
          )}
        >
          <View pointerEvents="box-only" style={style}>
            {this.props.children}
          </View>
        </TouchableNativeFeedback>
      );
    }

    return (
      <TouchableOpacity
        activeOpacity={
          this.props.activeOpacity ? this.props.activeOpacity : 0.2
        }
        {...this.props}
      >
        {this.props.children}
      </TouchableOpacity>
    );
  }
}
