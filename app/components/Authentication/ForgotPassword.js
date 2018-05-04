import React, { Component } from 'react';
import ForgotPasswordSchema from '../../layouts/forgotpassword';
import { forgot_password } from '../../actions/authActions';
import Form from '../Common/Form';

class ForgotPasswordContainer extends Component {
  constructor() {
    super();
    this.state = {
      schema: {}
    };
  }
  componentDidMount() {
    ForgotPasswordSchema.subscribe(
      success => this.setState({ schema: success }),
      error => console.log(error)
    );
  }
  render() {
    return (
      <div>
        <div className="text-center">
          {this.state.loading ? <LoadingIndicator /> : null}
        </div>
        <Form
          schema={this.state.schema}
          onSubmit={forgot_password}
          headline="Forgot Password?"
          buttonText="Send"
          buttonWidth="240"
        />
      </div>
    );
  }
}

export default ForgotPasswordContainer;
