import { AppRegistry } from 'react-native';
import App from './app/components/App';
import './ReactotronConfig';
import WelcomScreenSlider from './app/components/Welcome/WelcomeSlider';
import { SingleProjectContentLoader } from './app/components/Common/ContentLoader.native';
/* app.js */

console.disableYellowBox = true;
console.ignoredYellowBox = ['Warning: Each', 'Warning: Failed'];

AppRegistry.registerComponent('TreecounterApp', () => App);
