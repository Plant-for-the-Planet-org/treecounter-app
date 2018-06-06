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
let lng = 'en';

let TCombForm = t.form.Form;

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Profiletype: i18n.t('label.signUplabels.individual', { lng })
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
        <TextHeading>
          {i18n.t('label.signUplabels.signup', { lng })}
        </TextHeading>
        <div className="signup-types">
          <SignUpType
            active={Profiletype === i18n.t('label.signUplabels.tpo', { lng })}
            imgSrc={SignupOrganization}
            salutation={i18n.t('label.signUplabels.i_am_a', { lng })}
            title={i18n.t('label.signUplabels.tpo_title', { lng })}
            type={i18n.t('label.signUplabels.tpo', { lng })}
            onProfileClick={this.ProfileChange}
          />
          <SignUpType
            active={
              Profiletype === i18n.t('label.signUplabels.individual', { lng })
            }
            imgSrc={SignupJustMe}
            salutation={i18n.t('label.signUplabels.i_am', { lng })}
            title={i18n.t('label.signUplabels.individual_title', { lng })}
            type={i18n.t('label.signUplabels.individual', { lng })}
            onProfileClick={this.ProfileChange}
          />
          <SignUpType
            active={
              Profiletype === i18n.t('label.signUplabels.company', { lng })
            }
            imgSrc={SignupOrganization}
            salutation={i18n.t('label.signUplabels.i_am_a', { lng })}
            title={i18n.t('label.signUplabels.company_title', { lng })}
            type={i18n.t('label.signUplabels.company', { lng })}
            onProfileClick={this.ProfileChange}
          />
          <SignUpType
            active={
              Profiletype === i18n.t('label.signUplabels.education', { lng })
            }
            imgSrc={SignupOrganization}
            salutation={i18n.t('label.signUplabels.i_am_a', { lng })}
            title={i18n.t('label.signUplabels.education_title', { lng })}
            type={i18n.t('label.signUplabels.education', { lng })}
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
              {i18n.t('label.signUplabels.signup_button', { lng })}
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
