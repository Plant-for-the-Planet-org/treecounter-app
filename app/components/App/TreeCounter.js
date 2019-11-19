/* eslint-disable no-underscore-dangle */
// Library imports
import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NotificationContainer } from 'react-notifications';
import PropTypes from 'prop-types';

// Components imports
import SelectPlantProjectContainer from '../../containers/SelectPlantProject';
import GiftTreesContainer from '../../containers/GiftTrees';
import TargetContainer from '../../containers/TargetContainer';
import RegisterTreesContainer from '../../containers/RegisterTrees';
import HeaderContainer from '../../containers/HeaderContainer';
import UserContributionsContainer from '../../containers/UserContributions';
import EditUserContributionContainer from '../../containers/EditUserContribution';
import SignUpContainer from '../../containers/Authentication/SignUpContainer';
import LoginContainer from '../../containers/Authentication/LoginContainer';
import ForgotPasswordContainer from '../../containers/Authentication/ForgotPasswordContainer';
import ResetPasswordContainer from '../../containers/Authentication/ResetPasswordContainer';
import EmailSentContainer from '../../containers/Authentication/EmailSentContainer';
import SignupSuccessPage from '../Authentication/SignupSuccessPage';
import BrowserRouter from '../Common/BrowserRouter';
import SideMenuContainer from '../../containers/Menu/SideMenuContainer';
import FAQContainer from '../../containers/FAQ';
import PledgeContainer from '../../containers/Pledge';
import RedemptionContainer from '../../containers/RedemptionContainer';

import Footer from '../Footer';

// Components which use SVG
import PublicTreecounterContainer from '../../containers/PublicTreeCounterContainer';
import UserHomeContainer from '../../containers/UserHome';
import Trillion from '../TreecounterGraphics/Trillion';

import { loadTpos } from '../../actions/loadTposAction';
import { loadUserProfile } from '../../actions/loadUserProfileAction';
import { NotificationAction } from '../../actions/notificationAction';
import { getAccessToken } from '../../utils/user';
import { currentUserProfileSelector } from '../../selectors';
import { getLocalRoute } from '../../actions/apiRouting';
import SuccessfullyActivatedAccount from '../../containers/Authentication/SuccessfullActivatedContainer';
import DonationTreesContainer from '../../containers/DonateTrees/index';
import ActivateAccountContainer from '../../containers/Authentication/ActivateAccountContainer';
import ManageProjectContainer from '../../containers/ManageProjects';

import EditUserProfileContainer from '../../containers/EditUserProfile';
import LeaderboardContainer from '../../containers/Leaderboard';
import ProgressModal from '../../components/Common/ModalDialog/ProgressModal';
import { fetchpledgeEventsAction } from '../../actions/pledgeEventsAction';
import PrivacyContainer from '../../containers/Privacy';
import ImprintContainer from '../../containers/Imprint';
import AppPaymentContainer from '../../containers/AppPayment';
import BodyErrorBoundary from '../ErrorBoundry/bodyErrorBoundry';
import PageNotFound from '../ErrorBoundry/404';
import WidgetShareContainer from '../../containers/WidgetsShare';
import ChallengeContainer from '../../containers/Challenge/createChallenge';
import RedirectedPublicDenyEmail from '../../containers/Challenge/RedirectedPublicDenyEmail';
import RedirectedPrivateAcceptEmail from '../../containers/Challenge/RedirectedPrivateAcceptEmail';
import { initLocale } from '../../actions/getLocale';
import { fetchLocation } from '../../actions/fetchLocation';
import { fetchCurrencies } from '../../actions/currencies';
// Class implementation
class TreeCounter extends Component {
  constructor(props) {
    super(props);
    const { userProfile } = this.props;
    const isLoggedIn = null !== userProfile;
    let IS_IPAD = navigator.userAgent.match(/iPad/i) != null,
      IS_IPHONE =
        !IS_IPAD &&
        (navigator.userAgent.match(/iPhone/i) != null ||
          navigator.userAgent.match(/iPod/i) != null),
      IS_IOS = IS_IPAD || IS_IPHONE,
      IS_ANDROID = !IS_IOS && navigator.userAgent.match(/android/i) != null;
    this.state = {
      loading: true,
      isLoggedIn: isLoggedIn,
      isIOS: IS_IOS,
      isAndroid: IS_ANDROID,
      isCancelled: false
    };
    this.props.fetchLocation();
    this.props.fetchCurrencies();
    initLocale();
  }

  _appRoutes = undefined;

  async componentWillMount() {
    const { userProfile } = this.props;
    const isLoggedIn = null !== userProfile;
    if (isLoggedIn) {
      this.setState({ loading: false, isLoggedIn: true });
    } else {
      let token = await getAccessToken();
      if (token) {
        this.props.loadUserProfile();
        this.props.NotificationAction();
      } else {
        this.setState({ loading: false, isLoggedIn: false });
      }
    }
  }

  componentDidMount() {
    this.props.loadTpos();
    this.props.fetchpledgeEventsAction();
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.userProfile !== this.props.userProfile &&
      (!nextProps.userProfile ||
        !this.props.userProfile ||
        nextProps.userProfile.id != this.props.userProfile.id)
    ) {
      let isLoggedIn = null !== nextProps.userProfile;
      // eslint-disable-next-line no-underscore-dangle
      this._appRoutes = undefined;
      this.setState({ loading: false, isLoggedIn: isLoggedIn });
    }
  }

  continueOnSite() {
    this.setState({
      isCancelled: true
    });
  }

  initRoutes() {
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
    // eslint-disable-next-line no-underscore-dangle
    this._appRoutes = (
      <div className="app-container__content">
        <BodyErrorBoundary>
          <Switch>
            <Route exact path="/" component={Trillion} />
            <Route
              exact
              path={
                getLocalRoute('app_homepage') !== '/'
                  ? getLocalRoute('app_homepage')
                  : 'null'
              }
              component={Trillion}
            />

            <PublicRoute
              path={getLocalRoute('app_accountActivate') + '/:token'}
              component={SuccessfullyActivatedAccount}
            />
            <PublicRoute
              path={getLocalRoute('app_signup') + '/:type?'}
              component={SignUpContainer}
            />

            <Route
              path={getLocalRoute('app_accountActivated')}
              component={SuccessfullyActivatedAccount}
            />
            <PublicRoute
              path={getLocalRoute('app_accountActivation')}
              component={ActivateAccountContainer}
            />
            {/*<Route exact path={getLocalRoute("app_donateTrees")} render={() => (isLoggedIn ? null : <Redirect to={getLocalRoute("app_login")}/>)}/>*/}
            <PrivateRoute
              path={getLocalRoute('app_signupSuccess')}
              component={SignupSuccessPage}
            />
            <PrivateRoute
              path={getLocalRoute('app_userHome')}
              component={UserHomeContainer}
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
              path={getLocalRoute('app_resetPassword') + '/:token'}
              component={ResetPasswordContainer}
            />
            <PublicRoute
              path={getLocalRoute('app_passwordSent')}
              component={EmailSentContainer}
            />
            <PrivateRoute
              path={
                getLocalRoute('app_challengeResponse') + '/active' + '/:token'
              }
              component={RedirectedPrivateAcceptEmail}
            />
            <Route
              path={
                getLocalRoute('app_challengeResponse') + '/decline' + '/:token'
              }
              component={RedirectedPublicDenyEmail}
            />
            <Route
              path={getLocalRoute('app_payment') + '/:donationContribution'}
              component={AppPaymentContainer}
            />
            <Route
              path={getLocalRoute('app_explore')}
              component={LeaderboardContainer}
            />
            <Route
              exact
              path={getLocalRoute('app_leaderboard') + '/:section'}
              component={LeaderboardContainer}
            />
            <Route
              exact
              path={
                getLocalRoute('app_leaderboard') + '/:section' + '/:subSection'
              }
              component={LeaderboardContainer}
            />
            <PrivateRoute
              path={getLocalRoute('app_target')}
              component={TargetContainer}
            />
            <PrivateRoute
              path={getLocalRoute('app_registerTrees')}
              component={RegisterTreesContainer}
            />
            <PrivateRoute
              path={getLocalRoute('app_editTrees') + '/:selectedTreeId'}
              component={EditUserContributionContainer}
            />
            <PrivateRoute
              path={getLocalRoute('app_myTrees')}
              component={UserContributionsContainer}
            />
            <PrivateRoute
              path={getLocalRoute('app_editProfile')}
              component={EditUserProfileContainer}
            />
            <PrivateRoute
              path={getLocalRoute('app_challenge')}
              component={ChallengeContainer}
            />
            <Route path={getLocalRoute('app_faq')} component={FAQContainer} />
            <Route
              path={getLocalRoute('app_privacy')}
              component={PrivacyContainer}
            />
            <Route
              path={getLocalRoute('app_imprint')}
              component={ImprintContainer}
            />
            {/*<Route path="/payment/project/:projectId" component={PaymentDonation}/>*/}
            <Route
              path={getLocalRoute('app_giftTrees')}
              component={GiftTreesContainer}
            />
            <Route
              path={getLocalRoute('app_selectProject')}
              component={SelectPlantProjectContainer}
            />
            <Route
              path={getLocalRoute('app_donateTrees') + '/:id?'}
              component={DonationTreesContainer}
            />
            <Route
              path={getLocalRoute('app_claim') + '/:type' + '/:code'}
              component={RedemptionContainer}
            />
            <Route
              path={getLocalRoute('app_redeem') + '/:type?' + '/:code?'}
              component={RedemptionContainer}
            />
            <Route
              path={getLocalRoute('app_pledge') + '/:eventSlug'}
              component={PledgeContainer}
            />
            <Route
              path={getLocalRoute('app_treecounter') + '/:treecounterId'}
              component={PublicTreecounterContainer}
            />
            <PrivateRoute
              path={getLocalRoute('app_manageProjects')}
              component={ManageProjectContainer}
            />
            <PrivateRoute
              path={getLocalRoute('app_widgetBuilder')}
              component={WidgetShareContainer}
            />
            <Route component={PageNotFound} />
          </Switch>
        </BodyErrorBoundary>
      </div>
    );
  }

  render() {
    if (!this._appRoutes) {
      this.initRoutes();
    }
    // Turned off deeplink to app as it does not work if user has not installed the app.
    // TODO: either delete this code or implement a solution which solves the problem
    // if (window.location.pathname.indexOf('signup') > -1 && this.state.isIOS) {
    //   this.openApp(window.location.pathname);
    //   return null;
    // }
    return !this.state.loading ? (
      <div className="app">
        <BrowserRouter history={history}>
          <div className="app-container">
            <ProgressModal />
            <HeaderContainer />
            <Route component={SideMenuContainer} />
            {this._appRoutes}
            <Footer />
          </div>
        </BrowserRouter>
        <NotificationContainer />
      </div>
    ) : null;
  }

  // openApp(linkUrl) {
  //    window.location.href = 'trilliontreecampaign:' + linkUrl;
  // }
}

const mapStateToProps = state => ({
  userProfile: currentUserProfileSelector(state)
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      fetchCurrencies,
      fetchLocation,
      loadUserProfile,
      NotificationAction,
      loadTpos,
      fetchpledgeEventsAction
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(TreeCounter);

TreeCounter.propTypes = {
  userProfile: PropTypes.object,
  loadUserProfile: PropTypes.func,
  NotificationAction: PropTypes.func,
  loadTpos: PropTypes.func,
  dispatch: PropTypes.func,
  fetchpledgeEventsAction: PropTypes.func
};
