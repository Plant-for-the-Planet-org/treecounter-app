import React, { Component } from 'react';
import t from 'tcomb-form-native';
import PropTypes from 'prop-types';
import { View, ScrollView } from 'react-native';
import i18n from '../../locales/i18n.js';

import { targetFormSchema } from '../../server/parsedSchemas/target';

import styles from '../../styles/login.native';
import CardLayout from '../Common/Card';
import PrimaryButton from '../Common/Button/PrimaryButton';
let Form = t.form.Form;

export default class Target extends Component {
  constructor(props) {
    super(props);
    let {
      countTarget /* , targetYear, targetComment */
    } = this.props.treecounter;

    this.state = {
      label: countTarget !== 0 ? i18n.t('label.update') : i18n.t('label.save')
    };
  }

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
          </CardLayout>
          <PrimaryButton
            onClick={this.props.onSubmitTarget}
            buttonStyle={{ marginTop: 10 }}
          >
            {this.state.label}
          </PrimaryButton>
        </View>
      </ScrollView>
    );
  }
}

Target.propTypes = {
  treecounter: PropTypes.object.isRequired,
  onSubmitTarget: PropTypes.func.isRequired
};
