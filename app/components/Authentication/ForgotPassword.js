import React, {Component} from 'react';
import LiForm from 'liform-react';

import CustomForm from '../Common/CustomForm';
import LoadingIndicator from '../Common/LoadingIndicator';
import ForgotPasswordSchema from '../../layouts/forgotpassword';
import {forgot_password} from '../../actions/authActions';

class ForgotPasswordContainer extends Component {
  constructor () {
    super ();
    this.state = {
      schema: {},
    };
  }
  componentDidMount () {
    ForgotPasswordSchema.subscribe (
      success => this.setState ({schema: success}),
      error => console.log (error)
    );
  }
  render () {
    return (
      <div>
        <div className="text-center">
          {this.state.loading ? <LoadingIndicator /> : null}
        </div>
        <LiForm
          schema={this.state.schema}
          onSubmit={forgot_password}
          baseForm={CustomForm}
          headline="Forgot Password?"
          buttonText="Send"
          buttonWidth="240"
        />
      </div>
    );
  }
}

export default ForgotPasswordContainer;
