import { AppRegistry } from 'react-native';
import App from './app/components/App';

/* app.js */
import EStyleSheet from 'react-native-extended-stylesheet';

EStyleSheet.build({
  // always call EStyleSheet.build() even if you don't use global variables!
  $primary: '#b9d384',
  $textColor: '#696261',
  $placeholderColor: '#e9e9e9'
});

AppRegistry.registerComponent('TreecounterApp', () => App);
