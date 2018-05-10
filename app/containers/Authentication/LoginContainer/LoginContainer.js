import AbstractLoginContainer from './AbstractLoginContainer';
import LoginSchema from '../../../layouts/loginSchema';
import PropTypes from 'prop-types';

export default class LoginContainer extends AbstractLoginContainer {
  onClick(value) {
    this.props.login(value);
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
