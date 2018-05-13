import React from 'react';

import InlineLink from '../Common/InlineLink';
import * as constants from '../../config/formStrings';
import { getLocalRoute } from '../../actions/apiRouting';

const ForgetPassword = () => (
  <InlineLink
    uri={getLocalRoute('app_forgotPassword')}
    caption={constants.formStrings.forgotPassword}
  />
);
const Register = () => (
  <InlineLink
    uri={getLocalRoute('app_signup')}
    caption={constants.formStrings.register}
  />
);

const LoginFooter = () => (
  <div className="text-center">
    <ForgetPassword />
    <br />
    {constants.formStrings.createAccount}
    <Register />
  </div>
);

export default LoginFooter;
