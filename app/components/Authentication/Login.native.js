import React, { Component } from 'react';
import t from 'tcomb-form-native';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableHighlight
} from 'react-native';

let Form = t.form.Form;
export default class Login extends Component {
  onPress = () => {
    let value = this.refs.loginForm.getValue();
    if (value) {
      this.props.onCLick();
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
    backgroundColor: '#e86f56',
    borderColor: '#e86f56',
    borderWidth: 1,
    borderRadius: 50,
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
