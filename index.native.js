import { AppRegistry } from 'react-native';
import App from './app/components/App';
import './ReactotronConfig';
/* app.js */

console.disableYellowBox = true;
console.ignoredYellowBox = ['Warning: Each', 'Warning: Failed'];

AppRegistry.registerComponent('TreecounterApp', () => App);
