import { DrawerNavigator } from 'react-navigation';
import Trillion from '../TreecounterGraphics/Trillion';
import LoginContainer from '../../containers/Authentication/LoginContainer';
import ForgotPasswordContainer from '../../containers/Authentication/ForgotPasswordContainer';

export const AppDrawerNavigator = DrawerNavigator(
  {
    //TODO hkurra import routing config from config file or rest API
    Login: {
      screen: LoginContainer
    },
    Home: {
      screen: Trillion
    },
    ForgotPassword: {
      screen: ForgotPasswordContainer
    }
  },
  {
    gesturesEnabled: false
    //TODO @hkurra Create custom side menu compnent like web
    // contentComponent: SideNavigationMenu
  }
);
