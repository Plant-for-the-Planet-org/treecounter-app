import React, { Component } from 'react';
import { Provider } from 'react-redux';

import TreeCounter from './TreeCounter';
import configureStore from '../../stores/TreecounterStore';
import GlobalErrorBoundary from '../ErrorBoundry/globalErrorBoundry';
import { isIOS, isAndroid } from '../../utils/utils';
import SmartBanner from '../SmartBanner';
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
          <TreeCounter />
          <SmartBanner
            daysHidden={1}
            title={i18n.t('label.Plant_for_the_planet_App')}
            author={i18n.t('label.A_solution_for_Climate_Crisis')}
            button={i18n.t('label.getAppButtonText')}
            force={isIOS() ? 'ios' : isAndroid() ? 'android' : ''}
            position={'bottom'}
          />
        </GlobalErrorBoundary>
      </Provider>
    );
  }
}

export const getStore = () => store;
