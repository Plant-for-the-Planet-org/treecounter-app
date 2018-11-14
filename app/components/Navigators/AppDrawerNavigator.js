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
import SearchLayout from '../Header/SearchLayout.native';
import AboutUsContainer from '../../containers/AboutUs';
import LicenseInfoList from '../AboutUs/LicenseInfoList.native';
import TabContainer from '../../containers/Menu/TabContainer';
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
  [getLocalRoute('app_userHome')]: 'Me',
  [getLocalRoute('app_editTrees')]: 'label.edit_trees',
  [getLocalRoute('app_editProfile')]: 'label.edit_profile',
  [getLocalRoute('app_redeem')]: 'label.redeem_trees',
  [getLocalRoute('app_claim')]: 'label.claim_trees',
  [getLocalRoute('app_giftTrees')]: 'label.gift_trees',
  ['about_us']: 'label.about_us',
  ['tab-navigation']: 'Tab Navigation',
  ['license_info_list']: 'label.open_source_license'
};

export const getAppNavigator = function(isLoggedIn) {
  const baseNavigator = createStackNavigator(
    {
      [getLocalRoute('app_registerTrees')]: {
        screen: RegisterTrees
      },
      [getLocalRoute('app_editProfile')]: {
        screen: EditUserProfile
      },
      [getLocalRoute('app_userHome')]: {
        screen: isLoggedIn ? UserHomeContainer : Trillion
      },
      [getLocalRoute('app_login')]: {
        screen: LoginContainer
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

      [getLocalRoute('app_redeem')]: {
        screen: RedemptionContainer
      },
      [getLocalRoute('app_claim')]: {
        screen: RedemptionContainer
      },
      [getLocalRoute('app_editTrees')]: EditUserContributionContainer,

      [getLocalRoute('app_donateTrees')]: {
        screen: DonationTreesContainer
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
      [getLocalRoute('app_userHome')]: {
        screen: isLoggedIn ? UserHomeContainer : Trillion
      },
      [getLocalRoute('app_target')]: {
        screen: isLoggedIn ? TargetContainer : LoginContainer
      },

      [getLocalRoute('app_myTrees')]: {
        screen: isLoggedIn ? UserContributions : LoginContainer
      },
      [getLocalRoute('app_donateTrees')]: {
        screen: DonationTreesContainer
      },
      [getLocalRoute('app_selectProject')]: {
        screen: SelectedPlantProject
      },
      [getLocalRoute('app_redeem')]: {
        screen: RedemptionContainer
      },
      [getLocalRoute('app_claim')]: {
        screen: RedemptionContainer
      },
      [getLocalRoute('app_homepage')]: {
        screen: Trillion
      },

      [getLocalRoute('app_giftTrees')]: {
        screen: GiftTrees
      },
      [getLocalRoute('app_explore')]: {
        screen: LeaderBoard
      },
      [getLocalRoute('app_signup')]: {
        screen: SignUpContainer
      },
      [getLocalRoute('app_forgotPassword')]: {
        screen: ForgotPasswordContainer
      }
    },
    {
      tabBarOptions: {
        tabBarPosition: 'bottom',

        animatedEnable: true,
        swipeEnable: false
      },
      tabBarComponent: TabContainer
    }
  );

  const appStackNavigator = createStackNavigator(
    {
      Tab: ApptabNavigator,
      Base: baseNavigator,
      [getLocalRoute('app_selectProject')]: {
        screen: SelectedPlantProject
      }
    },
    {
      navigationOptions: ({ navigation }) => {
        let title = navigation.getParam('titleParam');
        let navigationConfig = {
          headerStyle: styles.container,
          headerTintColor: '#fff',
          headerBackTitle: null,
          title: getTitle(navigation)
        };
        // if (homeRoutes.includes(navigation.state.routeName)) {
        navigationConfig.headerRight = HeaderRight(navigation);
        // }
        // if (
        //   navigation.state.routeName === getLocalRoute('app_userHome') ||
        //   (navigation.state.routeName === getLocalRoute('app_homepage') &&
        //     !isLoggedIn)
        // ) {
        if (navigation.state.routeName === 'Tab') {
          navigationConfig.headerLeft = BurgerMenu(navigation);
        }
        return navigationConfig;
      }
    }
  );

  const AppNavigator = createDrawerNavigator(
    {
      appStackNavigator,
      searchNavigator: searchNavigator
    },
    {
      initialRouteName: 'appStackNavigator',
      gesturesEnabled: false,
      contentComponent: SideMenuContainer
    }
  );
  return AppNavigator;
};
