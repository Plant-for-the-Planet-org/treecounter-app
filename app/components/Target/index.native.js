import React, { Component } from 'react';
import t from 'tcomb-form-native';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  ScrollView
} from 'react-native';

import {
  schemaOptions,
  targetFormSchema
} from '../../server/parsedSchemas/target';

import { loginStyles } from '../Authentication/Login';

let Form = t.form.Form;

export default class Target extends Component {
  render() {
    let { treecounter } = this.props;
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.loginHeader}>
          <Text style={styles.titleText}>Set Target</Text>
          <View style={styles.titleTextUnderline} />
        </View>
        <View style={styles.inputContainer}>
          <Form
            ref={'setTargetForm'}
            type={targetFormSchema}
            options={schemaOptions}
          />
          <TouchableHighlight
            onPress={this.props.onSubmitTarget.bind(this, treecounter.id)}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Set Target</Text>
          </TouchableHighlight>
        </View>
      </ScrollView>
    );
  }
}

Target.propTypes = {
  treecounter: PropTypes.object.isRequired,
  onSubmitTarget: PropTypes.func.isRequired
};

export const styles = StyleSheet.create({
  ...loginStyles,
  titleText: { ...loginStyles.titleText, width: 129 },
  titleTextUnderline: { ...loginStyles.titleTextUnderline, width: 119 }
});
