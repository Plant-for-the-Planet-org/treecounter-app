import React, { Component } from 'react';
import { Provider } from 'react-redux';

import TreeCounter from './TreeCounter';
import configureStore from '../../stores/TreecounterStore';
// import { debug } from '../../debug/index';

let store;

export default class App extends Component {
  constructor() {
    super();
    store = configureStore();
  }
  render() {
    return (
      <Provider store={store}>
        <TreeCounter />
      </Provider>
    );
  }
}

export const getStore = () => store;
