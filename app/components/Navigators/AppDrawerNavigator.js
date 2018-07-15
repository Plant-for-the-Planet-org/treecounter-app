import { DrawerNavigator, StackNavigator } from 'react-navigation';
import React from 'react';
import Trillion from '../TreecounterGraphics/Trillion';
import LoginContainer from '../../containers/Authentication/LoginContainer';
import SignUpContainer from '../../containers/Authentication/SignUpContainer';
import ForgotPasswordContainer from '../../containers/Authentication/ForgotPasswordContainer';
import TargetContainer from '../../containers/TargetContainer';

import { getLocalRoute } from '../../actions/apiRouting';
import SideMenuContainer from '../../containers/Menu/SideMenuContainer';
import { View } from 'react-native';
import styles from '../../styles/header.native';

class Header extends React.Component {
  render() {
    return <View style={{ width: 300, height: 30 }} />;
  }
}

const baseNavigator = StackNavigator(
  {
    [getLocalRoute('app_login')]: {
      screen: LoginContainer
    },
    [getLocalRoute('app_target')]: {
      screen: TargetContainer
    },
    [getLocalRoute('app_signup')]: {
      screen: SignUpContainer
    },
    [getLocalRoute('app_userHome')]: {
      screen: Trillion
    },
    [getLocalRoute('app_forgotPassword')]: {
      screen: ForgotPasswordContainer
    }
  },
  {
    navigationOptions: () => ({
      headerStyle: styles.container
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
