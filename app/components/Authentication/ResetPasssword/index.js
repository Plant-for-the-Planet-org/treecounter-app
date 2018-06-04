import React, { Component } from 'react';
import PropTypes from 'prop-types';
import t from 'tcomb-form';

import {
  resetPasswordFormSchema,
  schemaOptions
} from '../../../server/parsedSchemas/resetPassword';
import PrimaryButton from '../../Common/Button/PrimaryButton';
import TextHeading from '../../Common/Heading/TextHeading';
import CardLayout from '../../Common/Card/CardLayout';

let TCombForm = t.form.Form;

class ResetPassword extends Component {
  render() {
    return (
      <div className="app-container__content--center sidenav-wrapper">
        <TextHeading>Reset Your Password</TextHeading>
        <CardLayout>
          <TCombForm
            ref="resetPasswordForm"
            type={resetPasswordFormSchema}
            options={schemaOptions}
          />
          <PrimaryButton onClick={this.props.onSetPassword}>
            Set Password
          </PrimaryButton>
        </CardLayout>
      </div>
    );
  }
}

ResetPassword.propTypes = {
  onSetPassword: PropTypes.func
};

export default ResetPassword;
