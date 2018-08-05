import { DrawerNavigator, StackNavigator } from 'react-navigation';
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
import SearchLayout from '../Header/SearchLayout.native';

const homeRoutes = [getLocalRoute('app_login'), getLocalRoute('app_userHome')];
const headerLabels = {
  [getLocalRoute('app_login')]: 'label.login',
  [getLocalRoute('app_signup')]: 'label.signUp',
  [getLocalRoute('app_forgotPassword')]: 'label.forgot_ur_password',
  [getLocalRoute('app_userHome')]: 'label.home',
  [getLocalRoute('app_target')]: 'label.set_target',
  [getLocalRoute('app_donateTrees')]: 'label.donate_trees',
  [getLocalRoute('app_faq')]: 'label.faqs',
  [getLocalRoute('app_faq')]: 'label.faqs',
  [getLocalRoute('app_myTrees')]: 'label.my_trees',
  [getLocalRoute('app_registerTrees')]: 'label.heading_register_trees'
};

export const getDrawerNavigator = function(isLoggedIn) {
  const baseNavigator = StackNavigator(
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
        screen: Trillion
      },
      [getLocalRoute('app_registerTrees')]: {
        screen: isLoggedIn ? RegisterTrees : LoginContainer
      },
      [getLocalRoute('app_forgotPassword')]: {
        screen: ForgotPasswordContainer
      },
      [getLocalRoute('app_myTrees')]: {
        screen: UserContributions
      },
      [getLocalRoute('app_donateTrees')]: {
        screen: DonationTreesContainer
      },
      [getLocalRoute('app_faq')]: FAQContainer
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
        : getLocalRoute('app_login'),
      navigationOptions: ({ navigation }) => {
        console.log('navigation options', navigation);

        let navigationConfig = {
          headerStyle: styles.container,
          headerTintColor: '#fff',
          title: i18n.t(headerLabels[navigation.state.routeName])
        };
        if (homeRoutes.includes(navigation.state.routeName)) {
          navigationConfig.headerLeft = BurgerMenu(navigation);
          navigationConfig.headerRight = HeaderRight(navigation);
        }

        return navigationConfig;
      }
    }
  );
  const searchNavigator = StackNavigator(
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
  const AppDrawerNavigator = DrawerNavigator(
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
