import React from 'react';

import InlineLink from '../../Common/InlineLink';
import TextBlock from '../../Common/Text/TextBlock';
import { getLocalRoute } from '../../../actions/apiRouting';

const ForgotPassword = () => (
  <TextBlock>
    Forgot your password?&nbsp;
    <InlineLink uri={getLocalRoute('app_forgotPassword')} caption="Reset." />
  </TextBlock>
);

const Register = () => (
  <TextBlock>
    Don't have an account?&nbsp;
    <InlineLink uri={getLocalRoute('app_signup')} caption="Sign up." />
  </TextBlock>
);

const LoginFooter = () => (
  <div className="text-center">
    <ForgotPassword />
    <Register />
  </div>
);

export default LoginFooter;
