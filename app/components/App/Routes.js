// Library imports
import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { PublicRoute, PrivateRoute } from '../auth0/AuthenticatedRoutes';
import { getLocalRoute } from '../../actions/apiRouting';

// Components imports
import SelectPlantProjectContainer from '../../containers/SelectPlantProject';
import GiftTreesContainer from '../../containers/GiftTrees';
import TargetContainer from '../../containers/TargetContainer';
import RegisterTreesContainer from '../../containers/RegisterTrees';
import UserContributionsContainer from '../../containers/UserContributions';
import EditUserContributionContainer from '../../containers/EditUserContribution';
import SignUpContainer from '../../containers/Authentication/SignUpContainer';
import LoginContainer from '../../containers/Authentication/LoginContainer';
import ForgotPasswordContainer from '../../containers/Authentication/ForgotPasswordContainer';
import ResetPasswordContainer from '../../containers/Authentication/ResetPasswordContainer';
import EmailSentContainer from '../../containers/Authentication/EmailSentContainer';
import SignupSuccessPage from '../Authentication/SignupSuccessPage';
import FAQContainer from '../../containers/FAQ';
import PledgeContainer from '../../containers/Pledge';
import RedemptionContainer from '../../containers/RedemptionContainer';
import Auth0Authorize from '../auth0/Auth0Authorize';
import Auth0Callback from '../auth0/Auth0Callback';

// Components which use SVG
import PublicTreecounterContainer from '../../containers/PublicTreeCounterContainer';
import UserHomeContainer from '../../containers/UserHome';
import Trillion from '../TreecounterGraphics/Trillion';

import SuccessfullyActivatedAccount from '../../containers/Authentication/SuccessfullActivatedContainer';
import DonationTreesContainer from '../../containers/DonateTrees/index';
import ActivateAccountContainer from '../../containers/Authentication/ActivateAccountContainer';
import ManageProjectContainer from '../../containers/ManageProjects';

import EditUserProfileContainer from '../../containers/EditUserProfile';
import LeaderboardContainer from '../../containers/Leaderboard';
import PrivacyContainer from '../../containers/Privacy';
import ImprintContainer from '../../containers/Imprint';
import AppPaymentContainer from '../../containers/AppPayment';
import PageNotFound from '../ErrorBoundry/404';
import WidgetShareContainer from '../../containers/WidgetsShare';
import ChallengeContainer from '../../containers/Challenge/createChallenge';
import RedirectedPublicDenyEmail from '../../containers/Challenge/RedirectedPublicDenyEmail';
import RedirectedPrivateAcceptEmail from '../../containers/Challenge/RedirectedPrivateAcceptEmail';

const Routes = () => {
  return (
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
      <Route
        // TODO: no named route yet defined in fos_js_routes.json
        path="/auth0-callback"
        component={Auth0Callback}
      />
      <PublicRoute path="/authorize" component={Auth0Authorize} />
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
        path={getLocalRoute('app_challengeResponse') + '/active' + '/:token'}
        component={RedirectedPrivateAcceptEmail}
      />
      <Route
        path={getLocalRoute('app_challengeResponse') + '/decline' + '/:token'}
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
        path={getLocalRoute('app_leaderboard') + '/:section' + '/:subSection'}
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
      <Route path={getLocalRoute('app_privacy')} component={PrivacyContainer} />
      <Route path={getLocalRoute('app_imprint')} component={ImprintContainer} />
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
  );
};

export default Routes;
