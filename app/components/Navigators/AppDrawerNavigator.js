import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import React from 'react';
import { Animated } from 'react-native';
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
import UserContributions from '../../containers/UserContributions';
import UserHomeContainer from '../../containers/UserHome';
import SearchLayout from '../Header/SearchLayout';
import AboutUsContainer from '../../containers/AboutUs';
import UserContributionDetails from '../../containers/UserContributionsDetails';
import ConfirmProfileDeletionModal from '../../components/EditUserProfile/ConfirmProfileDeletionModal';
import ConfirmContributionDeletionModal from '../../components/UserContributions/ConfirmDelete';
import WelcomScreenSlider from '../../components/Welcome/WelcomeSlider';
import LicenseInfoList from '../AboutUs/LicenseInfoList';
import BottomTabContainer from '../../containers/Menu/TabContainer';
import GiftTrees from '../../containers/GiftTrees';
import PublicTreeCounterContainer from '../../containers/PublicTreeCounterContainer';
import RegisterTrees from '../../containers/RegisterTrees';
import EditUserContributionContainer from '../../containers/EditUserContribution';
import EditUserProfile from '../../containers/EditUserProfile';
import SideMenuContainer from '../../containers/Menu/SideMenuContainer';
import ActivateAccountContainer from '../../containers/Authentication/ActivateAccountContainer';
import SelectedPlantProject from '../../containers/SelectedPlantProject';
import SelectedCompetition from '../../containers/SelectedCompetition';
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
const headerLabels = {
  [getLocalRoute('app_login')]: 'label.login',
  [getLocalRoute('app_signup')]: 'label.signUp',
  [getLocalRoute('app_forgotPassword')]: 'label.forgot_ur_password',
  [getLocalRoute('app_target')]: 'label.set_target',
  [getLocalRoute('app_donateTrees')]: 'label.projects',
  [getLocalRoute('app_faq')]: 'label.faqs',
  [getLocalRoute('app_myTrees')]: 'label.my_trees',
  [getLocalRoute('app_registerTrees')]: 'label.heading_register_trees',
  [getLocalRoute('app_homepage')]: 'label.trillion_tree_campaign_app_header',
  [getLocalRoute('app_explore')]: 'label.explore',
  [getLocalRoute('app_userHome')]: 'Trillion Tree Campaign',
  [getLocalRoute('app_editTrees')]: 'label.edit_trees',
  [getLocalRoute('app_editProfile')]: 'label.edit_profile',
  [getLocalRoute('app_competitions')]: 'label.competitions',
  [getLocalRoute('app_claim')]: 'label.claim_trees',
  [getLocalRoute('app_giftTrees')]: 'label.gift_trees',
  [getLocalRoute('app_selectProject')]: 'label.projects',
  [getLocalRoute('app_competition')]: '',
  [getLocalRoute('app_editCompetition')]: '',
  [getLocalRoute('app_imprint')]: 'label.imprint',
  [getLocalRoute('app_privacy')]: 'label.data_protection',
  [getLocalRoute('app_challenge')]: 'label.challenge_heading',
  [getLocalRoute('app_resetPassword')]: 'label.reset_ur_password',
  ['about_us']: 'label.about_us',
  ['tab-navigation']: 'Tab Navigation',
  ['license_info_list']: 'label.open_source_license',
  ['delete_profile_confirm']: 'label.delete_profile',
  ['delete_contribution']: 'label.delete_contribution',
  ['app_donate_detail']: 'label.donate',
  ['app_gift_projects']: 'label.gift_trees',
  ['pickup_profile_modal']: 'label.dedicate_trees_to',
  ['app_pledge_events']: 'label.pledges',
  ['app_create_competition']: '',
  ['app_unfulfilled_pledge_events']: 'label.pledges',
  ['app_pledge_form']: 'label.pledgeToPlant',
  ['app_pledge_update_form']: 'label.updatePledge'
};

export const getAppNavigator = function(isLoggedIn, userProfile) {
  const baseNavigator = createStackNavigator(
    {
      [getLocalRoute('app_editProfile')]: {
        screen: isLoggedIn ? EditUserProfile : LoginContainer
      },
      [getLocalRoute('app_passwordSent')]: {
        screen: EmailSentContainer
      },
      [getLocalRoute('app_signup')]: {
        screen: SignUpContainer
      },
      [getLocalRoute('app_myTrees')]: {
        screen: UserContributions
      },
      [getLocalRoute('app_forgotPassword')]: {
        screen: ForgotPasswordContainer
      },
      [getLocalRoute('app_accountActivation')]: {
        screen: ActivateAccountContainer
      },
      ['pickup_profile_modal']: ProfilePickerModal,
      [getLocalRoute('app_treecounter')]: PublicTreeCounterContainer,
      ['about_us']: { screen: AboutUsContainer },
      ['contribution_details']: { screen: UserContributionDetails },
      ['license_info_list']: { screen: LicenseInfoList },
      [getLocalRoute('app_imprint')]: {
        screen: ImprintContainer
      },
      [getLocalRoute('app_privacy')]: {
        screen: PrivacyContainer
      },
      // [getLocalRoute('app_claim')]: {
      //   screen: RedemptionContainer
      // },
      [getLocalRoute('app_editTrees')]: EditUserContributionContainer,
      [getLocalRoute('app_target')]: {
        screen: isLoggedIn ? TargetContainer : LoginContainer
      },
      [getLocalRoute('app_challenge')]: ChallengeContainer,
      ['app_gift_projects']: {
        screen: SelectPlantProjectContainer
      },
      [getLocalRoute('app_accountActivate')]: {
        screen: SuccessfullActivatedContainer,
        path: getLocalRoute('app_accountActivate') + '/:token'
      },
      [getLocalRoute('app_resetPassword')]: {
        screen: ResetPasswordContainer,
        path: getLocalRoute('app_resetPassword') + '/:token'
      },
      ['app_pledge_events']: {
        screen: PledgeEvents
      },
      ['app_pledge_form']: {
        screen: MakePledgeForm
      },
      ['app_create_competition']: {
        screen: createCompeition
      }
    },
    {
      headerMode: 'none',
      defaultNavigationOptions: (/*{ navigation }*/) => {
        return {
          header: null
        };
      }
    }
  );
  const searchNavigator = createStackNavigator(
    {
      Search: {
        screen: () => <SearchLayout searchInputUnderlineColorAndroid="#fff" />
      }
    },
    {
      headerMode: 'none',
      transitionConfig: () => ({
        transitionSpec: {
          duration: 0,
          timing: Animated.timing
        }
      }),
      navigationOptions: {
        gesturesEnabled: false
      }
    }
  );
  const deleteProfileNavigator = createStackNavigator(
    {
      ['delete_profile_confirm']: { screen: ConfirmProfileDeletionModal }
    },
    {
      headerMode: 'none',
      transitionConfig: () => ({
        transitionSpec: {
          duration: 0,
          timing: Animated.timing
        }
      }),
      navigationOptions: {
        gesturesEnabled: false
      }
    }
  );
  const deleteContributionNavigator = createStackNavigator(
    {
      ['delete_contribution']: {
        screen: ConfirmContributionDeletionModal
      }
    },
    {
      headerMode: 'none',
      transitionConfig: () => ({
        transitionSpec: {
          duration: 0,
          timing: Animated.timing
        }
      }),
      navigationOptions: {
        gesturesEnabled: false
      }
    }
  );
  const welcomeScreenNavigator = createStackNavigator(
    {
      ['welcome_screen']: { screen: WelcomScreenSlider }
    },
    {
      headerMode: 'none',
      transitionConfig: () => ({
        transitionSpec: {
          duration: 0,
          timing: Animated.timing
        }
      }),
      navigationOptions: {
        gesturesEnabled: false
      }
    }
  );
  const getTitle = function(navigation) {
    let title = navigation.getParam('titleParam');
    try {
      if (!title) {
        title = i18n.t(headerLabels[navigation.state.routeName]);
      }
      if (!title) {
        const index = navigation.state.index;
        if (
          index > -1 &&
          navigation.state.routes &&
          navigation.state.routes.length > 0
        ) {
          const route = navigation.state.routes[index];
          if (route.routeName === '/home') {
            title = userProfile.fullname;
          } else {
            title = i18n.t(headerLabels[route.routeName]);
            if (route.params) {
              const childTitle = route.params.titleParam;
              if (childTitle) {
                title = childTitle;
              }
            }
          }
        }
      }
    } catch (err) {
      console.log(err);
    }

    return title;
  };

  const ApptabNavigator = createBottomTabNavigator(
    {
      [getLocalRoute('app_homepage')]: {
        screen: Trillion
      },
      [getLocalRoute('app_userHome')]: {
        screen: isLoggedIn ? UserHomeContainer : LoginContainer
      },
      [getLocalRoute('app_registerTrees')]: {
        screen: isLoggedIn ? RegisterTrees : LoginContainer
      },
      [getLocalRoute('app_competitions')]: {
        screen: isLoggedIn ? CompetitionContainer : LoginContainer
      },
      [getLocalRoute('app_donateTrees')]: {
        screen: SelectPlantProjectContainer
      },
      [getLocalRoute('app_giftTrees')]: {
        screen: GiftTrees
      }
    },
    {
      tabBarOptions: {
        tabBarPosition: 'bottom',
        animatedEnable: true,
        swipeEnable: false
      },
      tabBarComponent: BottomTabContainer
    }
  );

  const appStackNavigator = createStackNavigator(
    {
      Tab: {
        screen: ApptabNavigator,
        navigationOptions: { header: null }
      },
      Base: baseNavigator,
      ['app_supportTrees']: {
        screen: SelectPlantProjectContainer
      },
      [getLocalRoute('app_selectProject')]: {
        screen: SelectedPlantProject
      },
      [getLocalRoute('app_competition')]: {
        screen: isLoggedIn ? SelectedCompetition : LoginContainer
      },
      [getLocalRoute('app_faq')]: FAQContainer,

      [getLocalRoute('app_editCompetition')]: {
        screen: isLoggedIn ? EditCompetitionContainer : LoginContainer
      },
      ['app_donate_detail']: {
        screen: DonationTreesContainer
      },
      ['app_pledge_events']: {
        screen: PledgeEvents
      },
      ['app_pledge_form']: {
        screen: MakePledgeForm
      },
      ['app_reviews']: {
        screen: Reviews
      },
      [getLocalRoute('app_login')]: {
        screen: LoginContainer
      },
      ['app_add_review']: {
        screen: AddReview
      },
      ['app_view_pdf']: {
        screen: PDFViewer
      },
      ['app_pledge_update_form']: {
        screen: UpdatePledgeEvent
      },
      ['app_unfulfilled_pledge_events']: {
        screen: UnfulfilledPledgeEvents
      },
      ['app_redeem']: {
        screen: isLoggedIn ? RedemptionContainer : LoginContainer,
        path: 'redeem/:type/:code'
      },
      ['app_claim']: {
        screen: isLoggedIn ? RedemptionContainer : LoginContainer,
        path: 'claim/:type/:code'
      },
      ['redeem_add_trees']: {
        screen: AddTrees
      },
      ['countries_leaderboard']: {
        screen: CountriesLeaderBoard,
        navigationOptions: { header: null }
      },
      ['country_details_leaderboard']: {
        screen: CountryDetails,
        navigationOptions: { header: null }
      },
      ['companies_leaderboard']: {
        screen: CompaniesLeaderBoard,
        navigationOptions: { header: null }
      },
      ['schools_leaderboard']: {
        screen: SchoolsLeaderBoard,
        navigationOptions: { header: null }
      },
      ['individuals_leaderboard']: {
        screen: IndividualsLeaderBoard,
        navigationOptions: { header: null }
      },
      ['tpo_LeaderBoard']: {
        screen: tpoLeaderBoard,
        navigationOptions: { header: null }
      }
    },
    {
      defaultNavigationOptions: ({ navigation }) => {
        let navigationConfig = {
          headerStyle: styles.container,
          headerTitleStyle: { paddingRight: 16 },
          headerTintColor: '#fff',
          headerBackTitle: null,
          title: getTitle(navigation),
          headerRight: (
            <HeaderRight navigation={navigation} userProfile={userProfile} />
          )
        };

        if (navigation.state.routeName === 'Tab') {
          navigationConfig.headerLeft = <BurgerMenu navigation={navigation} />;
        }
        return navigationConfig;
      }
    }
  );

  const AppNavigator = createDrawerNavigator(
    {
      appStackNavigator: {
        screen: appStackNavigator,
        path: ''
      },
      searchNavigator: searchNavigator,
      deleteProfileNavigator,
      deleteContributionNavigator,
      welcomeScreenNavigator
    },
    {
      initialRouteName: 'appStackNavigator',
      gesturesEnabled: false,
      contentComponent: SideMenuContainer
    }
  );
  return createAppContainer(AppNavigator);
};
