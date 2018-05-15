import { DrawerNavigator } from 'react-navigation';
import Trillion from '../TreecounterGraphics/Trillion';
import LoginContainer from '../../containers/Authentication/LoginContainer';
import SignUpContainer from '../../containers/Authentication/SignUpContainer';

export const AppDrawerNavigator = DrawerNavigator(
  {
    //TODO hkurra import routing config from config file or rest API
    Login: {
      screen: LoginContainer
    },
    Signup: {
      screen: SignUpContainer
    },
    Home: {
      screen: Trillion
    }
  },
  {
    gesturesEnabled: false
    //TODO @hkurra Create custom side menu compnent like web
    // contentComponent: SideNavigationMenu
  }
);
