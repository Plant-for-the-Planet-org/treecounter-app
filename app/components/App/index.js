import React, { Component } from 'react';
import { Provider } from 'react-redux';

import TreeCounter from './TreeCounter';
import configureStore from '../../stores/TreecounterStore';
import GlobalErrorBoundary from '../ErrorBoundry/globalErrorBoundry';
import { isIOS, isAndroid } from '../../utils/utils';
import { Auth0Provider } from '../auth0/react-auth0';
import { context } from '../../config';
import AuthenticateUser from '../auth0/AuthenticateUser';

import SmartBannerClickable from '../SmartBanner';
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
          <Auth0Provider
            domain={context.auth0domain}
            client_id={context.auth0clientId}
            redirect_uri={window.location.origin}
          >
            <AuthenticateUser>
              <TreeCounter />
            </AuthenticateUser>
          </Auth0Provider>
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

export const getStore = () => store;
