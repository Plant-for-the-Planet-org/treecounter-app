import React, { Component } from 'react';
import t from 'tcomb-form-native';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  ImageBackground,
  ScrollView
} from 'react-native';

import {
  schemaOptions,
  signupFormSchema
} from '../../../server/formSchemas/signup';

import { loginStyles } from '../Login';
import SignupTypes from './SignupType';

let Form = t.form.Form;

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Profiletype: 'individual'
    };
    this.changeProfile = this.changeProfile.bind(this);
  }

  onLoginClicked = () => {
    this.props.updateRoute('app_login');
  };

  changeProfile(type) {
    this.setState({
      Profiletype: type
    });
  }

  onPress = () => {
    let result = this.refs.signupForm.validate();
    if (result.isValid()) {
      let value = this.refs.signupForm.getValue();
      if (value) {
        this.props.onClick(this.state.Profiletype, value);
      }
    } else if (this.props.onError) {
      this.props.onError(result.errors);
    }
  };

  render() {
    return (
      <ScrollView>
        <ImageBackground style={styles.container}>
          <View style={styles.loginHeader}>
            <Text style={styles.titleText}>Join In</Text>
            <View style={styles.titleTextUnderline} />
          </View>
          <SignupTypes changeProfile={this.changeProfile} />
          <View style={styles.inputContainer}>
            <Form
              ref={'signupForm'}
              type={signupFormSchema[this.state.Profiletype]}
              options={schemaOptions[this.state.Profiletype]}
            />
            <TouchableHighlight onPress={this.onPress} style={styles.button}>
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableHighlight>
            <View style={styles.bottomRow}>
              <Text style={styles.bottomText}>Already have an account? </Text>
              <Text
                onPress={this.onLoginClicked}
                style={styles.bottomTextHighlight}
              >
                Log in.
              </Text>
            </View>
          </View>
        </ImageBackground>
      </ScrollView>
    );
  }
}

SignUp.propTypes = {
  updateRoute: PropTypes.func,
  onClick: PropTypes.func,
  onError: PropTypes.func
};

export const styles = StyleSheet.create({
  ...loginStyles,
  titleText: { ...loginStyles.titleText, width: 129 },
  titleTextUnderline: { ...loginStyles.titleTextUnderline, width: 119 }
});
