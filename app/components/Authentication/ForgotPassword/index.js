import React, { Component } from 'react';
import PropTypes from 'prop-types';
import t from 'tcomb-form';
import i18n from '../../../locales/i18n.js';

import {
  forgotPasswordFormSchema,
  schemaOptions
} from '../../../server/parsedSchemas/forgotpassword';
import PrimaryButton from '../../Common/Button/PrimaryButton';
import TextHeading from '../../Common/Heading/TextHeading';
import CardLayout from '../../Common/Card';
import InlineLink from '../../Common/InlineLink';
import TextBlock from '../../Common/Text/TextBlock';
import TextSpan from '../../Common/Text/TextSpan';

let TCombForm = t.form.Form;

export default class ForgotPassword extends Component {
  render() {
    return (
      <div className="app-container__content--center sidenav-wrapper">
        <TextHeading>{i18n.t('label.forgot_ur_password')}</TextHeading>
        <div className="card-width">
          <CardLayout>
            <div className="reset_password_text">
              <TextSpan>{i18n.t('label.enter_mail')}</TextSpan>
            </div>
            <br />
            <form onSubmit={this.props.onResetPassword}>
              <TCombForm
                ref="forgotPasswordForm"
                type={forgotPasswordFormSchema}
                options={schemaOptions}
              />
              <PrimaryButton
                onClick={event => {
                  this.props.onResetPassword();
                  event.preventDefault();
                }}
              >
                {i18n.t('label.reset_password')}
              </PrimaryButton>
            </form>
            <TextBlock>
              <InlineLink
                uri={'app_login'}
                caption={i18n.t('label.try_again_login')}
              />
            </TextBlock>
          </CardLayout>
        </div>
      </div>
    );
  }
}

ForgotPassword.propTypes = {
  onResetPassword: PropTypes.func.isRequired
};
