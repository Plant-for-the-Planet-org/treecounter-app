import React, { Component } from 'react';
import { Provider } from 'react-redux';

import TreeCounter from './TreeCounter';
import configureStore from '../../stores/TreecounterStore';
import GlobalErrorBoundary from '../ErrorBoundry/globalErrorBoundry';
import SmartBanner from 'react-smartbanner';
import i18n from '../../locales/i18n.js';
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
          <SmartBanner
            title={i18n.t('label.Plant_for_the_planet_App')}
            author={i18n.t('label.A_solution_for_Climate_Crisis')}
            button={i18n.t('label.getAppButtonText')}
          />
          <TreeCounter />
        </GlobalErrorBoundary>
      </Provider>
    );
  }
}

export const getStore = () => store;
