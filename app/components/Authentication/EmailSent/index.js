import React, { Component } from 'react';

import TextHeading from '../../Common/Heading/TextHeading';
import CardLayout from '../../Common/Card/CardLayout';
import InlineLink from '../../Common/InlineLink';
import TextBlock from '../../Common/Text/TextBlock';
import { GreenEmail } from '../../../assets';

export default class EmailSent extends Component {
  render() {
    return (
      <div className="app-container__content--center sidenav-wrapper">
        <TextHeading>Forgot Your Password?</TextHeading>
        <CardLayout>
          <img src={GreenEmail} />
          <div className={'gap'} />
          <TextBlock strong={true}>We have just sent you an email.</TextBlock>
          <div className={'gap'} />
          <TextBlock>
            Click the secure link we sent you to reset your password. If you
            didn‘t receive an email, please check your spam folder.
          </TextBlock>
          <div className={'gap'} />
          <TextBlock>
            <InlineLink uri={'app_login'} caption="Try to login again." />
          </TextBlock>
        </CardLayout>
      </div>
    );
  }
}
