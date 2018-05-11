import AbstractLoginContainer from './AbstractLoginContainer';
import t from 'tcomb-form-native';
import { TextInputTemplate } from '../../../components/Authentication/Login.native';

let loginFormSchema = t.struct({
  _username: t.String, // a required string
  _password: t.String
});

let schemaOptions = {
  fields: {
    _password: {
      label: 'Password',
      secureTextEntry: true,
      placeholder: 'Password',
      error: 'required',
      maxLength: 20,
      template: TextInputTemplate,
      config: { iconUrl: require('../../../images/baum.png') }
    },
    _username: {
      placeholder: 'Username',
      label: 'Username',
      error: 'required',
      template: TextInputTemplate,
      config: { iconUrl: require('../../../images/icon1.jpg') }
    }
  }
};

export default class LoginContainer extends AbstractLoginContainer {
  constructor(props) {
    super(props);
  }
  onClick(value) {
    if (value) {
      console.log(value);
      this.props.login(value);
    }
  }

  componentDidMount() {
    this.setState({ schema: loginFormSchema, loading: false, schemaOptions });
  }
}
