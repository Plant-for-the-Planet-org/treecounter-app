import { createDrawerNavigator, createStackNavigator } from 'react-navigation';
import React from 'react';
import { Animated } from 'react-native';
import Trillion from '../TreecounterGraphics/Trillion';
import LoginContainer from '../../containers/Authentication/LoginContainer';
import SignUpContainer from '../../containers/Authentication/SignUpContainer';
import ForgotPasswordContainer from '../../containers/Authentication/ForgotPasswordContainer';
import TargetContainer from '../../containers/TargetContainer';
import DonationTreesContainer from '../../containers/DonateTrees';

import { getLocalRoute } from '../../actions/apiRouting';
import SideMenuContainer from '../../containers/Menu/SideMenuContainer';
import styles from '../../styles/header.native';
import BurgerMenu from '../Header/BurgerMenu';
import HeaderRight from '../Header/HeaderFields';

import i18n from '../../locales/i18n';
import DonateTrees from '../../containers/DonateTrees';
import FAQContainer from '../../containers/FAQ';
import RegisterTrees from '../../containers/RegisterTrees';
import UserContributions from '../../containers/UserContributions';
import UserHomeContainer from '../../containers/UserHome';
import SearchLayout from '../Header/SearchLayout.native';
import PublicTreecounterContainer from '../../containers/PublicTreeCounterContainer';
import EditUserContributionContainer from '../../containers/EditUserContribution';
import AboutUsContainer from '../../containers/AboutUs';
import LicenseInfoList from '../AboutUs/LicenseInfoList.native';

const homeRoutes = [
  getLocalRoute('app_homepage'),
  getLocalRoute('app_userHome'),
  getLocalRoute('app_treecounter')
];
const headerLabels = {
  [getLocalRoute('app_login')]: 'label.login',
  [getLocalRoute('app_signup')]: 'label.signUp',
  [getLocalRoute('app_forgotPassword')]: 'label.forgot_ur_password',
  [getLocalRoute('app_target')]: 'label.set_target',
  [getLocalRoute('app_donateTrees')]: 'label.donate_trees',
  [getLocalRoute('app_faq')]: 'label.faqs',
  [getLocalRoute('app_faq')]: 'label.faqs',
  [getLocalRoute('app_myTrees')]: 'label.my_trees',
  [getLocalRoute('app_registerTrees')]: 'label.heading_register_trees',
  [getLocalRoute('app_editTrees')]: 'label.edit_trees',
  ['about_us']: 'label.about_us',
  ['license_info_list']: 'label.open_source_license'
};

export const getDrawerNavigator = function(isLoggedIn) {
  const baseNavigator = createStackNavigator(
    {
      [getLocalRoute('app_login')]: {
        screen: LoginContainer
      },
      [getLocalRoute('app_target')]: {
        screen: isLoggedIn ? TargetContainer : LoginContainer
      },
      [getLocalRoute('app_signup')]: {
        screen: SignUpContainer
      },
      [getLocalRoute('app_donateTrees')]: {
        screen: DonateTrees
      },
      [getLocalRoute('app_userHome')]: {
        screen: isLoggedIn ? UserHomeContainer : LoginContainer
      },
      [getLocalRoute('app_registerTrees')]: {
        screen: isLoggedIn ? RegisterTrees : LoginContainer
      },
      [getLocalRoute('app_forgotPassword')]: {
        screen: ForgotPasswordContainer
      },
      [getLocalRoute('app_myTrees')]: {
        screen: isLoggedIn ? UserContributions : LoginContainer
      },
      [getLocalRoute('app_donateTrees')]: {
        screen: DonationTreesContainer
      },
      [getLocalRoute('app_homepage')]: { screen: Trillion },
      [getLocalRoute('app_faq')]: FAQContainer,
      [getLocalRoute('app_editTrees')]: EditUserContributionContainer,
      [getLocalRoute('app_treecounter')]: PublicTreecounterContainer,
      ['about_us']: { screen: AboutUsContainer },
      ['license_info_list']: { screen: LicenseInfoList }

      // Search: {
      //   screen: () => <SearchLayout searchInputUnderlineColorAndroid="#fff" />,
      //   navigationOptions: {
      //     drawerLockMode: 'locked-closed',
      //     header: null
      //   }
      // }
    },
    {
      initialRouteName: isLoggedIn
        ? getLocalRoute('app_userHome')
        : getLocalRoute('app_homepage'),
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
        if (homeRoutes.includes(navigation.state.routeName)) {
          navigationConfig.headerRight = HeaderRight(navigation);
        }
        if (
          navigation.state.routeName === getLocalRoute('app_userHome') ||
          (navigation.state.routeName === getLocalRoute('app_homepage') &&
            !isLoggedIn)
        ) {
          navigationConfig.headerLeft = BurgerMenu(navigation);
        }
        return navigationConfig;
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
  const AppDrawerNavigator = createDrawerNavigator(
    {
      baseNavigator,
      searchNavigator: searchNavigator
    },
    {
      gesturesEnabled: false,
      contentComponent: SideMenuContainer
    }
  );

  return AppDrawerNavigator;
};
