import React, { Component } from 'react';
import PropTypes from 'prop-types';
import t from 'tcomb-form';

import {
  loginFormSchema,
  schemaOptions
} from '../../../server/formSchemas/login.native';
import PrimaryButton from '../../Common/Button/PrimaryButton';

import LoginFooter from './LoginFooter';

let TCombForm = t.form.Form;

export default class Login extends Component {
  render() {
    return (
      <div className="app-login">
        <h2 className="pftp-heading">Log In</h2>
        <div className="card-layout">
          <TCombForm
            ref="loginForm"
            type={loginFormSchema}
            options={schemaOptions}
          />
          <PrimaryButton onClick={this.props.onClick}>Log In</PrimaryButton>
          <LoginFooter />
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  onClick: PropTypes.func.isRequired
};
