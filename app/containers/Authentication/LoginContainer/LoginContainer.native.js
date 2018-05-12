import AbstractLoginContainer from './AbstractLoginContainer';
import { TextInputTemplate } from '../../../components/Authentication/Login.native';
import loginFormSchema from '../../../server/formSchemas/login';

let schemaOptions = {
  fields: {
    _password: {
      label: 'Password',
      secureTextEntry: true,
      placeholder: 'Password',
      error: 'required',
      maxLength: 20,
      template: TextInputTemplate,
      autoCapitalize: 'none',
      config: { iconUrl: require('../../../images/baum.png') }
    },
    _username: {
      placeholder: 'Username',
      label: 'Username',
      error: 'required',
      template: TextInputTemplate,
      autoCapitalize: 'none',
      config: { iconUrl: require('../../../images/icon1.jpg') }
    }
  }
};

export default class LoginContainer extends AbstractLoginContainer {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.setState({ schema: loginFormSchema, loading: false, schemaOptions });
  }
}
