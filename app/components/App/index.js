import React from 'react';
import { Provider } from 'react-redux';

import TreeCounter from './TreeCounter';
import configureStore from '../../stores/TreecounterStore';
import { debug } from '../../debug/index';
import { initialProps, context } from '../../config/index.js';

let store;

const App = () => {
  debug('initiating store');

  store = configureStore(initialProps, context);

  return (
    <Provider store={store}>
      <TreeCounter />
    </Provider>
  );
};

export const getStore = () => store;

export default App;
