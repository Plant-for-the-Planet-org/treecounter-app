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
import SignUpContainer from '../../containers/Authentication/SignUpContainer';
import LoginContainer from '../../containers/Authentication/LoginContainer';
import ForgotPasswordContainer from '../../containers/Authentication/ForgotPasswordContainer';
import ResetPasswordContainer from '../Authentication/ResetPassword';
import SignupSuccessPage from '../Authentication/SignupSuccessPage';
import BrowserRouter from '../Common/BrowserRouter';
import SideMenuContainer from '../../containers/Menu/SideMenuContainer';
import Footer from '../Footer';

// Components which use SVG
import PublicTreecounter from '../TreecounterGraphics/PublicTreecounter';
import Trillion from '../TreecounterGraphics/Trillion';
import Home from '../TreecounterGraphics/Home';

import { loadLoginData } from '../../actions/loadLoginData';
import { getAccessToken } from '../../utils/user';
import { currentUserProfileSelector } from '../../selectors/index';
import { getLocalRoute } from '../../actions/apiRouting';

// Class implementation
class TreeCounter extends Component {
  constructor(props) {
    super(props);
    const { userProfile } = this.props;
    const isLoggedIn = null !== userProfile;
    this.state = {
      loading: true,
      isLoggedIn: isLoggedIn
    };
  }

  async componentWillMount() {
    const { userProfile } = this.props;
    const isLoggedIn = null !== userProfile;
    if (isLoggedIn) {
      this.setState({ loading: false, isLoggedIn: true });
    } else {
      let token = await getAccessToken();
      if (token) {
        this.props.dispatch(loadLoginData());
      } else {
        this.setState({ loading: false, isLoggedIn: false });
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.userProfile) {
      this.setState({ loading: false, isLoggedIn: true });
    }
  }

  render() {
    let isLoggedIn = this.state.isLoggedIn;

    const PrivateRoute = ({ component: Component, ...rest }) => (
      <Route
        {...rest}
        render={props =>
          isLoggedIn ? (
            <Component {...props} />
          ) : (
            <Redirect to={getLocalRoute('app_login')} />
          )
        }
      />
    );

    const PublicRoute = ({ component: Component, ...rest }) => (
      <Route
        {...rest}
        render={props =>
          !isLoggedIn ? (
            <Component {...props} />
          ) : (
            <Redirect to={getLocalRoute('app_userHome')} />
          )
        }
      />
    );

    return !this.state.loading ? (
      <div className="app">
        <BrowserRouter history={history}>
          <div className="app-container">
            <Header />
            <SideMenuContainer loggedIn={isLoggedIn} />
            <div className="app-container__content">
              <PublicRoute exact path="/" component={Trillion} />
              <PublicRoute
                exact
                path={getLocalRoute('app_homepage')}
                component={Trillion}
              />
              <PublicRoute
                path={getLocalRoute('app_signup')}
                component={SignUpContainer}
              />
              {/*<Route exact path={getLocalRoute("app_donateTrees")} render={() => (isLoggedIn ? null : <Redirect to={getLocalRoute("app_login")}/>)}/>*/}
              <PrivateRoute
                path={getLocalRoute('app_signupSuccess')}
                component={SignupSuccessPage}
              />
              <PublicRoute
                path={getLocalRoute('app_login')}
                component={LoginContainer}
              />
              <PublicRoute
                path={getLocalRoute('app_forgotPassword')}
                component={ForgotPasswordContainer}
              />
              <PublicRoute
                path={getLocalRoute('app_resetPassword')}
                component={ResetPasswordContainer}
              />
              <PrivateRoute
                path={getLocalRoute('app_target')}
                component={TargetPage}
              />
              <PrivateRoute
                path={getLocalRoute('app_registerTrees')}
                component={RegisterTree}
              />
              <PrivateRoute
                path={getLocalRoute('app_myTrees')}
                component={UserContributions}
              />
              {/*<Route path="/payment/project/:projectId" component={PaymentDonation}/>*/}
              {/*<Route path={getLocalRoute("app_donateTrees")} component={DonateTrees}/>*/}

              {/* Routes which essentially show svg */}
              <PrivateRoute
                path={getLocalRoute('app_userHome')}
                component={Home}
              />
              <PublicRoute
                path="/treecounterLookup/:treecounterId"
                component={PublicTreecounter}
              />
            </div>
            <Footer />
          </div>
        </BrowserRouter>
        <NotificationContainer />
      </div>
    ) : null;
  }
}

const mapStateToProps = state => ({
  userProfile: currentUserProfileSelector(state)
});

export default connect(mapStateToProps)(TreeCounter);

TreeCounter.propTypes = {
  userProfile: PropTypes.object,
  dispatch: PropTypes.func
};
