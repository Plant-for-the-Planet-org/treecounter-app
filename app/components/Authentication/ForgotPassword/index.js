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
import { getLocalRoute } from '../../../actions/apiRouting';

let TCombForm = t.form.Form;

export default class Login extends Component {
  render() {
    return (
      <div className="app-container__content--center">
        <TextHeading>Forgot Your Password?</TextHeading>
        <CardLayout>
          <TCombForm
            ref="forgotPasswordForm"
            type={forgotPasswordFormSchema}
            options={schemaOptions}
          />
          <PrimaryButton onClick={this.props.onResetPassword}>
            Reset Password
          </PrimaryButton>
          <div className="text-center">
            <TextBlock>
              <InlineLink
                uri={getLocalRoute('app_login')}
                caption="Try to login again."
              />
            </TextBlock>
          </div>
        </CardLayout>
      </div>
    );
  }
}

Login.propTypes = {
  onResetPassword: PropTypes.func.isRequired
};
