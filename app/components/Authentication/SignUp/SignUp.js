import React, { Component } from 'react';
import PropTypes from 'prop-types';
import t from 'tcomb-form';

import PrimaryButton from '../../Common/Button/PrimaryButton';
import TextHeading from '../../Common/Text/TextHeading';
import CardLayout from '../../Common/Card/CardLayout';
import SignUpType from './SignUpType';
import { SignupJustMe, SignupOrganization } from '../../../assets';
import {
  schemaOptions,
  signupFormSchema
} from '../../../server/formSchemas/signup.native';

let TCombForm = t.form.Form;

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
      <div className="app-container__content--center">
        <TextHeading>Join In</TextHeading>
        <div className="signup-types">
          <SignUpType
            active="true"
            imgSrc={SignupOrganization}
            salutation="I am a"
            title="Tree-Planting Organisation"
          />
          <SignUpType
            active="false"
            imgSrc={SignupJustMe}
            salutation="I am"
            title="Just me"
          />
          <SignUpType
            active="false"
            imgSrc={SignupOrganization}
            salutation="I am a"
            title="Company"
          />
          <SignUpType
            active="false"
            imgSrc={SignupOrganization}
            salutation="I am a"
            title="School"
          />
        </div>
        <CardLayout>
          <TCombForm
            ref={'signupForm'}
            type={signupFormSchema[this.state.Profiletype]}
            options={schemaOptions[this.state.Profiletype]}
          />
          <PrimaryButton>Sign Up</PrimaryButton>
        </CardLayout>
        {/* <LiForm
          schema={signupFormSchema[this.state.Profiletype]}
          baseForm={CustomForm}
          onSubmit={this.onClick}
          buttonText="Sign Up"
          buttonWidth="240"
        /> */}
      </div>
    );
  }
}

SignUp.propTypes = {
  onClick: PropTypes.func.isRequired
};
