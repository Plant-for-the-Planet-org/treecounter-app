import AbstractLoginContainer from './AbstractLoginContainer';
import LoginSchema from '../../layouts/loginSchema';

//TODO @hkurra implement this for web and import it at required location
export default class LoginContainer extends AbstractLoginContainer {
  componentDidMount() {
    LoginSchema.subscribe(
      success => this.setState({ schema: success, loading: false }),
      error => console.log(error)
    );
  }
}
