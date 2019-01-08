import { AppRegistry, Platform } from 'react-native';
import App from './app/components/App';
import './ReactotronConfig';
import stacktraceParser from 'stacktrace-parser';
import { Alert } from 'react-native';
/* app.js */

console.disableYellowBox = true;

const parseErrorStack = error => {
  if (!error || !error.stack) {
    return [];
  }
  return Array.isArray(error.stack)
    ? error.stack
    : stacktraceParser.parse(error.stack);
};

// intercept react-native error handling
if (ErrorUtils.getGlobalHandler) {
  console.log('ErrorUtils._globalHandler', ErrorUtils._globalHandler);
  this.defaultHandler =
    (ErrorUtils.getGlobalHandler && ErrorUtils.getGlobalHandler()) ||
    ErrorUtils._globalHandler;
  ErrorUtils.setGlobalHandler(wrapGlobalHandler); // feed errors directly to our wrapGlobalHandler function
}

async function wrapGlobalHandler(error, isFatal) {
  const stack = parseErrorStack(error);
  console.log(error, stack, isFatal);
  Alert.alert('Error', 'Something went wrong.');
  this.defaultHandler(error, isFatal); //after you're finished, call the defaultHandler so that react-native also gets the error
}

AppRegistry.registerComponent('TreecounterApp', () => App);
