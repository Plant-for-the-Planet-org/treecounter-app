import React, { Component } from 'react';
import PropTypes from 'prop-types';
import loginFormSchema from '../../server/formSchemas/login';

import LiForm from 'liform-react';

import CustomForm from '../Common/CustomForm';
import LoginFooter from './LoginFooter';

export default class Login extends Component {
  render() {
    return (
      <div>
        <h2 className="pftp-heading">Log In</h2>
        <div className="card-layout login-card">
          <LiForm
            schema={loginFormSchema}
            onSubmit={this.props.onClick}
            baseForm={CustomForm}
            buttonText="Log In"
            buttonWidth="240"
          />
          <LoginFooter />
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  onClick: PropTypes.func.isRequired
};
