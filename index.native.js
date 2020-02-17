import { AppRegistry } from 'react-native';
import App from './app/components/App';
import './ReactotronConfig';
// For Offline map markering
import RegisterMultipleTrees from './app/components/RegisterMultipleTrees/';
// for Capture Offline Map
import CaptureMap from './app/components/RegisterMultipleTrees/CaptureMap';

/* app.js */

console.disableYellowBox = true;
console.ignoredYellowBox = ['Warning: Each', 'Warning: Failed'];
GLOBAL.XMLHttpRequest = GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest;
AppRegistry.registerComponent('TreecounterApp', () => RegisterMultipleTrees);
