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
import i18n from '../../../locales/i18n.js';

let TCombForm = t.form.Form;

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Profiletype: i18n.t('label.individual')
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
        <TextHeading>{i18n.t('label.signup')}</TextHeading>
        <div className="signup-types">
          <SignUpType
            active={Profiletype === i18n.t('label.tpo')}
            imgSrc={SignupOrganization}
            salutation={i18n.t('label.i_am_a')}
            title={i18n.t('label.tpo_title')}
            type={i18n.t('label.tpo')}
            onProfileClick={this.ProfileChange}
          />
          <SignUpType
            active={Profiletype === i18n.t('label.individual')}
            imgSrc={SignupJustMe}
            salutation={i18n.t('label.i_am')}
            title={i18n.t('label.individual_title')}
            type={i18n.t('label.individual')}
            onProfileClick={this.ProfileChange}
          />
          <SignUpType
            active={Profiletype === i18n.t('label.company')}
            imgSrc={SignupOrganization}
            salutation={i18n.t('label.i_am_a')}
            title={i18n.t('label.company_title')}
            type={i18n.t('label.company')}
            onProfileClick={this.ProfileChange}
          />
          <SignUpType
            active={Profiletype === i18n.t('label.education')}
            imgSrc={SignupOrganization}
            salutation={i18n.t('label.i_am_a')}
            title={i18n.t('label.education_title')}
            type={i18n.t('label.education')}
            onProfileClick={this.ProfileChange}
          />
        </div>
        <div className={'card-width'}>
          <CardLayout>
            <TCombForm
              ref={'signupForm'}
              type={signupFormSchema[Profiletype]}
              options={schemaOptions[Profiletype]}
            />
            <PrimaryButton
              onClick={this.props.onSignUpClicked.bind(this, Profiletype)}
            >
              {i18n.t('label.signup_button')}
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
