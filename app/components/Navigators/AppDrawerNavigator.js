import { DrawerNavigator } from 'react-navigation';
import Trillion from '../TreecounterGraphics/Trillion';
import LoginContainer from '../../containers/Authentication/LoginContainer';
import ForgotPasswordContainer from '../../containers/Authentication/ForgotPasswordContainer';
import { getLocalRoute } from '../../actions/apiRouting';

const login = getLocalRoute('app_login');
export const AppDrawerNavigator = DrawerNavigator(
  {
    [login]: {
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
