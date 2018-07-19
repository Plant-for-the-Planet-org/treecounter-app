import { DrawerNavigator, StackNavigator } from 'react-navigation';
import React from 'react';
import Trillion from '../TreecounterGraphics/Trillion';
import LoginContainer from '../../containers/Authentication/LoginContainer';
import SignUpContainer from '../../containers/Authentication/SignUpContainer';
import ForgotPasswordContainer from '../../containers/Authentication/ForgotPasswordContainer';
import TargetContainer from '../../containers/TargetContainer';

import { getLocalRoute } from '../../actions/apiRouting';
import SideMenuContainer from '../../containers/Menu/SideMenuContainer';
import styles from '../../styles/header.native';
import BurgerMenu from '../../components/Header/BurgerMenu';
import i18n from '../../locales/i18n.js';
import DonateTrees from '../../containers/DonateTrees';

const homeRoutes = [getLocalRoute('app_login'), getLocalRoute('app_userHome')];
const headerLabels = {
  [getLocalRoute('app_login')]: 'label.login',
  [getLocalRoute('app_signup')]: 'label.signUp',
  [getLocalRoute('app_forgotPassword')]: 'label.forgot_ur_password',
  [getLocalRoute('app_userHome')]: 'label.home',
  [getLocalRoute('app_target')]: 'label.set_target',
  [getLocalRoute('app_donateTrees')]: 'label.donateTrees'
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
      [getLocalRoute('app_forgotPassword')]: {
        screen: ForgotPasswordContainer
      }
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
        }

        return navigationConfig;
      }
    }
  );
  const AppDrawerNavigator = DrawerNavigator(
    {
      Category: baseNavigator
    },
    {
      gesturesEnabled: false,
      contentComponent: SideMenuContainer
    }
  );

  return AppDrawerNavigator;
};
