import { DrawerNavigator } from 'react-navigation';
import Trillion from '../TreecounterGraphics/Trillion';
import LoginContainer from '../../containers/Authentication/LoginContainer';
import SignUpContainer from '../../containers/Authentication/SignUpContainer';
import ForgotPasswordContainer from '../../containers/Authentication/ForgotPasswordContainer';
import { getLocalRoute } from '../../actions/apiRouting';

export const AppDrawerNavigator = DrawerNavigator(
  {
    [getLocalRoute('app_login')]: {
      screen: LoginContainer
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
    gesturesEnabled: false
    //TODO @hkurra Create custom side menu compnent like web
    // contentComponent: SideNavigationMenu
  }
);
