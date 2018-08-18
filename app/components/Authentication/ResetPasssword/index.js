import React, { Component } from 'react';
import PropTypes from 'prop-types';
import t from 'tcomb-form';

import {
  resetPasswordFormSchema,
  schemaOptions
} from '../../../server/parsedSchemas/resetPassword';
import PrimaryButton from '../../Common/Button/PrimaryButton';
import TextHeading from '../../Common/Heading/TextHeading';
import CardLayout from '../../Common/Card';
import i18n from '../../../locales/i18n';

let TCombForm = t.form.Form;

class ResetPassword extends Component {
  render() {
    return (
      <div className="app-container__content--center sidenav-wrapper">
        <TextHeading>{i18n.t('label.reset_ur_password')}</TextHeading>
        <CardLayout>
          <TCombForm
            ref="resetPasswordForm"
            type={resetPasswordFormSchema}
            options={schemaOptions}
            value={this.props.value}
          />
          <PrimaryButton onClick={this.props.onSetPassword}>
            {i18n.t('label.set')} {i18n.t('label.password')}
          </PrimaryButton>
        </CardLayout>
      </div>
    );
  }
}

ResetPassword.propTypes = {
  onSetPassword: PropTypes.func,
  value: PropTypes.object
};

export default ResetPassword;
