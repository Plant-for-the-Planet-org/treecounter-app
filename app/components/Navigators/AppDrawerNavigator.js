import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Drawer Navigator Screens
import WelcomScreenSlider from '../../components/Welcome/WelcomeSlider';
import SearchLayout from '../Header/SearchLayout';
import ConfirmProfileDeletionModal from '../../components/EditUserProfile/ConfirmProfileDeletionModal';

import Trillion from '../TreecounterGraphics/Trillion';
import LoginContainer from '../../containers/Authentication/LoginContainer';
import SignUpContainer from '../../containers/Authentication/SignUpContainer';
import ForgotPasswordContainer from '../../containers/Authentication/ForgotPasswordContainer';
import TargetContainer from '../../containers/TargetContainer';
import DonationTreesContainer from '../../containers/DonateTrees';
import { getLocalRoute } from '../../actions/apiRouting';
import styles from '../../styles/header.native';
import BurgerMenu from '../Header/BurgerMenu';
import HeaderRight from '../Header/HeaderFields';
import i18n from '../../locales/i18n';
import FAQContainer from '../../containers/FAQ';
import UserContributionsContainer from '../../containers/UserContributions';
import UserHomeContainer from '../../containers/UserHome';
import AboutUsContainer from '../../containers/AboutUs';
import UserContributionsDetailsContainer from '../../containers/UserContributionsDetails';
import LicenseInfoList from '../AboutUs/LicenseInfoList';
import NewBottomNavigator from '../../containers/Menu/NewBottomNavigator';
import GiftTreesContainer from '../../containers/GiftTrees';
import PublicTreeCounterContainer from '../../containers/PublicTreeCounterContainer';
import EditUserContributionContainer from '../../containers/EditUserContribution';
import EditUserProfileContainer from '../../containers/EditUserProfile';
import SideMenuContainer from '../../containers/Menu/SideMenuContainer';
import ActivateAccountContainer from '../../containers/Authentication/ActivateAccountContainer';
import SelectedPlantProjectContainer from '../../containers/SelectedPlantProject';
import SelectedCompetitionContainer from '../../containers/SelectedCompetition';
import SelectPlantProjectContainer from '../../containers/SelectPlantProject';
import EmailSentContainer from '../../containers/Authentication/EmailSentContainer';
import ResetPasswordContainer from '../../containers/Authentication/ResetPasswordContainer';
import ImprintContainer from '../../containers/Imprint';
import PrivacyContainer from '../../containers/Privacy';
import CompetitionContainer from '../../containers/CompetitionContainer';
import ChallengeContainer from '../../containers/Challenge/createChallenge';
import ProfilePickerModal from '../EditUserProfile/dedicate-trees/ProfilePickerModal';
import EditCompetitionContainer from '../../containers/EditCompetition';
import SuccessfullActivatedContainer from '../../containers/Authentication/SuccessfullActivatedContainer';
import PledgeEvents from './../PledgeEvents/PledgeEvents.native';
import UnfulfilledPledgeEvents from './../PledgeEvents/UnfulfilledPledgeEvent';
import MakePledgeForm from './../PledgeEvents/MakePledgeForm.native';
import Reviews from './../Reviews/Reviews';
import AddReview from './../Reviews/AddReview/AddReview';
import PDFViewer from '../PDFViewer';
import createCompeition from './../Competition/Tabs/createCompetition.native';
import UpdatePledgeEvent from './../PledgeEvents/UpdatePledgeEvent.native';
import RedemptionContainer from '../../containers/RedemptionContainer/index.native';
import AddTrees from '../Redemption/app/AddTrees.native';
import CountriesLeaderBoard from '../../components/LeaderboardRefresh/Countries/CountriesLeaderBoard';
import CountryDetails from '../../components/LeaderboardRefresh/Countries/CountryDetails';
import CompaniesLeaderBoard from '../LeaderboardRefresh/Companies/CompaniesLeaderBoard';
import SchoolsLeaderBoard from '../LeaderboardRefresh/Schools/SchoolsLeaderBoard';
import IndividualsLeaderBoard from '../LeaderboardRefresh/Individuals/IndividualsLeaderBoard';
import tpoLeaderBoard from '../LeaderboardRefresh/TPOs/tpoLeaderBoard';
import RegisterTreesContainer from '../../containers/RegisterTrees';

const Stack = createStackNavigator();
const Stack1 = createStackNavigator();
const Stack2 = createStackNavigator();
const Stack3 = createStackNavigator();

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

function WelcomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name="Welcome"
        component={WelcomScreenSlider}
      />
    </Stack.Navigator>
  );
}
function deleteProfileNavigator() {
  return (
    <Stack1.Navigator>
      <Stack.Screen
        name="delete_profile_confirm"
        component={ConfirmProfileDeletionModal}
      />
    </Stack1.Navigator>
  );
}

function searchNavigator() {
  return (
    <Stack2.Navigator>
      <Stack.Screen
        name="searchNavigator"
        component={ConfirmProfileDeletionModal}
      />
    </Stack2.Navigator>
  );
}

function MyTabs(isLoggedIn) {
  return (
    <Tab.Navigator tabBar={NewBottomNavigator}>
      <Tab.Screen name="/" component={Trillion} />
      <Tab.Screen name="/gift-trees" component={GiftTreesContainer} />
      <Tab.Screen
        name="/donate-trees"
        component={SelectPlantProjectContainer}
      />
      <Tab.Screen
        name="/competitions"
        component={isLoggedIn ? CompetitionContainer : LoginContainer}
      />
      <Tab.Screen
        name="/home"
        component={isLoggedIn ? UserHomeContainer : LoginContainer}
      />
    </Tab.Navigator>
  );
}

function AppStack(isLoggedIn) {
  return (
    <Stack3.Navigator>
      <Stack3.Screen
        name="BaseNav"
        component={MyTabs}
        initialParams={{ isLoggedIn: isLoggedIn }}
        options={{ headerShown: false }}
      />

      <Stack3.Screen
        name="app_editProfile"
        component={isLoggedIn ? EditUserProfileContainer : LoginContainer}
      />
      <Stack3.Screen
        name="app_myTrees"
        component={UserContributionsContainer}
      />
      <Stack3.Screen
        name="pickup_profile_modal"
        component={ProfilePickerModal}
      />
      <Stack3.Screen
        name="app_editTrees"
        component={EditUserContributionContainer}
      />
      <Stack3.Screen
        name="app_treecounter"
        component={PublicTreeCounterContainer}
      />
      <Stack3.Screen
        name="contribution_details"
        component={UserContributionsDetailsContainer}
      />

      <Stack3.Screen
        name="app_target"
        component={isLoggedIn ? TargetContainer : LoginContainer}
      />
      <Stack3.Screen name="app_challenge" component={ChallengeContainer} />
      <Stack3.Screen
        name="app_gift_projects"
        component={SelectPlantProjectContainer}
      />
      <Stack3.Screen
        name="app_supportTrees"
        component={SelectPlantProjectContainer}
      />
      <Stack3.Screen
        name="app_selectProject"
        component={SelectedPlantProjectContainer}
      />
      <Stack3.Screen
        name="app_donate_detail"
        component={DonationTreesContainer}
      />
      <Stack3.Screen
        name="app_registerTrees"
        component={isLoggedIn ? RegisterTreesContainer : LoginContainer}
      />
      <Stack3.Screen name="app_view_pdf" component={PDFViewer} />

      <Stack3.Screen name="app_faq" component={FAQContainer} />
      <Stack3.Screen name="license_info_list" component={LicenseInfoList} />
      <Stack3.Screen name="about_us" component={AboutUsContainer} />
      <Stack3.Screen name="app_imprint" component={ImprintContainer} />
      <Stack3.Screen name="app_privacy" component={PrivacyContainer} />

      <Stack3.Screen name="app_reviews" component={Reviews} />
      <Stack3.Screen name="app_add_review" component={AddReview} />

      <Stack3.Screen
        name="app_editCompetition"
        component={isLoggedIn ? EditCompetitionContainer : LoginContainer}
      />
      <Stack3.Screen
        name="app_create_competition"
        component={createCompeition}
      />
      <Stack3.Screen
        name="app_competition"
        component={isLoggedIn ? SelectedCompetitionContainer : LoginContainer}
      />

      <Stack3.Screen
        name="app_pledge_update_form"
        component={UpdatePledgeEvent}
      />
      <Stack3.Screen
        name="app_unfulfilled_pledge_events"
        component={UnfulfilledPledgeEvents}
      />
      <Stack3.Screen name="app_pledge_form" component={MakePledgeForm} />
      <Stack3.Screen name="app_pledge_events" component={PledgeEvents} />

      <Stack3.Screen
        name="app_accountActivate"
        component={SuccessfullActivatedContainer}
      />
      <Stack3.Screen
        name="app_resetPassword"
        component={ResetPasswordContainer}
      />
      <Stack3.Screen name="app_login" component={LoginContainer} />
      <Stack3.Screen
        name="app_forgotPassword"
        component={ForgotPasswordContainer}
      />
      <Stack3.Screen
        name="app_accountActivation"
        component={ActivateAccountContainer}
      />
      <Stack3.Screen name="app_passwordSent" component={EmailSentContainer} />
      <Stack3.Screen name="app_signup" component={SignUpContainer} />

      <Stack3.Screen name="redeem_add_trees" component={AddTrees} />
      <Stack3.Screen
        name="app_redeem"
        component={isLoggedIn ? RedemptionContainer : LoginContainer}
      />
      <Stack3.Screen
        name="app_claim"
        component={isLoggedIn ? RedemptionContainer : LoginContainer}
      />

      <Stack3.Screen
        name="countries_leaderboard"
        component={CountriesLeaderBoard}
      />
      <Stack3.Screen
        name="country_details_leaderboard"
        component={CountryDetails}
      />
      <Stack3.Screen
        name="companies_leaderboard"
        component={CompaniesLeaderBoard}
      />
      <Stack3.Screen
        name="schools_leaderboard"
        component={SchoolsLeaderBoard}
      />
      <Stack3.Screen
        name="individuals_leaderboard"
        component={IndividualsLeaderBoard}
      />
      <Stack3.Screen name="tpo_LeaderBoard" component={tpoLeaderBoard} />
    </Stack3.Navigator>
  );
}

function App(isLoggedIn, userProfile) {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen
          name="welcome_screen_navigator"
          component={WelcomeStack}
        />
        <Drawer.Screen
          name="/"
          component={AppStack}
          initialParams={{ isLoggedIn: isLoggedIn }}
          options={{ headerShown: false }}
        />

        <Drawer.Screen
          name="delete_profile_navigator"
          component={deleteProfileNavigator}
        />
        <Drawer.Screen name="search_navigator" component={searchNavigator} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default App;
