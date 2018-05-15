import React, { Component } from 'react';
import t from 'tcomb-form-native';
import PropTypes from 'prop-types';

import {
  forgotPasswordFormSchema,
  schemaOptions
} from '../../server/formSchemas/forgotpassword';

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
    email: {
      ...schemaOptions.fields.email,
      template: TextInputTemplate,
      config: { iconUrl: require('../../images/baum.png') }
    }
  }
};

export default class ForgotPassword extends Component {
  onPress = () => {
    let value = this.refs.forgotPasswordForm.getValue();
    if (value) {
      this.props.onClick(value);
    }
  };

  render() {
    return (
      <ImageBackground style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.titleText}>Forgot your password?</Text>
          <View style={styles.titleTextUnderline} />
        </View>
        <View style={styles.inputContainer}>
          <Form
            ref={'forgotPasswordForm'}
            type={forgotPasswordFormSchema}
            options={allSchemaOptions}
          />
          <TouchableHighlight onPress={this.onPress} style={styles.button}>
            <Text style={styles.buttonText}>Reset Password</Text>
          </TouchableHighlight>
          <View style={styles.bottomRow}>
            <Text style={styles.bottomTextHighlight}>Try to login again.</Text>
          </View>
        </View>
      </ImageBackground>
    );
  }
}

ForgotPassword.propTypes = {
  onClick: PropTypes.func.isRequired
};

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
    fontSize: 30,
    color: '#575756',
    fontWeight: 'bold',
    justifyContent: 'flex-start',
    marginBottom: 20
  },
  titleTextUnderline: {
    height: 3,
    width: 117,
    backgroundColor: '#b9d384',
    marginLeft: 'auto',
    marginRight: 'auto',
    justifyContent: 'center'
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  bottomTextHighlight: {
    fontSize: 11,
    color: '#ec6453'
  },
  header: {
    marginBottom: 60
  }
});
