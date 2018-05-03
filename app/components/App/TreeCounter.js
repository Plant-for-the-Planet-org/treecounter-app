// Library imports
import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { NotificationContainer } from "react-notifications";

// Components imports
import TargetPage from "./components/Target";
import RegisterTree from "./components/RegisterTrees/RegisterTrees";
import Header from "./components/Header/index";
import UserContributions from "./components/UserContributions/UserContributions";
import { Login, SignUp } from "./components/Authentication";
import ForgotPasswordContainer from "./components/Authentication/ForgotPassword";
import ResetPasswordContainer from "./components/Authentication/ResetPassword";
import SignupSuccessPage from "./components/Authentication/SignupSuccessPage";
import BrowserRouter from "./components/Common/BrowserRouter";
import Menu from "./components/Menu";
import DonateTrees from "./components/DonateTrees/index";
import PaymentDonation from "./components/DonateTrees/PaymentDonation";

// Components which use SVG
import PublicTreecounter from './components/TreecounterGraphics/PublicTreecounter';
import Trillion from "./components/TreecounterGraphics/Trillion";
import Home from "./components/TreecounterGraphics/Home";

import { currentUserProfileSelector } from "./selectors/index";
import { refreshToken } from "./actions/authActions";
import { getLocalRoute } from "./actions/apiRouting";

// Class implementation
class TreeCounter extends Component {

  componentDidMount() {
    console.log('componentDidMount TreeCounter');

    // TODO: move token existence check to a better place
    if (localStorage.getItem('jwt')) {
      const { dispatch } = this.props;
      dispatch(refreshToken());
    }
  }

  render() {

    console.log('currentUserProfile:', this.props.currentUserProfile);
    console.log('user is logged in:', this.props.isLoggedIn);

    const { isLoggedIn } = this.props;

    return <div className="app">
      <BrowserRouter history={history}>
        <div className="app-container">
          <Header />
          <Menu loggedIn={isLoggedIn} />
          <div className="app-container__content">
            <Route exact path="/" component={Trillion} />
            <Route exact path={getLocalRoute("app_homepage")} component={Trillion} />
            <Route path={getLocalRoute("app_signup")} component={SignUp} />
            <Route exact path={getLocalRoute("app_signupSuccess")} render={() => (isLoggedIn ? null : <Redirect to={getLocalRoute("app_login")} />)} />
            <Route exact path={getLocalRoute("app_registerTrees")} render={() => (isLoggedIn ? null : <Redirect to={getLocalRoute("app_login")} />)} />
            <Route exact path={getLocalRoute("app_myTrees")} render={() => (isLoggedIn ? null : <Redirect to={getLocalRoute("app_login")} />)} />
            <Route exact path={getLocalRoute("app_target")} render={() => (isLoggedIn ? null : <Redirect to={getLocalRoute("app_login")} />)} />
            {/*<Route exact path={getLocalRoute("app_donateTrees")} render={() => (isLoggedIn ? null : <Redirect to={getLocalRoute("app_login")}/>)}/>*/}
            <Route path={getLocalRoute("app_signupSuccess")} component={SignupSuccessPage} />
            <Route path={getLocalRoute("app_login")} component={Login} />
            <Route path={getLocalRoute("app_forgotPassword")} component={ForgotPasswordContainer} />
            <Route path={getLocalRoute("app_resetPassword")} component={ResetPasswordContainer} />
            <Route path={getLocalRoute("app_target")} component={TargetPage} />
            <Route path={getLocalRoute("app_registerTrees")} component={RegisterTree} />
            <Route path={getLocalRoute("app_myTrees")} component={UserContributions} />
            {/*<Route path="/payment/project/:projectId" component={PaymentDonation}/>*/}
            {/*<Route path={getLocalRoute("app_donateTrees")} component={DonateTrees}/>*/}

            {/* Routes which essentially show svg */}
            <Route path={getLocalRoute("app_userHome")} component={Home} />
            <Route path="/treecounterLookup/:treecounterId" component={PublicTreecounter} />
          </div>
        </div>
      </BrowserRouter>
      <NotificationContainer />
    </div>;
  }
}

const mapStateToProps = state => ({
  currentUserProfile: currentUserProfileSelector(state),
  isLoggedIn: (null !== currentUserProfileSelector(state))
});

export default connect(mapStateToProps)(TreeCounter);
