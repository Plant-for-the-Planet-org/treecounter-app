// Library imports
import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import { NotificationContainer } from 'react-notifications';

import { isIOS } from '../../utils/utils';

// Components imports
import Routes from './Routes';
import HeaderContainer from '../../containers/HeaderContainer';
import BrowserRouter from '../Common/BrowserRouter';
import SideMenuContainer from '../../containers/Menu/SideMenuContainer';

import Footer from '../Footer';

import ProgressModal from '../../components/Common/ModalDialog/ProgressModal';
import BodyErrorBoundary from '../ErrorBoundry/bodyErrorBoundry';
import { initLocale } from '../../actions/getLocale';

/**
 * Trillion Trees Campaign Application
 */
const TreeCounter = () => {
  // This is the same as componentDidMount
  useEffect(() => {
    // this really needs to happen before this
    // ideally on initial creation of redux store
    initLocale();

    // Open in app if on iOS
    if (window.location.pathname.indexOf('signup') > -1 && isIOS()) {
      window.location.href = 'trilliontreecampaign:' + window.location.pathname;
    }
  }, []);

  return (
    <div className="app">
      <div className="app-container">
        <ProgressModal />
        <BrowserRouter history={history}>
          <React.Fragment>
            <HeaderContainer />
            <Route component={SideMenuContainer} />
            <div className="app-container__content">
              <BodyErrorBoundary>
                <Routes />
              </BodyErrorBoundary>
            </div>
            <Footer />
          </React.Fragment>
        </BrowserRouter>
      </div>
      <NotificationContainer />
    </div>
  );
};

export default TreeCounter;
