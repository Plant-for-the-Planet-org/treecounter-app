import React, { Component } from 'react';
import LiForm from 'liform-react';
import PropTypes from 'prop-types';

import CustomForm from '../Common/CustomForm';
import forgotPasswordFormSchema from '../../server/formSchemas/forgotpassword';

export default class ForgotPassword extends Component {
  render() {
    return (
      <div>
        <LiForm
          schema={forgotPasswordFormSchema}
          onSubmit={this.props.onClick}
          baseForm={CustomForm}
          headline="Reset Password"
          buttonText="Send"
          buttonWidth="240"
        />
      </div>
    );
  }
}

ForgotPassword.propTypes = {
  onClick: PropTypes.func.isRequired
};
