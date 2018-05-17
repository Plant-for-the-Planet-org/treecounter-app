import React, { Component } from 'react';
import t from 'tcomb-form-native';

import {
  loginFormSchema,
  schemaOptions
} from '../../../server/formSchemas/login';

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
  let imageStyle = { width: 26, height: 26, resizeMode: 'center' };
  let textboxStyle = {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: '#000',
    borderBottomWidth: 1,
    borderColor: '#cecece'
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

let allSchemaOptions = {
  fields: {
    _password: {
      ...schemaOptions.fields._password,
      template: TextInputTemplate,
      config: { iconUrl: require('../../images/baum.png') }
    },
    _username: {
      ...schemaOptions.fields._username,
      template: TextInputTemplate,
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
        <View style={styles.loginHeader}>
          <Text style={styles.titleText}>Log In</Text>
          <View style={styles.titleTextUnderline} />
        </View>
        <View style={styles.inputContainer}>
          <Form
            ref={'loginForm'}
            type={loginFormSchema}
            options={allSchemaOptions}
          />
          <TouchableHighlight onPress={this.onPress} style={styles.button}>
            <Text style={styles.buttonText}>Log in</Text>
          </TouchableHighlight>
          <View style={styles.bottomRow}>
            <Text style={styles.bottomText}>Forgot your password? </Text>
            <Text style={styles.bottomTextHighlight}>Reset.</Text>
          </View>
          <View style={styles.bottomRow}>
            <Text style={styles.bottomText}>Don't have an account? </Text>
            <Text style={styles.bottomTextHighlight}>Sign up.</Text>
          </View>
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
    backgroundColor: 'white',
    padding: 10,
    shadowOffset: { width: 0, height: 4 },
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowRadius: 12
  },
  button: {
    height: 50,
    backgroundColor: '#b9d384',
    borderColor: '#b9d384',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 21,
    marginTop: 30,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 29,
    color: 'white',
    alignSelf: 'center'
  },
  titleText: {
    fontSize: 41,
    color: '#575756',
    width: 117,
    fontWeight: 'bold',
    justifyContent: 'flex-start'
  },
  titleTextUnderline: {
    height: 3,
    width: 117,
    backgroundColor: '#b9d384'
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  bottomText: {
    fontSize: 11,
    color: '#696261'
  },
  bottomTextHighlight: {
    fontSize: 11,
    color: '#ec6453'
  },
  loginHeader: {
    marginBottom: 60
  }
});
