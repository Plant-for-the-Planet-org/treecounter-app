import { AppRegistry } from 'react-native';
import 'react-native-get-random-values';
import App from './app/components/App';
import './ReactotronConfig';
import { name as appName } from './app.json';

console.disableYellowBox = true;
console.ignoredYellowBox = ['Warning: Each', 'Warning: Failed'];
GLOBAL.XMLHttpRequest = GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest;
AppRegistry.registerComponent(appName, () => App);
