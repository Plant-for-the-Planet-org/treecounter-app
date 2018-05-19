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
    this.ProfileChange = this.ProfileChange.bind(this);
    this.onClick = props.onClick.bind(this, this.state.Profiletype);
  }

  ProfileChange(type) {
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
            active={this.state.Profiletype === 'tpo'}
            imgSrc={SignupOrganization}
            salutation="I am a"
            title="Tree-Planting Organisation"
            type="tpo"
            onProfileClick={this.ProfileChange}
          />
          <SignUpType
            active={this.state.Profiletype === 'individual'}
            imgSrc={SignupJustMe}
            salutation="I am"
            title="Just me"
            type="individual"
            onProfileClick={this.ProfileChange}
          />
          <SignUpType
            active={this.state.Profiletype === 'company'}
            imgSrc={SignupOrganization}
            salutation="I am a"
            title="Company"
            type="company"
            onProfileClick={this.ProfileChange}
          />
          <SignUpType
            active={this.state.Profiletype === 'education'}
            imgSrc={SignupOrganization}
            salutation="I am a"
            title="School"
            type="education"
            onProfileClick={this.ProfileChange}
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
      </div>
    );
  }
}

SignUp.propTypes = {
  onClick: PropTypes.func.isRequired
};
