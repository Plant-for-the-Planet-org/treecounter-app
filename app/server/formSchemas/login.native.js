import t from 'tcomb-form-native';

export default t.struct({
  _username: t.String, // a required string
  _password: t.String
});
