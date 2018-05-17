import React, { Component } from 'react';
import PropTypes from 'prop-types';
import t from 'tcomb-form';

import {
  loginFormSchema,
  schemaOptions
} from '../../../server/formSchemas/login.native';
import PrimaryButton from '../../Common/Button/PrimaryButton';
import TextHeading from '../../Common/Text/TextHeading';
import CardLayout from '../../Common/Card/CardLayout';
import LoginFooter from './LoginFooter';
let TCombForm = t.form.Form;

export default class Login extends Component {
  render() {
    return (
      <div className="app-login">
        <TextHeading>Log In</TextHeading>
        <CardLayout>
          <TCombForm
            ref="loginForm"
            type={loginFormSchema}
            options={schemaOptions}
          />
          <PrimaryButton onClick={this.props.onClick}>Log In</PrimaryButton>
          <LoginFooter />
        </CardLayout>
      </div>
    );
  }
}

Login.propTypes = {
  onClick: PropTypes.func.isRequired
};
