import AsyncStorage from '@react-native-community/async-storage';
import Reactotron from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';

let reactotron;
if (__DEV__) {
  reactotron = Reactotron.setAsyncStorageHandler(AsyncStorage)
    .configure() // controls connection & communication settings
    .use(reactotronRedux())
    .useReactNative() // add all built-in react native plugins
    .connect(); // let's connect!
  // to make it work with an Android emulator:
  // adb reverse tcp:9090 tcp:9090
}

export default reactotron;
