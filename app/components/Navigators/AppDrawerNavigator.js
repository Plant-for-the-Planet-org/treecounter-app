import React from 'react';
import { Animated } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { getLocalRoute } from '../../actions/apiRouting';
import ConfirmProfileDeletionModal from '../../components/EditUserProfile/ConfirmProfileDeletionModal';
import CountriesLeaderBoard from '../../components/LeaderboardRefresh/Countries/CountriesLeaderBoard';
import CountryDetails from '../../components/LeaderboardRefresh/Countries/CountryDetails';
import WelcomScreenSlider from '../../components/Welcome/WelcomeSlider';
import AboutUsContainer from '../../containers/AboutUs';
import ActivateAccountContainer from '../../containers/Authentication/ActivateAccountContainer';
import SelectedPlantProjectContainer from '../../containers/SelectedPlantProject';
import SelectedCompetitionContainer from './../Competition/containers/SelectedCompetition';
import SelectPlantProjectContainer from '../../containers/SelectPlantProject';
import EmailSentContainer from '../../containers/Authentication/EmailSentContainer';
import ForgotPasswordContainer from '../../containers/Authentication/ForgotPasswordContainer';
import LoginContainer from '../../containers/Authentication/LoginContainer';
import ResetPasswordContainer from '../../containers/Authentication/ResetPasswordContainer';
import SignUpContainer from '../../containers/Authentication/SignUpContainer';
import DonationTreesContainer from '../../containers/DonateTrees/index.native';
import DonationStep3 from '../../containers/DonateTrees/PaymentDetails.native';
import EditUserContributionContainer from '../../containers/EditUserContribution';
import EditUserProfileContainer from '../../containers/EditUserProfile';
import FAQContainer from '../../containers/FAQ';
import GiftTreesContainer from '../../containers/GiftTrees';
import NewBottomNavigator from '../../containers/Menu/NewBottomNavigator';
import SideMenuContainer from '../../containers/Menu/SideMenuContainer';
import PublicTreeCounterContainer from '../../containers/PublicTreeCounterContainer';
import ImprintContainer from '../../containers/Imprint';
import PrivacyContainer from '../../containers/Privacy';
import CompetitionContainer from './../Competition/containers/CompetitionContainer';
import ChallengeContainer from '../../containers/Challenge/createChallenge';
import EditCompetitionContainer from './../Competition/containers/EditCompetition';
import SuccessfullActivatedContainer from '../../containers/Authentication/SuccessfullActivatedContainer';
import createCompeition from '../Competition/screens/createCompetition.native';
import RedemptionContainer from '../../containers/RedemptionContainer/index.native';
import RegisterTreesContainer from '../../containers/RegisterTrees';
import TargetContainer from '../../containers/TargetContainer';
import UserContributionsContainer from '../../containers/UserContributions';
import UserContributionsDetailsContainer from '../../containers/UserContributionsDetails';
import UserHomeContainer from '../../containers/UserHome';
import { debug } from '../../debug';
import i18n from '../../locales/i18n';
import styles from '../../styles/header.native';
import colors from '../../utils/constants';
import LicenseInfoList from '../AboutUs/LicenseInfoList';
import DonateThankYou from '../DonateTrees/screens/DonateThankyou.native';
import ProfilePickerModal from '../EditUserProfile/dedicate-trees/ProfilePickerModal';
import BurgerMenu from '../Header/BurgerMenu';
import HeaderRight from '../Header/HeaderFields';
import SearchLayout from '../Header/SearchLayout';
import CompaniesLeaderBoard from '../LeaderboardRefresh/Companies/CompaniesLeaderBoard';
import IndividualsLeaderBoard from '../LeaderboardRefresh/Individuals/IndividualsLeaderBoard';
import SchoolsLeaderBoard from '../LeaderboardRefresh/Schools/SchoolsLeaderBoard';
import tpoLeaderBoard from '../LeaderboardRefresh/TPOs/tpoLeaderBoard';
import GiftEmail from '../NewGiftTrees/components/GiftEmail.native';
import GiftMessage from '../NewGiftTrees/components/GiftMessage.native';
import SelectContacts from '../NewGiftTrees/components/SelectContacts.native';
import PDFViewer from '../PDFViewer';
import AddTrees from '../Redemption/app/AddTrees.native';
import Trillion from '../TreecounterGraphics/Trillion';
import DonorDetails from './../../containers/DonateTrees/DonorDetails.native';
import PledgeEvents from './../../containers/Pledge';
import MakePledgeForm from './../PledgeEvents/MakePledgeForm.native';
import UpdatePledgeEvent from './../PledgeEvents/UpdatePledgeEvent.native';
import AddReview from './../Reviews/AddReview/AddReview';
import Reviews from './../Reviews/Reviews';


import FullMapComponent from './../UserHome/FullMapComponent';
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
  [getLocalRoute('app_selectedProject')]: 'label.project',
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
  ['app_gift_projects']: 'label.gift_trees',
  ['pickup_profile_modal']: 'label.dedicate_trees_to',
  ['app_pledge_events']: 'label.pledges',
  ['app_create_competition']: '',
  ['app_unfulfilled_pledge_events']: 'label.pledges',
  ['app_pledge_form']: 'label.pledgeToPlant',
  ['app_pledge_update_form']: 'label.updatePledge'
};

export const getAppNavigator = function (isLoggedIn, userProfile) {
  const searchNavigator = createStackNavigator(
    {
      Search: {
        screen: () => (
          <SearchLayout searchInputUnderlineColorAndroid={colors.WHITE} />
        )
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
  const getTitle = function (navigation) {
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
      debug(err);
    }

    return title;
  };

  const ApptabNavigator = createBottomTabNavigator(
    {
      [getLocalRoute('app_homepage')]: {
        screen: Trillion
      },
      [getLocalRoute('app_giftTrees')]: {
        screen: GiftTreesContainer,
        navigationOptions: { tabBarVisible: false },
        path: 'gift-trees/'
      },
      [getLocalRoute('app_donateTrees')]: {
        screen: SelectPlantProjectContainer
      },
      [getLocalRoute('app_competitions')]: {
        screen: isLoggedIn ? CompetitionContainer : LoginContainer
      },
      [getLocalRoute('app_userHome')]: {
        screen: isLoggedIn ? () => <UserHomeContainer isLoggedIn={isLoggedIn} /> : LoginContainer,
        navigationOptions: ({ navigation }) => ({ tabBarVisible: isLoggedIn ? navigation.state.params ? navigation.state.params.isFullMapComponentModal ? false : true : true : true })
      }
    },
    {
      tabBarOptions: {
        tabBarPosition: 'bottom',
        animatedEnable: true,
        swipeEnable: false
      },
      tabBarComponent: NewBottomNavigator
    }
  );

  const appStackNavigator = createStackNavigator(
    {
      Tab: {
        screen: ApptabNavigator,
        navigationOptions: { header: null }
      },
      [getLocalRoute('app_editProfile')]: {
        screen: isLoggedIn ? EditUserProfileContainer : LoginContainer,
        navigationOptions: { header: null }
      },
      [getLocalRoute('app_passwordSent')]: {
        screen: EmailSentContainer
      },
      [getLocalRoute('app_signup')]: {
        screen: SignUpContainer,
        path: 'signup'
      },
      [getLocalRoute('app_myTrees')]: {
        screen: UserContributionsContainer
      },
      ['my_trees_fullMap']: {
        screen: FullMapComponent,
        navigationOptions: { header: null }
      },
      [getLocalRoute('app_forgotPassword')]: {
        screen: ForgotPasswordContainer
      },
      [getLocalRoute('app_accountActivation')]: {
        screen: ActivateAccountContainer
      },
      ['pickup_profile_modal']: {
        screen: ProfilePickerModal,
        navigationOptions: { header: null }
      },
      ['about_us']: {
        screen: AboutUsContainer,
        navigationOptions: { header: null }
      },
      ['license_info_list']: {
        screen: LicenseInfoList,
        navigationOptions: { header: null }
      },

      ['select_contacts_gift']: {
        screen: SelectContacts,
        navigationOptions: { header: null }
      },
      ['gift_user_email']: {
        screen: GiftEmail,
        navigationOptions: { header: null }
      },
      [getLocalRoute('app_imprint')]: {
        screen: ImprintContainer,
        navigationOptions: { header: null }
      },
      [getLocalRoute('app_privacy')]: {
        screen: PrivacyContainer,
        navigationOptions: { header: null }
      },
      [getLocalRoute('app_editTrees')]: {
        screen: EditUserContributionContainer
      },
      [getLocalRoute('app_target')]: {
        screen: isLoggedIn ? TargetContainer : LoginContainer,
        navigationOptions: { header: null },
        path: 'target'
      },
      [getLocalRoute('app_challenge')]: {
        screen: ChallengeContainer,
        navigationOptions: { header: null }
      },
      ['app_gift_projects']: {
        screen: SelectPlantProjectContainer,
        navigationOptions: { header: null }
      },
      [getLocalRoute('app_accountActivate')]: {
        screen: SuccessfullActivatedContainer,
        path: getLocalRoute('app_accountActivate') + '/:token'
      },
      [getLocalRoute('app_resetPassword')]: {
        screen: ResetPasswordContainer,
        path: getLocalRoute('app_resetPassword') + '/:token'
      },
      ['app_create_competition']: {
        screen: createCompeition,
        navigationOptions: { header: null }
      },
      ['app_supportTrees']: {
        screen: SelectPlantProjectContainer,
        navigationOptions: { header: null },
        path: 'support/:treecounterSlug'
      },
      [getLocalRoute('app_selectProject')]: {
        screen: SelectPlantProjectContainer,
        navigationOptions: { header: null }
      },
      [getLocalRoute('app_selectedProject')]: {
        screen: SelectedPlantProjectContainer,
        navigationOptions: { header: null },
        path: 'project/:projectSlug'
      },
      [getLocalRoute('app_competition')]: {
        screen: isLoggedIn ? SelectedCompetitionContainer : LoginContainer
      },
      [getLocalRoute('app_faq')]: {
        screen: FAQContainer
      },
      [getLocalRoute('app_editCompetition')]: {
        screen: isLoggedIn ? EditCompetitionContainer : LoginContainer,
        navigationOptions: { header: null }
      },
      ['app_donate_detail']: {
        screen: DonationTreesContainer,
        path: 'donate-trees/:slug'
      },
      ['donor_details_form']: {
        screen: DonorDetails,
        navigationOptions: { header: null }
      },
      ['payment_details_form']: {
        screen: DonationStep3,
        navigationOptions: { header: null }
      },
      ['app_pledge_events']: {
        screen: PledgeEvents
      },
      [getLocalRoute('app_treecounter')]: {
        screen: PublicTreeCounterContainer,
        navigationOptions: { header: null }
      },
      ['app_registerTrees']: {
        screen: isLoggedIn ? RegisterTreesContainer : LoginContainer,
        navigationOptions: { header: null }
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
        screen: AddReview,
        navigationOptions: { header: null }
      },
      ['app_view_pdf']: {
        screen: PDFViewer
      },
      ['app_pledge_update_form']: {
        screen: UpdatePledgeEvent
      },
      ['contribution_details']: {
        screen: UserContributionsDetailsContainer
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
      },
      ['donate_thankyou']: {
        screen: DonateThankYou,
        navigationOptions: { header: null }
      },
      ['gift_message']: {
        screen: GiftMessage,
        navigationOptions: { header: null }
      }
    },
    {
      defaultNavigationOptions: ({ navigation }) => {
        let navigationConfig = {
          headerStyle: styles.container,
          headerTitleStyle: { paddingRight: 16 },
          headerTintColor: colors.WHITE,
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
