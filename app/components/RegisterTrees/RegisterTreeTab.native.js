import React, { PureComponent } from 'react';
import t from 'tcomb-form-native';
import { View } from 'react-native';
import PrimaryButton from '../Common/Button/PrimaryButton';
import PropTypes from 'prop-types';
import i18n from '../../locales/i18n.js';
import styles from '../../styles/register_trees.native';
const Form = t.form.Form;

const formLayoutTreesTemplate = locals => {
  return (
    <View style={styles.registerTree__form}>
      <View style={styles.registerTree__form__row}>
        {locals.inputs.treeCount}
        {locals.inputs.treeSpecies}
      </View>
      <View style={styles.registerTree__form__row}>
        {locals.inputs.plantDate}
      </View>
      <View style={styles.registerTree__form__row}>
        {locals.inputs.geoLocation}
      </View>

      <View
        style={[styles.registerTree__form__alignLeftRow, styles.margin_top10]}
      >
        {locals.inputs.contributionImages}
      </View>
      <View style={styles.registerTree__form__row}>
        {locals.inputs.treeClassification}
        {locals.inputs.treeScientificName}
      </View>
      <View style={styles.registerTree__form__row__split}>
        {locals.inputs.contributionMeasurements}
      </View>
    </View>
  );
};

export default class RegisterTreeTab extends PureComponent {
  render() {
    const schemaOptionsMultiple = {
      template: formLayoutTreesTemplate,
      ...this.props.schemaOptions
    };
    return (
      <View style={{ backgroundColor: '#ffffff' }}>
        <Form
          ref="multipleTreesForm"
          type={this.props.schemaType}
          options={schemaOptionsMultiple}
          value={this.props.value ? this.props.value : { treeCount: 1 }}
        />
        <PrimaryButton
          onClick={() => {
            this.props.onRegister &&
              this.props.onRegister(
                this.props.mode,
                this.refs.multipleTreesForm
              );
          }}
        >
          {this.props.buttonTitle
            ? this.props.buttonTitle
            : i18n.t('label.register')}
        </PrimaryButton>
      </View>
    );
  }
}

RegisterTreeTab.propTypes = {
  mode: PropTypes.string.isRequired,
  onRegister: PropTypes.func,
  schemaType: PropTypes.any.isRequired,
  schemaOptions: PropTypes.any.isRequired,
  value: PropTypes.any,
  buttonTitle: PropTypes.string
};
