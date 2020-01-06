import { AppRegistry } from 'react-native';
import App from './app/components/App';
import './ReactotronConfig';
import WelcomScreenSlider from './app/components/Welcome/WelcomeSlider';

/* app.js */

console.disableYellowBox = true;
console.ignoredYellowBox = ['Warning: Each', 'Warning: Failed'];
GLOBAL.XMLHttpRequest = GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest
AppRegistry.registerComponent('TreecounterApp', () => App);
