import React, { Component } from 'react';
import { bindActionCreators } from 'redux';

import * as signupschema from '../../layouts/registerSchema';
import Form from '../Common/Form';
import { userSignupRequest } from '../../actions/signupActions';
import CustomForm from '../Common/CustomForm';
import SignUpLayout from './SignUpLayout';
import LoadingIndicator from '../Common/LoadingIndicator';

class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      schema: {},
      value: 'individual',
      Profiletype: 'individual',
      loading: true
    };
    this.profile = this.profile.bind(this);
  }
  profile(type) {
    this.setState({ Profiletype: type });
    signupschema
      .SignUpSchema(type)
      .subscribe(
        success => this.setState({ schema: success, loading: false }),
        error => console.log(error)
      );
  }
  componentDidMount() {
    signupschema
      .SignUpSchema(this.state.value)
      .subscribe(
        success => this.setState({ schema: success, loading: false }),
        error => console.log(error)
      );
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
        <Form
          schema={this.state.schema}
          onSubmit={userSignupRequest}
          passparam={this.state.Profiletype}
          buttonText="Register"
          buttonWidth="240"
        />
      </div>
    );
  }
}

export default SignUp;
