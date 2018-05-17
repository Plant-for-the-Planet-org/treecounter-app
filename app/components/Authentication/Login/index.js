import React, { Component } from 'react';
import PropTypes from 'prop-types';
import t from 'tcomb-form';

import { loginFormSchema } from '../../../server/formSchemas/login.native';

// import LiForm from 'liform-react';

// import CustomForm from '../Common/CustomForm';
import LoginFooter from './LoginFooter';

let TCombForm = t.form.Form;

export default class Login extends Component {
  render() {
    return (
      <div className="app-login">
        <h2 className="pftp-heading">Log In</h2>
        <div className="card-layout">
          <TCombForm ref="loginForm" type={loginFormSchema} />
          {/* <LiForm
            schema={loginFormSchema}
            onSubmit={this.props.onClick}
            baseForm={CustomForm}
            buttonText="Log In"
            buttonWidth="240"
          /> */}
          <LoginFooter />
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  onClick: PropTypes.func.isRequired
};
