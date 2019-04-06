import {
  createBottomTabNavigator,
  createDrawerNavigator,
  createStackNavigator
} from 'react-navigation';
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
import ConfirmProfileDeletionModal from '../../components/EditUserProfile/ConfirmProfileDeletionModal';
import WelcomeScreenModal from '../../components/Authentication/WelcomeScreenModal';
import LicenseInfoList from '../AboutUs/LicenseInfoList';
import BottomTabContainer from '../../containers/Menu/TabContainer';
import GiftTrees from '../../containers/GiftTrees';
import LeaderBoard from '../Leaderboard';
import PublicTreeCounterContainer from '../../containers/PublicTreeCounterContainer';
import RegisterTrees from '../../containers/RegisterTrees';
import EditUserContributionContainer from '../../containers/EditUserContribution';
import EditUserProfile from '../../containers/EditUserProfile';
import SideMenuContainer from '../../containers/Menu/SideMenuContainer';
import ActivateAccountContainer from '../../containers/Authentication/ActivateAccountContainer';
import SelectedPlantProject from '../../containers/SelectedPlantProject';
import RedemptionContainer from '../../containers/RedemptionContainer';
import SelectPlantProjectContainer from '../../containers/SelectPlantProject';
import EmailSentContainer from '../../containers/Authentication/EmailSentContainer';
import ImprintContainer from '../../containers/Imprint';
import PrivacyContainer from '../../containers/Privacy';
import ChallengeContainer from '../../containers/Challenge/createChallenge';

const headerLabels = {
  [getLocalRoute('app_login')]: 'label.login',
  [getLocalRoute('app_signup')]: 'label.signUp',
  [getLocalRoute('app_forgotPassword')]: 'label.forgot_ur_password',
  [getLocalRoute('app_target')]: 'label.set_target',
  [getLocalRoute('app_donateTrees')]: 'label.donate',

  [getLocalRoute('app_faq')]: 'label.faqs',
  [getLocalRoute('app_myTrees')]: 'label.my_trees',
  [getLocalRoute('app_registerTrees')]: 'label.heading_register_trees',
  [getLocalRoute('app_homepage')]: 'World',
  [getLocalRoute('app_explore')]: 'label.explore',
  [getLocalRoute('app_userHome')]: 'Trillion Tree Campaign',
  [getLocalRoute('app_editTrees')]: 'label.edit_trees',
  [getLocalRoute('app_editProfile')]: 'label.edit_profile',
  [getLocalRoute('app_redeem')]: 'label.redeem_trees',
  [getLocalRoute('app_claim')]: 'label.claim_trees',
  [getLocalRoute('app_giftTrees')]: 'label.gift_trees',
  [getLocalRoute('app_selectProject')]: 'label.donate',
  [getLocalRoute('app_imprint')]: 'label.imprint',
  [getLocalRoute('app_privacy')]: 'label.data_protection',
  ['about_us']: 'label.about_us',
  ['tab-navigation']: 'Tab Navigation',
  ['license_info_list']: 'label.open_source_license',
  ['delete_profile_confirm']: 'label.delete_profile',
  ['app_donate_detail']: 'label.donate',
  ['app_gift_projects']: 'label.gift_trees'
};

export const getAppNavigator = function(isLoggedIn, userProfile) {
  const baseNavigator = createStackNavigator(
    {
      [getLocalRoute('app_editProfile')]: {
        screen: isLoggedIn ? EditUserProfile : LoginContainer
      },
      [getLocalRoute('app_userHome')]: {
        screen: isLoggedIn ? UserHomeContainer : Trillion
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
      [getLocalRoute('app_forgotPassword')]: {
        screen: ForgotPasswordContainer
      },
      [getLocalRoute('app_accountActivation')]: {
        screen: ActivateAccountContainer
      },
      [getLocalRoute('app_faq')]: FAQContainer,
      [getLocalRoute('app_treecounter')]: PublicTreeCounterContainer,

      ['about_us']: { screen: AboutUsContainer },

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
      }
    },
    {
      headerMode: 'none',
      navigationOptions: ({ navigation }) => {
        header: null;
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
          title = i18n.t(
            headerLabels[navigation.state.routes[index].routeName]
          );
          if (navigation.state.routes[index].hasOwnProperty('params')) {
            const childTitle = navigation.state.routes[index].params.titleParam;

            if (childTitle) {
              title = childTitle;
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
      ['app_donate_detail']: {
        screen: DonationTreesContainer
      }
    },
    {
      navigationOptions: ({ navigation }) => {
        let navigationConfig = {
          headerStyle: styles.container,
          headerTitleStyle: { paddingRight: 12 },
          headerTintColor: '#fff',
          headerBackTitle: null,
          title: getTitle(navigation)
        };
        // if (homeRoutes.includes(navigation.state.routeName)) {
        navigationConfig.headerRight = HeaderRight(navigation, userProfile);
        // }
        // if (
        //   navigation.state.routeName === getLocalRoute('app_userHome') ||
        //   (navigation.state.routeName === getLocalRoute('app_homepage') &&
        //     !isLoggedIn)
        // ) {
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
