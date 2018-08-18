import { AppRegistry, Platform } from 'react-native';
import App from './app/components/App';
import './ReactotronConfig';
/* app.js */
import EStyleSheet from 'react-native-extended-stylesheet';

console.disableYellowBox = true;

// import {
//   setCustomView,
//   setCustomTextInput,
//   setCustomText,
//   setCustomImage,
//   setCustomTouchableHighlight
// } from 'react-native-global-props';

EStyleSheet.build({
  // always call EStyleSheet.build() even if you don't use global variables!
  $primary: '#b9d384',
  $textColor: '#686060',
  $placeholderColor: '#e9e9e9',
  $colorPrimary: '#b7d37f',
  $colorPrimaryDark: '#b7d37f',
  $colorPrimaryAccent: '#e86f56',
  $colorPrimaryAccentLight: '#ec6453',
  $borderColor: '#aba2a2'
});

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
