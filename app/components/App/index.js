import React, { Component, Suspense, lazy } from 'react';
import { Provider } from 'react-redux';
import configureStore from '../../stores/TreecounterStore';
import { isIOS, isAndroid } from '../../utils/utils';
import i18n from '../../locales/i18n.js';
import LoadingIndicator from '../../components/Common/LoadingIndicator';

const SmartBannerClickable = lazy(() => import('../SmartBanner'));
const GlobalErrorBoundary = lazy(() =>
  import('../ErrorBoundry/globalErrorBoundry')
);
const TreeCounter = lazy(() => import('./TreeCounter'));

let store;

export default class App extends Component {
  constructor() {
    super();
    store = configureStore();
  }

  render() {
    return (
      <Provider store={store}>
        <Suspense
          fallback={
            <div style={styles.container}>
              <LoadingIndicator />
            </div>
          }
        >
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
        </Suspense>
      </Provider>
    );
  }
}
let styles = {
  container: { textAlign: 'center', margin: '0 auto' }
};
export const getStore = () => store;
