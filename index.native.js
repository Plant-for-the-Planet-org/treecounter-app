import { AppRegistry } from 'react-native';
import App from './app/components/App';
import './ReactotronConfig';
/* app.js */
import LeaderboardTabs from './app/components/LeaderboardRefresh/index';
import CountriesLeaderBoard from './app/components/LeaderboardRefresh/Countries/CountriesLeaderBoard';
import CountryDetails from './app/components/LeaderboardRefresh/Countries/CountryDetails';

console.disableYellowBox = true;
console.ignoredYellowBox = ['Warning: Each', 'Warning: Failed'];

AppRegistry.registerComponent('TreecounterApp', () => App);
