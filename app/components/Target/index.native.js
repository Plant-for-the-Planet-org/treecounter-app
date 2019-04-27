import React, { Component } from 'react';
import t from 'tcomb-form-native';
import PropTypes from 'prop-types';
import { View, ScrollView } from 'react-native';
import i18n from '../../locales/i18n.js';

import {
  schemaOptions,
  targetFormSchema
} from '../../server/parsedSchemas/target';

import styles from '../../styles/login';
import CardLayout from '../Common/Card';
import PrimaryButton from '../Common/Button/PrimaryButton';
let Form = t.form.Form;

export default class Target extends Component {
  shouldComponentUpdate(nextProps) {
    return JSON.stringify(nextProps) !== JSON.stringify(this.props);
  }
  render() {
    return (
      <ScrollView contentContainerStyle={styles.scrollViewStyle}>
        <View style={styles.container}>
          <CardLayout style={styles.inputContainer}>
            <Form
              ref={'setTargetForm'}
              type={targetFormSchema}
              options={this.props.schemaOptions}
              value={this.props.treecounter}
            />
            <PrimaryButton onClick={this.props.onSubmitTarget}>
              {i18n.t('label.set_target')}
            </PrimaryButton>
          </CardLayout>
        </View>
      </ScrollView>
    );
  }
}

Target.propTypes = {
  treecounter: PropTypes.object.isRequired,
  onSubmitTarget: PropTypes.func.isRequired
};
