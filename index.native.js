import { AppRegistry } from 'react-native';
import App from './app/components/App';
import './ReactotronConfig';
/* app.js */
import FullMapComponent, {
  ListItem
} from './app/components/UserHome/FullMapComponent';

console.disableYellowBox = true;
console.ignoredYellowBox = ['Warning: Each', 'Warning: Failed'];
GLOBAL.XMLHttpRequest = GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest;
AppRegistry.registerComponent('TreecounterApp', () => App);
