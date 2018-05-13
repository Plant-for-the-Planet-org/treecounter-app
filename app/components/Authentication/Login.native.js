import React, { Component } from 'react';
import t from 'tcomb-form-native';
import loginFormSchema from '../../server/formSchemas/login';

import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image,
  TextInput,
  ImageBackground
} from 'react-native';

let Form = t.form.Form;

function TextInputTemplate(locals) {
  let containerStyle = {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 20,
    paddingBottom: 20
  };
  let imageStyle = { width: 26, height: 26 };
  let textboxStyle = {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: '#9c9b9b'
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
      <ImageBackground style={styles.container}>
        <Text style={styles.titleText}>Log In</Text>
        <View style={styles.titleTextLine} />
        <View style={styles.inputContainer}>
          <Form
            ref={'loginForm'}
            type={loginFormSchema}
            options={schemaOptions}
          />
          <TouchableHighlight onPress={this.onPress} style={styles.button}>
            <Text style={styles.buttonText}>Log in</Text>
          </TouchableHighlight>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#f0f0f0'
  },
  inputContainer: {
    width: '100%',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: '#fff',
    padding: 10,
    shadowOffset: { width: 0, height: 4 },
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowRadius: 12
  },
  button: {
    height: 50,
    backgroundColor: '#b8d385',
    borderColor: '#b8d385',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    marginTop: 30,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  titleText: {
    fontSize: 41,
    color: '#575756',
    width: 117,
    fontWeight: 'bold',
    justifyContent: 'flex-start',
    bottom: '20%'
  },
  titleTextLine: {
    height: 3,
    width: 117,
    bottom: '18%',
    backgroundColor: '#b8d385'
  }
});
