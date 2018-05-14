import React, { Component } from 'react';
import LiForm from 'liform-react';

import signupFormSchema from '../../server/formSchemas/signup';
import CustomForm from '../Common/CustomForm';
import { userSignupRequest } from '../../actions/signupActions';
import SignUpLayout from './SignUpLayout';
import LoadingIndicator from '../Common/LoadingIndicator';

export default class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      schema: signupFormSchema.individual,
      Profiletype: 'individual'
    };
    this.profile = this.profile.bind(this);
  }
  profile(type) {
    this.setState({
      schema: signupFormSchema[type],
      Profiletype: type
    });
  }

  render() {
    return this.state.loading ? (
      <div className="sidenav-wrapper">
        <SignUpLayout
          profile={this.profile}
          profiletype={this.state.Profiletype}
        />
        <div className="center-wrapper">
          <LoadingIndicator />
        </div>
      </div>
    ) : (
      <div className="sidenav-wrapper">
        <SignUpLayout
          profile={this.profile}
          profiletype={this.state.Profiletype}
        />
        <LiForm
          schema={this.state.schema}
          baseForm={CustomForm}
          onSubmit={userSignupRequest.bind(this, this.state.Profiletype)}
          buttonText="Register"
          buttonWidth="240"
        />
      </div>
    );
  }
}
