import React, { Component } from 'react';
import { Provider } from 'react-redux';

import '../../utils/polyfill';
import TreeCounter from './TreeCounter';
import configureStore from '../../stores/TreecounterStore';
import GlobalErrorBoundary from '../ErrorBoundry/globalErrorBoundry';
import BrowserNotSupported from '../ErrorBoundry/browserNotSupported';
import { isIOS, isAndroid } from '../../utils/utils';
import { browserNotCompatible } from '../../utils/browercheck';
import SmartBannerClickable from '../SmartBanner';
import i18n from '../../locales/i18n';
let store;

export default class App extends Component {
  constructor() {
    super();
    store = configureStore();
  }

  render() {
    if (browserNotCompatible()) {
      return (
        <BrowserNotSupported />
      );
    }
    else {
      return (
        <Provider store={store}>
          <GlobalErrorBoundary>
            <TreeCounter />
            <SmartBannerClickable
              daysHidden={1}
              title={i18n.t('label.plant_for_the_planet_app')}
              author={i18n.t('label.a_solution_for_climate_crisis')}
              button={i18n.t('label.get_app_button_text')}
              force={isIOS() ? 'ios' : isAndroid() ? 'android' : ''}
              position={'bottom'}
            />
          </GlobalErrorBoundary>
        </Provider>
      );
    }
  }
}

export const getStore = () => store;
