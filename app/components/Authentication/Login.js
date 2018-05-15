import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LiForm from 'liform-react';

import loginFormSchema from '../../server/formSchemas/login';
import CustomForm from '../Common/CustomForm';
import LoginFooter from './LoginFooter';

export default class Login extends Component {
  render() {
    return (
      <div>
        <h2 className="cs-heading">Log In</h2>
        <LiForm
          schema={loginFormSchema}
          onSubmit={this.props.onClick}
          baseForm={CustomForm}
          buttonText="Log In"
          buttonWidth="240"
        />
        <LoginFooter />
      </div>
    );
  }
}

Login.propTypes = {
  onClick: PropTypes.func.isRequired
};
