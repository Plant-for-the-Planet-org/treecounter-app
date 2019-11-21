import React, { View, Text, Component, Suspense, lazy } from 'react';
import { Provider } from 'react-redux';

import configureStore from '../../stores/TreecounterStore';

const TreeCounter = lazy(() => import('./TreeCounter'));
const GlobalErrorBoundary = lazy(() =>
  import('../ErrorBoundry/globalErrorBoundry')
);
import Icon from 'react-native-vector-icons/FontAwesome';

import LoadingIndicator from '../../components/Common/LoadingIndicator';

let store;
Icon.loadFont();
export default class App extends Component {
  constructor() {
    super();
    store = configureStore();
  }

  render() {
    return (
      <Provider store={store}>
        <Suspense
          fallback={() => (
            <View style={styles.container}>
              <LoadingIndicator />
            </View>
          )}
        >
          <GlobalErrorBoundary>
            <TreeCounter />
          </GlobalErrorBoundary>
        </Suspense>
      </Provider>
    );
  }
}
let styles = {
  container: {}
};
export const getStore = () => store;
