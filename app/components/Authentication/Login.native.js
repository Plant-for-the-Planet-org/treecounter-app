import React, { Component } from 'react';
import t from 'tcomb-form-native';
import loginFormSchema from '../../server/formSchemas/login';

import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image,
  TextInput
} from 'react-native';

let Form = t.form.Form;

function TextInputTemplate(locals) {
  let containerStyle = {
    backgroundColor: '#F5FCFF',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 20,
    paddingBottom: 20
  };
  let imageStyle = { width: 15, height: 15 };
  let textboxStyle = {
    flex: 1,
    paddingLeft: 20,
    fontSize: 11,
    color: '#696261'
  };

  return (
    <View style={containerStyle}>
      <Image style={imageStyle} source={locals.config.iconUrl} />
      <TextInput
        style={textboxStyle}
        secureTextEntry={locals.secureTextEntry}
        placeholder={locals.placeholder}
        keyboardType={locals.keyboardType}
        maxLength={locals.maxLength}
        multiline={locals.multiline}
        value={locals.value}
        onChangeText={value => locals.onChange(value)}
        onChange={locals.onChangeNative}
        onKeyPress={locals.onKeyPress}
        returnKeyType={locals.returnKeyType}
        autoCapitalize={locals.autoCapitalize}
      />
    </View>
  );
}

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
      config: { iconUrl: require('../../images/baum.png') }
    },
    _username: {
      placeholder: 'Username',
      label: 'Username',
      error: 'required',
      template: TextInputTemplate,
      autoCapitalize: 'none',
      config: { iconUrl: require('../../images/icon1.jpg') }
    }
  }
};

export default class Login extends Component {
  onPress = () => {
    let value = this.refs.loginForm.getValue();
    if (value) {
      this.props.onClick(value);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Form
          ref={'loginForm'}
          type={loginFormSchema}
          options={schemaOptions}
        />
        <TouchableHighlight onPress={this.onPress} style={styles.button}>
          <Text style={styles.buttonText}>Log in</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
    padding: 20
  },
  button: {
    height: 36,
    backgroundColor: '#b8d385',
    borderColor: '#b8d385',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  }
});
