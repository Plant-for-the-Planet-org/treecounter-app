import Reactotron from 'reactotron-react-native';

Reactotron.configure() // controls connection & communication settings
  .useReactNative() // add all built-in react native plugins
  // .connect(); // let's connect!
  // uncomment the following lines and use the command
  //    adb reverse tcp:9090 tcp:9090
  // to make it work with an Android emulator:
  .connect({
    enabled: true,
    host: '10.1.0.22', // server ip
    port: 9090
  }); // let's connect!
