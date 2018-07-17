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

const baseNavigator = StackNavigator(
  {
    [getLocalRoute('app_login')]: {
      screen: LoginContainer,
      navigationOptions: ({ navigation }) => ({
        headerLeft: BurgerMenu(navigation),
        title: i18n.t('label.login')
      })
    },
    [getLocalRoute('app_target')]: {
      screen: TargetContainer
    },
    [getLocalRoute('app_signup')]: {
      screen: SignUpContainer,
      navigationOptions: () => ({
        title: i18n.t('label.signUp')
      })
    },
    [getLocalRoute('app_userHome')]: {
      screen: Trillion
    },
    [getLocalRoute('app_donateTrees')]: {
      screen: DonateTrees
    },
    [getLocalRoute('app_forgotPassword')]: {
      screen: ForgotPasswordContainer,
      navigationOptions: () => ({
        title: i18n.t('label.forgot_ur_password')
      })
    }
  },
  {
    navigationOptions: ({ navigation }) => ({
      headerStyle: styles.container,
      headerTintColor: '#fff'
    })
  }
);
export const AppDrawerNavigator = DrawerNavigator(
  {
    Category: baseNavigator
  },
  {
    gesturesEnabled: false,
    contentComponent: SideMenuContainer
  }
);
