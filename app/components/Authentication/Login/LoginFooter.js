import React from 'react';

import InlineLink from '../../Common/InlineLink';
import TextBlock from '../../Common/Text/TextBlock';
import i18n from '../../../locales/i18n.js';
const nbsp = '&nbsp;';
const ForgotPassword = () => (
  <TextBlock>
    {i18n.t('label.forgot_ur_password')}
    {nbsp}
    <InlineLink uri={'app_forgotPassword'} caption={i18n.t('label.reset')} />
  </TextBlock>
);

const Register = () => (
  <TextBlock>
    {i18n.t('label.dont_have_account')}
    {nbsp}
    <InlineLink uri={'app_signup'} caption={i18n.t('label.signUp') + '.'} />
  </TextBlock>
);

const LoginFooter = () => (
  <div className="text-center">
    <ForgotPassword />
    <Register />
  </div>
);

export default LoginFooter;
