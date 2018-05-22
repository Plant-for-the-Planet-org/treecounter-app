import React from 'react';

import InlineLink from '../../Common/InlineLink';
import TextBlock from '../../Common/Text/TextBlock';

const ForgotPassword = () => (
  <TextBlock>
    Forgot your password?&nbsp;
    <InlineLink uri={'app_forgotPassword'} caption="Reset." />
  </TextBlock>
);

const Register = () => (
  <TextBlock>
    Don't have an account?&nbsp;
    <InlineLink uri={'app_signup'} caption="Sign up." />
  </TextBlock>
);

const LoginFooter = () => (
  <div className="text-center">
    <ForgotPassword />
    <Register />
  </div>
);

export default LoginFooter;
