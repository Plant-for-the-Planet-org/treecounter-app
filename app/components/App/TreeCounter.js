// Library imports
import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { NotificationContainer } from 'react-notifications';
import PropTypes from 'prop-types';

// Components imports
import TargetPage from '../Target';
import RegisterTree from '../RegisterTrees/RegisterTrees';
import Header from '../Header/index';
import UserContributions from '../UserContributions/UserContributions';
import { SignUp } from '../Authentication';
import LoginContainer from '../../containers/Authentication/LoginContainer';
import ForgotPasswordContainer from '../Authentication/ForgotPassword';
import ResetPasswordContainer from '../Authentication/ResetPassword';
import SignupSuccessPage from '../Authentication/SignupSuccessPage';
import BrowserRouter from '../Common/BrowserRouter';
import Menu from '../Menu';

// Components which use SVG
import PublicTreecounter from '../TreecounterGraphics/PublicTreecounter';
import Trillion from '../TreecounterGraphics/Trillion';
import Home from '../TreecounterGraphics/Home';

import { currentUserProfileSelector } from '../../selectors/index';
import { getLocalRoute } from '../../actions/apiRouting';

// Class implementation
class TreeCounter extends Component {
  async componentDidMount() {
    console.log('componentDidMount TreeCounter');
  }

  render() {
    console.log('user is logged in:', this.props.isLoggedIn);

    const { isLoggedIn } = this.props;

    return (
      <div className="app">
        <BrowserRouter history={history}>
          <div className="app-container">
            <Header />
            <Menu loggedIn={isLoggedIn} />
            <div className="app-container__content">
              <Route exact path="/" component={Trillion} />
              <Route
                exact
                path={getLocalRoute('app_homepage')}
                component={Trillion}
              />
              <Route path={getLocalRoute('app_signup')} component={SignUp} />
              <Route
                exact
                path={getLocalRoute('app_signupSuccess')}
                render={() =>
                  isLoggedIn ? null : (
                    <Redirect to={getLocalRoute('app_login')} />
                  )
                }
              />
              <Route
                exact
                path={getLocalRoute('app_registerTrees')}
                render={() =>
                  isLoggedIn ? null : (
                    <Redirect to={getLocalRoute('app_login')} />
                  )
                }
              />
              <Route
                exact
                path={getLocalRoute('app_myTrees')}
                render={() =>
                  isLoggedIn ? null : (
                    <Redirect to={getLocalRoute('app_login')} />
                  )
                }
              />
              <Route
                exact
                path={getLocalRoute('app_target')}
                render={() =>
                  isLoggedIn ? null : (
                    <Redirect to={getLocalRoute('app_login')} />
                  )
                }
              />
              {/*<Route exact path={getLocalRoute("app_donateTrees")} render={() => (isLoggedIn ? null : <Redirect to={getLocalRoute("app_login")}/>)}/>*/}
              <Route
                path={getLocalRoute('app_signupSuccess')}
                component={SignupSuccessPage}
              />
              <Route
                path={getLocalRoute('app_login')}
                component={LoginContainer}
              />
              <Route
                path={getLocalRoute('app_forgotPassword')}
                component={ForgotPasswordContainer}
              />
              <Route
                path={getLocalRoute('app_resetPassword')}
                component={ResetPasswordContainer}
              />
              <Route
                path={getLocalRoute('app_target')}
                component={TargetPage}
              />
              <Route
                path={getLocalRoute('app_registerTrees')}
                component={RegisterTree}
              />
              <Route
                path={getLocalRoute('app_myTrees')}
                component={UserContributions}
              />
              {/*<Route path="/payment/project/:projectId" component={PaymentDonation}/>*/}
              {/*<Route path={getLocalRoute("app_donateTrees")} component={DonateTrees}/>*/}

              {/* Routes which essentially show svg */}
              <Route path={getLocalRoute('app_userHome')} component={Home} />
              <Route
                path="/treecounterLookup/:treecounterId"
                component={PublicTreecounter}
              />
            </div>
          </div>
        </BrowserRouter>
        <NotificationContainer />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isLoggedIn: null !== currentUserProfileSelector(state)
});

export default connect(mapStateToProps)(TreeCounter);

TreeCounter.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  dispatch: PropTypes.func
};
