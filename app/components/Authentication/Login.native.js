import React, { Component } from 'react';
import t from 'tcomb-form-native';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableHighlight,
  Image,
  TextInput
} from 'react-native';

let Form = t.form.Form;
export function TextInputTemplate(locals) {
  let containerStyle = {
    backgroundColor: '#F5FCFF',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 20,
    paddingBottom: 20
  };
  let labelStyle = {};
  let textboxStyle = {
    flex: 1,
    paddingLeft: 20,
    fontSize: 11,
    color: '#696261'
  };

  return (
    <View style={containerStyle}>
      <Image style={{ width: 15, height: 15 }} source={locals.config.iconUrl} />
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

export default class Login extends Component {
  onPress = () => {
    let value = this.refs.loginForm.getValue();
    if (value) {
      this.props.onClick(value);
    }
  };

  render() {
    return this.props.loading ? null : (
      <View style={styles.container}>
        <Form
          ref={'loginForm'}
          type={this.props.schema}
          options={this.props.schemaOptions}
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
