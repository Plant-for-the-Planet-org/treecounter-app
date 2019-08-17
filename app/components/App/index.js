import React, { Component } from 'react';
import { Provider } from 'react-redux';

import TreeCounter from './TreeCounter';
import configureStore from '../../stores/TreecounterStore';
import GlobalErrorBoundary from '../ErrorBoundry/globalErrorBoundry';
import SmartBanner from 'react-smartbanner';

let store;

export default class App extends Component {
  constructor() {
    super();
    store = configureStore();
  }

  render() {
    return (
      <Provider store={store}>
        <GlobalErrorBoundary>
          {/* <SmartBanner title={'Plant-for-the-planet App'} author={'A  solution for Climate Crisis'} button={'GET'} daysHidden={0} /> */}
          <TreeCounter />
        </GlobalErrorBoundary>
      </Provider>
    );
  }
}

export const getStore = () => store;
