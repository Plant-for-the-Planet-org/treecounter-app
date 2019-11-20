import {
  createBottomTabNavigator,
  createDrawerNavigator,
  createStackNavigator
} from 'react-navigation';
import React, { lazy } from 'react';
import { Animated } from 'react-native';

const Trillion = lazy(() => import('../TreecounterGraphics/Trillion'));
const LoginContainer = lazy(() =>
  import('../../containers/Authentication/LoginContainer')
);
const SignUpContainer = lazy(() =>
  import('../../containers/Authentication/SignUpContainer')
);
const ForgotPasswordContainer = lazy(() =>
  import('../../containers/Authentication/ForgotPasswordContainer')
);
const TargetContainer = lazy(() => import('../../containers/TargetContainer'));
const DonationTreesContainer = lazy(() =>
  import('../../containers/DonateTrees')
);

import { getLocalRoute } from '../../actions/apiRouting';
import styles from '../../styles/header.native';

import BurgerMenu from '../Header/BurgerMenu';
import HeaderRight from '../Header/HeaderFields';

import i18n from '../../locales/i18n';

const FAQContainer = lazy(() => import('../../containers/FAQ'));
const UserContributions = lazy(() =>
  import('../../containers/UserContributions')
);
const UserHomeContainer = lazy(() => import('../../containers/UserHome'));
const SearchLayout = lazy(() => import('../Header/SearchLayout'));
const AboutUsContainer = lazy(() => import('../../containers/AboutUs'));
const UserContributionDetails = lazy(() =>
  import('../../containers/UserContributionsDetails')
);
const ConfirmProfileDeletionModal = lazy(() =>
  import('../../components/EditUserProfile/ConfirmProfileDeletionModal')
);
const ConfirmContributionDeletionModal = lazy(() =>
  import('../../components/UserContributions/ConfirmDelete')
);
const WelcomeScreenModal = lazy(() =>
  import('../../components/Authentication/WelcomeScreenModal')
);
const LicenseInfoList = lazy(() => import('../AboutUs/LicenseInfoList'));
const BottomTabContainer = lazy(() =>
  import('../../containers/Menu/TabContainer')
);
const GiftTrees = lazy(() => import('../../containers/GiftTrees'));
const PublicTreeCounterContainer = lazy(() =>
  import('../../containers/PublicTreeCounterContainer')
);
const RegisterTrees = lazy(() => import('../../containers/RegisterTrees'));
const EditUserContributionContainer = lazy(() =>
  import('../../containers/EditUserContribution')
);
const EditUserProfile = lazy(() => import('../../containers/EditUserProfile'));
const SideMenuContainer = lazy(() =>
  import('../../containers/Menu/SideMenuContainer')
);
const ActivateAccountContainer = lazy(() =>
  import('../../containers/Authentication/ActivateAccountContainer')
);
const SelectedPlantProject = lazy(() =>
  import('../../containers/SelectedPlantProject')
);
const SelectedCompetition = lazy(() =>
  import('../../containers/SelectedCompetition')
);
const RedemptionContainer = lazy(() =>
  import('../../containers/RedemptionContainer')
);
const SelectPlantProjectContainer = lazy(() =>
  import('../../containers/SelectPlantProject')
);
const EmailSentContainer = lazy(() =>
  import('../../containers/Authentication/EmailSentContainer')
);
const ResetPasswordContainer = lazy(() =>
  import('../../containers/Authentication/ResetPasswordContainer')
);
const ImprintContainer = lazy(() => import('../../containers/Imprint'));
const PrivacyContainer = lazy(() => import('../../containers/Privacy'));
const CompetitionContainer = lazy(() =>
  import('../../containers/CompetitionContainer')
);
const ChallengeContainer = lazy(() =>
  import('../../containers/Challenge/createChallenge')
);
const ProfilePickerModal = lazy(() =>
  import('../EditUserProfile/dedicate-trees/ProfilePickerModal')
);
const EditCompetitionContainer = lazy(() =>
  import('../../containers/EditCompetition')
);
const SuccessfullActivatedContainer = lazy(() =>
  import('../../containers/Authentication/SuccessfullActivatedContainer')
);
const PledgeEvents = lazy(() =>
  import('./../PledgeEvents/PledgeEvents.native')
);
const UnfulfilledPledgeEvents = lazy(() =>
  import('./../PledgeEvents/UnfulfilledPledgeEvent')
);
const MakePledgeForm = lazy(() =>
  import('./../PledgeEvents/MakePledgeForm.native')
);
const UpdatePledgeEvent = lazy(() =>
  import('./../PledgeEvents/UpdatePledgeEvent.native')
);

const headerLabels = {
  [getLocalRoute('app_login')]: 'label.login',
  [getLocalRoute('app_signup')]: 'label.signUp',
  [getLocalRoute('app_forgotPassword')]: 'label.forgot_ur_password',
  [getLocalRoute('app_target')]: 'label.set_target',
  [getLocalRoute('app_donateTrees')]: 'label.donate',

  [getLocalRoute('app_faq')]: 'label.faqs',
  [getLocalRoute('app_myTrees')]: 'label.my_trees',
  [getLocalRoute('app_registerTrees')]: 'label.heading_register_trees',
  [getLocalRoute('app_homepage')]: 'label.trillion_tree_campaign_app_header',
  [getLocalRoute('app_explore')]: 'label.explore',
  [getLocalRoute('app_userHome')]: 'Trillion Tree Campaign',
  [getLocalRoute('app_editTrees')]: 'label.edit_trees',
  [getLocalRoute('app_editProfile')]: 'label.edit_profile',
  [getLocalRoute('app_redeem')]: 'label.redeem_trees',
  [getLocalRoute('app_competitions')]: 'label.competitions',
  [getLocalRoute('app_claim')]: 'label.claim_trees',
  [getLocalRoute('app_giftTrees')]: 'label.gift_trees',
  [getLocalRoute('app_selectProject')]: 'label.donate',
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
  ['app_pledge_events']: 'Pledges',
  ['app_create_competition']: '',
  ['app_unfulfilled_pledge_events']: 'Pledges',
  ['app_pledge_form']: 'Pledge to plant a tree',
  ['app_pledge_update_form']: 'Update your pledge'
};

export const getAppNavigator = function(isLoggedIn, userProfile) {
  const baseNavigator = createStackNavigator(
    {
      [getLocalRoute('app_editProfile')]: {
        screen: isLoggedIn ? EditUserProfile : LoginContainer
      },
      [getLocalRoute('app_login')]: {
        screen: LoginContainer
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
      [getLocalRoute('app_faq')]: FAQContainer,
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
      [getLocalRoute('app_redeem')]: {
        screen: RedemptionContainer
      },
      [getLocalRoute('app_claim')]: {
        screen: RedemptionContainer
      },
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
      navigationOptions: (/*{ navigation }*/) => {
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
      ['welcome_screen']: { screen: WelcomeScreenModal }
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
      Tab: ApptabNavigator,
      Base: baseNavigator,
      [getLocalRoute('app_selectProject')]: {
        screen: SelectedPlantProject
      },
      [getLocalRoute('app_competition')]: {
        screen: isLoggedIn ? SelectedCompetition : LoginContainer
      },
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
      ['app_pledge_update_form']: {
        screen: UpdatePledgeEvent
      },
      ['app_unfulfilled_pledge_events']: {
        screen: UnfulfilledPledgeEvents
      }
    },
    {
      navigationOptions: ({ navigation }) => {
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
      appStackNavigator,
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
  return AppNavigator;
};
