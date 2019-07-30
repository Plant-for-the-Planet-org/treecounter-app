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
          <form onSubmit={this.props.onSetPassword}>
            <TCombForm
              ref="resetPasswordForm"
              type={resetPasswordFormSchema}
              options={this.props.schemaProp}
              value={this.props.formValue}
            />
            <PrimaryButton
              onClick={event => {
                this.props.onSetPassword();
                event.preventDefault();
              }}
            >
              {i18n.t('label.set_password')}
            </PrimaryButton>
          </form>
        </CardLayout>
      </div>
    );
  }
}

ResetPassword.propTypes = {
  onSetPassword: PropTypes.func,
  formValue: PropTypes.object,
  schemaProp: PropTypes.object
};

export default ResetPassword;
