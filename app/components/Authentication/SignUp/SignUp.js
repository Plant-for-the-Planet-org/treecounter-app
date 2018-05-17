import React, { Component } from 'react';
import LiForm from 'liform-react';
import PropTypes from 'prop-types';

import signupFormSchema from '../../../server/formSchemas/signup';
import CustomForm from '../../Common/CustomForm';
import SignUpLayout from '../SignUpLayout';

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Profiletype: 'individual'
    };
    this.profile = this.profile.bind(this);
    this.onClick = props.onClick.bind(this, this.state.Profiletype);
  }
  profile(type) {
    this.setState({
      Profiletype: type
    });
  }

  render() {
    return (
      <div className="sidenav-wrapper">
        <SignUpLayout
          profile={this.profile}
          profiletype={this.state.Profiletype}
        />
        <LiForm
          schema={signupFormSchema[this.state.Profiletype]}
          baseForm={CustomForm}
          onSubmit={this.onClick}
          buttonText="Sign Up"
          buttonWidth="240"
        />
      </div>
    );
  }
}

SignUp.propTypes = {
  onClick: PropTypes.func.isRequired
};
