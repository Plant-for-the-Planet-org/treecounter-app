/**
 * @format
 */

import 'react-native';
import React from 'react';
// Testing App does not yet work:
//import App from '../app/components/App';
import LoadingIndicator from '../app/components/Common/LoadingIndicator';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

// mocking some node modules
jest.mock('react-native-gesture-handler', () => {
  // eslint-disable-next-line global-require
  const View = require('react-native/Libraries/Components/View/View');
  return {
    Swipeable: View,
    DrawerLayout: View,
    State: {},
    ScrollView: View,
    Slider: View,
    Switch: View,
    TextInput: View,
    ToolbarAndroid: View,
    ViewPagerAndroid: View,
    DrawerLayoutAndroid: View,
    WebView: View,
    NativeViewGestureHandler: View,
    TapGestureHandler: View,
    FlingGestureHandler: View,
    ForceTouchGestureHandler: View,
    LongPressGestureHandler: View,
    PanGestureHandler: View,
    PinchGestureHandler: View,
    RotationGestureHandler: View,
    /* Buttons */
    RawButton: View,
    BaseButton: View,
    RectButton: View,
    BorderlessButton: View,
    /* Other */
    FlatList: View,
    gestureHandlerRootHOC: jest.fn(),
    Directions: {}
  };
});

jest.mock('react-native-reanimated', () => {});
jest.mock('react-native-tab-view', () => {});

// eslint-disable-next-line no-undef
it('renders correctly', () => {
  // Testing App does not yet work:
  //renderer.create(<App />);
  renderer.create(<LoadingIndicator />);
});
