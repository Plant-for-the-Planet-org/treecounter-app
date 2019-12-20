import { AppRegistry } from 'react-native';
import App from './app/components/App';
import './ReactotronConfig';
/* app.js */
import LeaderBoardRefresh from './app/components/LeaderboardRefresh/';
import CountriesLeaderBoard from './app/components/LeaderboardRefresh/Countries';
console.disableYellowBox = true;
console.ignoredYellowBox = ['Warning: Each', 'Warning: Failed'];

AppRegistry.registerComponent('TreecounterApp', () => CountriesLeaderBoard);
