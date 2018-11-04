import { AppRegistry, Platform } from 'react-native';
import App from './app/components/App';
import './ReactotronConfig';
/* app.js */

console.disableYellowBox = false;

// import {
//   setCustomView,
//   setCustomTextInput,
//   setCustomText,
//   setCustomImage,
//   setCustomTouchableHighlight
// } from 'react-native-global-props';

// const customTextProps = {
//   style: {
//     fontFamily: Platform.OS === 'ios' ? 'HelveticaNeue' : 'Roboto'
//   }
// };

// // Makes every image resize mode cover by default.
// const customImageProps = {
//   resizeMode: 'cover'
// };

// //setCustomTextInput(customTextInputProps);
// setCustomText(customTextProps);
// setCustomImage(customImageProps);
//setCustomTouchableHighlight(customTouchableOpacityProps);

AppRegistry.registerComponent('TreecounterApp', () => App);
