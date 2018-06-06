import React from 'react';

import InlineLink from '../../Common/InlineLink';
import TextBlock from '../../Common/Text/TextBlock';
import i18n from '../../../locales/i18n.js';
let lng = 'en';

const ForgotPassword = () => (
  <TextBlock>
    {i18n.t('label.loginlabels.forgot_password', { lng })}&nbsp;
    <InlineLink
      uri={'app_forgotPassword'}
      caption={i18n.t('label.loginlabels.reset', { lng })}
    />
  </TextBlock>
);

const Register = () => (
  <TextBlock>
    {i18n.t('label.loginlabels.dont_have_account', { lng })}&nbsp;
    <InlineLink
      uri={'app_signup'}
      caption={i18n.t('label.loginlabels.signup', { lng })}
    />
  </TextBlock>
);

const LoginFooter = () => (
  <div className="text-center">
    <ForgotPassword />
    <Register />
  </div>
);

export default LoginFooter;
