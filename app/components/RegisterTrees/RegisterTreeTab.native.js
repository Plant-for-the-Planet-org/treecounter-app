import React, { PureComponent } from 'react';
import t from 'tcomb-form-native';
import { View } from 'react-native';
import PrimaryButton from '../Common/Button/PrimaryButton';
import PropTypes from 'prop-types';
import i18n from '../../locales/i18n.js';
import styles from '../../styles/register_trees.native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Dropdown } from 'react-native-material-dropdown';
const Form = t.form.Form;

getFormLayoutTemplate = (mode, isTpo) => {
  const formLayoutTreesTemplate = locals => {
    return (
      <View style={styles.registerTree__form}>
        <View style={styles.registerTree__form__row}>
          <View style={{ flex: mode === 'multiple-trees' ? 1 : 0 }}>
            {locals.inputs.treeCount}
          </View>
          <View style={{ flex: 1 }}>{locals.inputs.treeSpecies}</View>
        </View>

        {locals.inputs.plantDate}

        {locals.inputs.geoLocation}

        <View
          style={[styles.registerTree__form__alignLeftRow, styles.margin_top10]}
        />
        <View style={styles.registerTree__form__row}>
          <View style={{ flex: 1 }}>{locals.inputs.treeClassification}</View>
          <View style={{ flex: 1 }}>{locals.inputs.treeScientificName}</View>
        </View>
        <View style={styles.registerTree__form__row__split}>
          {locals.inputs.contributionMeasurements}
        </View>
      </View>
    );
  };
  return formLayoutTreesTemplate;
};

export default class RegisterTreeTab extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      plantProject: props.isTpo
        ? props.plantProjects.length > 0
          ? props.plantProjects[0].value
          : ''
        : '',
      formValueSingle: props.value
        ? props.value
        : {
            treeCount: 1
          },
      formValueMultiple: props.value ? props.value : ''
    };
  }

  onFormChangeSingle = value => {
    this.setState({ formValueSingle: value });
  };

  onFormChangeMultiple = value => {
    this.setState({ formValueMultiple: value });
  };

  render() {
    const schemaOptionsMultiple = {
      template: getFormLayoutTemplate(this.props.mode, this.props.isTpo),
      ...this.props.schemaOptions
    };
    return (
      <KeyboardAwareScrollView enableOnAndroid>
        <View style={{ backgroundColor: '#ffffff' }}>
          <Form
            ref="multipleTreesForm"
            type={this.props.schemaType}
            options={schemaOptionsMultiple}
            value={
              this.props.mode === 'single-tree'
                ? this.state.formValueSingle
                : this.state.formValueMultiple
            }
            onChange={
              this.props.mode === 'single-tree'
                ? this.onFormChangeSingle
                : this.onFormChangeMultiple
            }
          />
          {this.props.isTpo ? (
            this.props.plantProjects.length > 0 ? (
              <Dropdown
                value={this.state.plantProject}
                onChangeText={item =>
                  this.setState({
                    plantProject: item
                  })
                }
                label={i18n.t('label.plant_project')}
                data={this.props.plantProjects.map(item => {
                  return { value: item.value, label: item.text };
                })}
              />
            ) : null
          ) : null}
          <PrimaryButton
            onClick={() => {
              this.props.onRegister &&
                this.props.onRegister(
                  this.props.mode,
                  this.refs.multipleTreesForm,
                  this.state.plantProject === ''
                    ? null
                    : this.state.plantProject
                );
            }}
          >
            {this.props.buttonTitle
              ? this.props.buttonTitle
              : i18n.t('label.register')}
          </PrimaryButton>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

RegisterTreeTab.propTypes = {
  mode: PropTypes.string.isRequired,
  onRegister: PropTypes.func,
  schemaType: PropTypes.any.isRequired,
  schemaOptions: PropTypes.any.isRequired,
  value: PropTypes.any,
  buttonTitle: PropTypes.string,
  isTpo: PropTypes.bool
};
