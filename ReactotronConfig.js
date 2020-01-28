import Reactotron from 'reactotron-react-js';
import { reactotronRedux } from 'reactotron-redux';

const reactotron = Reactotron.configure().use(reactotronRedux());

if (process.env.NODE_ENV === 'development') {
  reactotron.connect(); // let's connect!
  // uncomment the following lines and use the command
  //    adb reverse tcp:9090 tcp:9090
  // to make it work with an Android emulator:
  // .connect({
  //   enabled: true,
  //   host: '10.1.0.22', // server ip
  //   port: 9090
  // }); // let's connect!
}

export default reactotron;
