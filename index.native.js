import { AppRegistry } from 'react-native';
import App from './app/components/App';
import './ReactotronConfig';
/* app.js */
import { PublicTreeCounterContentLoader } from './app/components/Common/ContentLoader.native';

console.disableYellowBox = true;
console.ignoredYellowBox = ['Warning: Each', 'Warning: Failed'];

AppRegistry.registerComponent('TreecounterApp', () => App);
