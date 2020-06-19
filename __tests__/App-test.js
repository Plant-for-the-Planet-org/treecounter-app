/**
 * @format
 */

import 'react-native';
import React from 'react';
// Testing App does not yet completely work
import App from '../app/components/App';

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
jest.mock('react-native-device-info', () => {});
jest.mock('react-navigation-drawer', () => {});
jest.mock('react-native-image-picker', () => {});
jest.mock('deprecated-react-native-listview', () => {});
jest.mock('react-native-document-picker', () => {});
jest.mock('react-native-fs', () => {});
jest.mock('rn-fetch-blob', () => {});
jest.mock('react-native-vector-icons/FontAwesome', () => {
  return {
    loadFont: jest.fn()
  };
});
jest.mock('@react-native-community/viewpager', () => {});
jest.mock('@react-native-community/masked-view', () => {});
jest.mock('@react-native-community/datetimepicker', () => {});
jest.mock('@react-native-community/netinfo', () => {});
jest.mock('react-native-splash-screen', () => {
  return {
    hide: jest.fn()
  };
});

// eslint-disable-next-line no-undef
it('renders correctly', () => {
  // Testing App does not yet completely work:
  renderer.create(<App />);
});
