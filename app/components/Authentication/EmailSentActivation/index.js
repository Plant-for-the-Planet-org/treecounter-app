import React, { Component } from 'react';

import TextHeading from '../../Common/Heading/TextHeading';
import CardLayout from '../../Common/Card';
import InlineLink from '../../Common/InlineLink';
import TextBlock from '../../Common/Text/TextBlock';
import { RedEmail } from '../../../assets';
import i18n from '../../../locales/i18n.js';

export default class EmailSentActivation extends Component {
  render() {
    return (
      <div className="app-container__content--center sidenav-wrapper">
        <TextHeading>{i18n.t('label.activate_ur_account')}</TextHeading>
        <CardLayout>
          <img src={RedEmail} />
          <div className={'gap'} />
          <TextBlock>{i18n.t('label.mail_sent_activation')}</TextBlock>
          <div className={'gap'} />
          <TextBlock>{i18n.t('label.complete_sigup_process')}</TextBlock>
          <div className={'gap'} />
          <TextBlock>{i18n.t('label.resend_email_text')}</TextBlock>
          <div className={'gap'} />
          <SecondaryButton onClick={() => this.props.sendEmail()}>
            {i18n.t('label.resent_email')}
          </SecondaryButton>
        </CardLayout>
      </div>
    );
  }
}

EmailSentActivation.propTypes = {
  sendEmail: PropTypes.func
};
