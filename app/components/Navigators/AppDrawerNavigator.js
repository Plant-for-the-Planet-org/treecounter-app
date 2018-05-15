import { DrawerNavigator } from 'react-navigation';
import Trillion from '../TreecounterGraphics/Trillion';
import LoginContainer from '../../containers/Authentication/LoginContainer';
import ForgotPasswordContainer from '../../containers/Authentication/ForgotPasswordContainer';
// import { getLocalRoute } from '../../actions/apiRouting';

// const login = getLocalRoute('app_login');
// const home = getLocalRoute('app_homepage');
// const forgotPassword = getLocalRoute('app_forgotPassword');
export const AppDrawerNavigator = DrawerNavigator(
  {
    Login: {
      screen: LoginContainer
    },
    Home: {
      screen: Trillion
    },
    forgotPassword: {
      screen: ForgotPasswordContainer
    }
  },
  {
    gesturesEnabled: false
    //TODO @hkurra Create custom side menu compnent like web
    // contentComponent: SideNavigationMenu
  }
);
