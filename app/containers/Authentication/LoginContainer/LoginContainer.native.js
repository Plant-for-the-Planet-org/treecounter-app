import AbstractLoginContainer from './AbstractLoginContainer';
import t from 'tcomb-form-native';

let loginFormSchema = t.struct({
  username: t.String, // a required string
  password: t.String
});

let schemaOptions = {
  fields: {
    password: {
      secureTextEntry: true,
      error: 'required'
    },
    username: {
      error: 'required'
    }
  }
};

export default class LoginContainer extends AbstractLoginContainer {
  constructor(props) {
    super(props);
  }
  onClick = value => {
    if (value) {
      console.log(value);
    }
  };

  componentDidMount() {
    this.setState({ schema: loginFormSchema, loading: false, schemaOptions });
  }
}
