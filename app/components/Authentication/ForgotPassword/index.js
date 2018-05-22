import React, { Component } from 'react';
import PropTypes from 'prop-types';
import t from 'tcomb-form';

import {
  forgotPasswordFormSchema,
  schemaOptions
} from '../../../server/parsedSchemas/forgotpassword';
import PrimaryButton from '../../Common/Button/PrimaryButton';
import TextHeading from '../../Common/Text/TextHeading';
import CardLayout from '../../Common/Card/CardLayout';
import InlineLink from '../../Common/InlineLink';
import TextBlock from '../../Common/Text/TextBlock';

let TCombForm = t.form.Form;

export default class Login extends Component {
  render() {
    return (
      <div className="app-container__content--center">
        <TextHeading>Forgot Your Password?</TextHeading>
        <CardLayout>
          <div className="pftp-text-left-aligned">
            Enter your email address and we‘ll send you a link to reset your
            password.
          </div>
          <TCombForm
            ref="forgotPasswordForm"
            type={forgotPasswordFormSchema}
            options={schemaOptions}
          />
          <PrimaryButton onClick={this.props.onResetPassword}>
            Reset Password
          </PrimaryButton>
          <TextBlock>
            <InlineLink uri={'app_login'} caption="Try to login again." />
          </TextBlock>
        </CardLayout>
      </div>
    );
  }
}

Login.propTypes = {
  onResetPassword: PropTypes.func.isRequired
};
