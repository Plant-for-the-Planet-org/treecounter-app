import React, { Component } from 'react';
import t from 'tcomb-form-native';
import PropTypes from 'prop-types';
import {
  schemaOptions,
  signupFormSchema
} from '../../../server/formSchemas/signup';
import { loginStyles } from '../Login.native';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image,
  TextInput,
  ImageBackground,
  ScrollView
} from 'react-native';
let Form = t.form.Form;

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Profiletype: 'individual'
    };
  }

  changeProfile(type) {
    this.state = {
      Profiletype: type
    };
  }
  render() {
    return (
      <ScrollView>
        <ImageBackground style={styles.container}>
          <View style={styles.loginHeader}>
            <Text style={styles.titleText}>Join In</Text>
            <View style={styles.titleTextUnderline} />
          </View>
          <View style={styles.inputContainer}>
            <Form
              ref={'loginForm'}
              type={signupFormSchema[this.state.Profiletype]}
              options={schemaOptions[this.state.Profiletype]}
            />
            <TouchableHighlight onPress={this.onPress} style={styles.button}>
              <Text style={styles.buttonText}>Set target</Text>
            </TouchableHighlight>
            <View style={styles.bottomRow}>
              <Text style={styles.bottomText}>Already have an account? </Text>
              <Text style={styles.bottomTextHighlight}>Log in.</Text>
            </View>
          </View>
        </ImageBackground>
      </ScrollView>
    );
  }
}

export const styles = StyleSheet.create({
  ...loginStyles,
  titleText: { ...loginStyles.titleText, width: 129 },
  titleTextUnderline: { ...loginStyles.titleTextUnderline, width: 119 }
});
