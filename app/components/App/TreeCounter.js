/* eslint-disable no-underscore-dangle */
// Library imports
import React, { Component, lazy, Suspense } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NotificationContainer } from 'react-notifications';
import PropTypes from 'prop-types';
import LoadingIndicator from '../../components/Common/LoadingIndicator';
import HeaderContainer from '../../containers/HeaderContainer';
import ProgressModal from '../../components/Common/ModalDialog/ProgressModal';
import PageNotFound from '../ErrorBoundry/404';
import BrowserRouter from '../Common/BrowserRouter';
import Footer from '../Footer';

// Components imports
const SelectPlantProjectContainer = lazy(() =>
  import('../../containers/SelectPlantProject')
);
const GiftTreesContainer = lazy(() => import('../../containers/GiftTrees'));
const TargetContainer = lazy(() => import('../../containers/TargetContainer'));
const RegisterTreesContainer = lazy(() =>
  import('../../containers/RegisterTrees')
);
const UserContributionsContainer = lazy(() =>
  import('../../containers/UserContributions')
);
const EditUserContributionContainer = lazy(() =>
  import('../../containers/EditUserContribution')
);
const SignUpContainer = lazy(() =>
  import('../../containers/Authentication/SignUpContainer')
);
const LoginContainer = lazy(() =>
  import('../../containers/Authentication/LoginContainer')
);
const ForgotPasswordContainer = lazy(() =>
  import('../../containers/Authentication/ForgotPasswordContainer')
);
const ResetPasswordContainer = lazy(() =>
  import('../../containers/Authentication/ResetPasswordContainer')
);
const EmailSentContainer = lazy(() =>
  import('../../containers/Authentication/EmailSentContainer')
);
const SignupSuccessPage = lazy(() =>
  import('../Authentication/SignupSuccessPage')
);
const SideMenuContainer = lazy(() =>
  import('../../containers/Menu/SideMenuContainer')
);
const FAQContainer = lazy(() => import('../../containers/FAQ'));
const PledgeContainer = lazy(() => import('../../containers/Pledge'));
const RedemptionContainer = lazy(() =>
  import('../../containers/RedemptionContainer')
);

// Components which use SVG

const PublicTreecounterContainer = lazy(() =>
  import('../../containers/PublicTreeCounterContainer')
);
const UserHomeContainer = lazy(() => import('../../containers/UserHome'));
const Trillion = lazy(() => import('../TreecounterGraphics/Trillion'));

import { loadTpos } from '../../actions/loadTposAction';
import { loadUserProfile } from '../../actions/loadUserProfileAction';
import { NotificationAction } from '../../actions/notificationAction';
import { getAccessToken } from '../../utils/user';
import { currentUserProfileSelector } from '../../selectors';
import { getLocalRoute } from '../../actions/apiRouting';

const SuccessfullyActivatedAccount = lazy(() =>
  import('../../containers/Authentication/SuccessfullActivatedContainer')
);
const CompetitionContainer = lazy(() =>
  import('../../containers/CompetitionContainer/index')
);
const DonationTreesContainer = lazy(() =>
  import('../../containers/DonateTrees/index')
);
const ActivateAccountContainer = lazy(() =>
  import('../../containers/Authentication/ActivateAccountContainer')
);
const ManageProjectContainer = lazy(() =>
  import('../../containers/ManageProjects')
);

const EditUserProfileContainer = lazy(() =>
  import('../../containers/EditUserProfile')
);
const LeaderboardContainer = lazy(() => import('../../containers/Leaderboard'));
import { fetchpledgeEventsAction } from '../../actions/pledgeEventsAction';
const PrivacyContainer = lazy(() => import('../../containers/Privacy'));
const ImprintContainer = lazy(() => import('../../containers/Imprint'));
const AppPaymentContainer = lazy(() => import('../../containers/AppPayment'));
const BodyErrorBoundary = lazy(() =>
  import('../ErrorBoundry/bodyErrorBoundry')
);
const WidgetShareContainer = lazy(() =>
  import('../../containers/WidgetsShare')
);
const ChallengeContainer = lazy(() =>
  import('../../containers/Challenge/createChallenge')
);
const RedirectedPublicDenyEmail = lazy(() =>
  import('../../containers/Challenge/RedirectedPublicDenyEmail')
);
const RedirectedPrivateAcceptEmail = lazy(() =>
  import('../../containers/Challenge/RedirectedPrivateAcceptEmail')
);

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
              path={getLocalRoute('app_support') + '/:slug?'}
              component={DonationTreesContainer}
            />
            <Route
              path={getLocalRoute('app_selectProject')}
              component={SelectPlantProjectContainer}
            />
            <Route
              path={getLocalRoute('app_competition') + '/:id?'}
              component={CompetitionContainer}
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
            <Suspense
              fallback={
                <div style={{ margin: 'auto' }}>
                  <LoadingIndicator />
                </div>
              }
            >
              <Route component={SideMenuContainer} />
              {this._appRoutes}
            </Suspense>
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
