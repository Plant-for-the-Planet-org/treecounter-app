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
import EditUserContributionContainer from '../../containers/EditUserContribution';
import AboutUsContainer from '../../containers/AboutUs';
import LicenseInfoList from '../AboutUs/LicenseInfoList.native';
import TabContainer from './TabContainer';
import Menu from '../Menu';
import DonateTrees from '../../containers/DonateTrees';
import PublicTreeCounterContainer from '../../containers/PublicTreeCounterContainer';
import { withNavigation } from 'react-navigation';

const headerLabels = {
  [getLocalRoute('app_login')]: 'label.login',
  [getLocalRoute('app_signup')]: 'label.signUp',
  [getLocalRoute('app_forgotPassword')]: 'label.forgot_ur_password',
  [getLocalRoute('app_target')]: 'label.set_target',
  [getLocalRoute('app_donateTrees')]: 'label.donate_trees',
  [getLocalRoute('app_faq')]: 'label.faqs',
  [getLocalRoute('app_myTrees')]: 'label.my_trees',
  [getLocalRoute('app_registerTrees')]: 'label.heading_register_trees',
  [getLocalRoute('app_homepage')]: 'World',
  [getLocalRoute('app_userHome')]: 'Me',
  ['about_us']: 'label.about_us',
  ['tab-navigation']: 'Tab Navigation',
  ['license_info_list']: 'label.open_source_license'
};

export const getAppNavigator = function(isLoggedIn) {
  const baseNavigator = createStackNavigator(
    {
      [getLocalRoute('app_login')]: {
        screen: LoginContainer
      },

      [getLocalRoute('app_signup')]: {
        screen: SignUpContainer
      },

      [getLocalRoute('app_userHome')]: {
        screen: isLoggedIn ? UserHomeContainer : LoginContainer
      },

      [getLocalRoute('app_forgotPassword')]: {
        screen: ForgotPasswordContainer
      },

      [getLocalRoute('app_faq')]: FAQContainer,
      [getLocalRoute('app_treecounter')]: Trillion,

      ['about_us']: { screen: AboutUsContainer },

      ['license_info_list']: { screen: LicenseInfoList }
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

  const ApptabNavigator = createBottomTabNavigator(
    {
      [getLocalRoute('app_userHome')]: {
        screen: isLoggedIn ? UserHomeContainer : LoginContainer
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
      [getLocalRoute('app_homepage')]: {
        screen: Trillion
      },
      [getLocalRoute('app_forgotPassword')]: {
        screen: ForgotPasswordContainer
      },
      [getLocalRoute('app_signup')]: {
        screen: SignUpContainer
      }
    },
    {
      tabBarOptions: {
        initialRouteName: isLoggedIn
          ? getLocalRoute('app_userHome')
          : getLocalRoute('app_homepage'),
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
      Base: baseNavigator
    },
    {
      navigationOptions: ({ navigation }) => {
        console.log('navigation options', navigation);
        let title = navigation.getParam('titleParam');
        let navigationConfig = {
          headerStyle: styles.container,
          headerTintColor: '#fff',
          headerBackTitle: null,
          title:
            title != undefined
              ? title
              : i18n.t(headerLabels[navigation.state.routeName])
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
      contentComponent: Menu
    }
  );
  return AppNavigator;
};
