import { AppRegistry } from 'react-native';
import App from './app/components/App';
import WelcomScreenSlider from './app/components/Welcome/WelcomeSlider';
import './ReactotronConfig';
/* app.js */

console.disableYellowBox = true;
console.ignoredYellowBox = ['Warning: Each', 'Warning: Failed'];

AppRegistry.registerComponent('TreecounterApp', () => WelcomScreenSlider);
