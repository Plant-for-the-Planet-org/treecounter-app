import AbstractLoginContainer from './AbstractLoginContainer';
import t from 'tcomb-form-native';

let loginFormSchema = t.struct({
  _username: t.String, // a required string
  _password: t.String
});

let schemaOptions = {
  fields: {
    _password: {
      label: 'Password',
      secureTextEntry: true,
      error: 'required'
    },
    _username: {
      label: 'Username',
      error: 'required'
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
