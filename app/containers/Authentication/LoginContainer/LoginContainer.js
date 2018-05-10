import AbstractLoginContainer from './AbstractLoginContainer';
import LoginSchema from '../../../layouts/loginSchema';

//TODO @hkurra implement this for web and import it at required location
export default class LoginContainer extends AbstractLoginContainer {
  onClick(value) {
    login();
  }

  componentDidMount() {
    LoginSchema.subscribe(
      success => this.setState({ schema: success, loading: false }),
      error => console.log(error)
    );
  }
}

LoginContainer.propTypes = {
  login: PropTypes.func.isRequired
};
