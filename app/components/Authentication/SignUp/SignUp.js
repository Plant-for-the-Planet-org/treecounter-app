import React, { Component } from 'react';
import PropTypes from 'prop-types';
import t from 'tcomb-form';

import PrimaryButton from '../../Common/Button/PrimaryButton';
import TextHeading from '../../Common/Heading/TextHeading';
import CardLayout from '../../Common/Card/CardLayout';
import SignUpType from './SignUpType';
import { SignupJustMe, SignupOrganization } from '../../../assets';
import {
  schemaOptions,
  signupFormSchema
} from '../../../server/parsedSchemas/signup';

let TCombForm = t.form.Form;

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Profiletype: 'individual'
    };
    this.ProfileChange = this.ProfileChange.bind(this);
  }

  ProfileChange(type) {
    this.setState({
      Profiletype: type
    });
  }

  render() {
    let { Profiletype } = this.state;
    return (
      <div className="app-container__content--center sidenav-wrapper">
        <TextHeading>Join In</TextHeading>
        <div className="signup-types">
          <SignUpType
            active={Profiletype === 'tpo'}
            imgSrc={SignupOrganization}
            salutation="I am a"
            title="Tree-Planting Organisation"
            type="tpo"
            onProfileClick={this.ProfileChange}
          />
          <SignUpType
            active={Profiletype === 'individual'}
            imgSrc={SignupJustMe}
            salutation="I am"
            title="Just me"
            type="individual"
            onProfileClick={this.ProfileChange}
          />
          <SignUpType
            active={Profiletype === 'company'}
            imgSrc={SignupOrganization}
            salutation="I am a"
            title="Company"
            type="company"
            onProfileClick={this.ProfileChange}
          />
          <SignUpType
            active={Profiletype === 'education'}
            imgSrc={SignupOrganization}
            salutation="I am a"
            title="School"
            type="education"
            onProfileClick={this.ProfileChange}
          />
        </div>
        <div className={'singup-card-width'}>
          <CardLayout>
            <TCombForm
              ref={'signupForm'}
              type={signupFormSchema[Profiletype]}
              options={schemaOptions[Profiletype]}
            />
            <PrimaryButton
              onClick={this.props.onSignUpClicked.bind(this, Profiletype)}
            >
              Sign Up
            </PrimaryButton>
          </CardLayout>
        </div>
      </div>
    );
  }
}

SignUp.propTypes = {
  onSignUpClicked: PropTypes.func.isRequired
};
