import React, { Component } from 'react';

import TextHeading from '../../Common/Text/TextHeading';
import CardLayout from '../../Common/Card/CardLayout';
import TextBlock from '../../Common/Text/TextBlock';
import { RedEmail } from '../../../assets';
import SecondaryButton from '../../Common/Button/SecondaryButton';

export default class ActivateAccount extends Component {
  render() {
    return (
      <div className="app-container__content--center">
        <TextHeading>Activate Your Account</TextHeading>
        <CardLayout>
          <img src={RedEmail} />
          <div className={'gap'} />
          <TextBlock strong={true}>
            You have not yet activated your account.
          </TextBlock>
          <div className={'gap'} />
          <TextBlock>
            You should have received an email when you signed up. Please click
            the activation link provided in this email to complete the sign-up
            process.
          </TextBlock>
          <div className={'gap'} />
          <TextBlock>
            If you didn‘t receive the activation email, click in the link below
            to resend it.
          </TextBlock>
          <div className={'gap'} />
          <SecondaryButton>Resend email</SecondaryButton>
        </CardLayout>
      </div>
    );
  }
}
