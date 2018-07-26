import React, { PureComponent } from 'react';
import t from 'tcomb-form-native';
import { View } from 'react-native';
import PrimaryButton from '../Common/Button/PrimaryButton';
import PropTypes from 'prop-types';
import i18n from '../../locales/i18n.js';
const Form = t.form.Form;

export default class RegisterTreeTab extends PureComponent {
  render() {
    return (
      <View style={{ backgroundColor: '#ffffff' }}>
        <Form
          ref="multipleTreesForm"
          type={this.props.schemaType}
          options={this.props.schemaOptions}
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
          {i18n.t('label.register')}
        </PrimaryButton>
      </View>
    );
  }
}

RegisterTreeTab.propTypes = {
  mode: PropTypes.string.isRequired,
  onRegister: PropTypes.func,
  schemaType: PropTypes.any.isRequired,
  schemaOptions: PropTypes.any.isRequired
};
