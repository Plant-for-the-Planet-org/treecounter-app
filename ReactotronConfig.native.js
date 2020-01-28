import AsyncStorage from '@react-native-community/async-storage';
import Reactotron from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';

const reactotron = Reactotron.setAsyncStorageHandler(AsyncStorage)
  .configure() // controls connection & communication settings
  .use(reactotronRedux())
  .useReactNative() // add all built-in react native plugins
  .connect(); // let's connect!
// uncomment the following lines and use the command
//    adb reverse tcp:9090 tcp:9090
// to make it work with an Android emulator:
// .connect({
//   enabled: true,
//   host: '10.1.0.22', // server ip
//   port: 9090
// }); // let's connect!

export default reactotron;
