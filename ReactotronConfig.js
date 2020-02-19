import Reactotron from 'reactotron-react-js';
import { reactotronRedux } from 'reactotron-redux';

let reactotron;
if (process.env.NODE_ENV === 'development') {
  reactotron = Reactotron.configure()
    .use(reactotronRedux())
    .connect(); // let's connect!
  // to make it work with an Android emulator:
  // adb reverse tcp:9090 tcp:9090
}

export default reactotron;
