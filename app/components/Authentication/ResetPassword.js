import React, {Component} from 'react';
import LiForm from 'liform-react';

import ResetPasswordSchema from '../../layouts/resetpassword';
import {reset_password} from '../../actions/authActions';
import CustomForm from '../Common/CustomForm';

class ResetPasswordContainer extends Component {
  constructor () {
    super ();
    this.state = {
      schema: {},
    };
  }
  componentDidMount () {
    ResetPasswordSchema.subscribe (
      success => this.setState ({schema: success}),
      error => console.log (error)
    );
  }
  render () {
    return (
      // read token from url and store in local storage
      // TODO
      // localStorage.setItem('jwt', token);
      (
        <LiForm
          schema={this.state.schema}
          onSubmit={values => reset_password (values)}
          baseForm={CustomForm}
          headline="Reset Password?"
          buttonText="Reset"
          buttonWidth="240"
        />
      )
    );
  }
}

export default ResetPasswordContainer;
