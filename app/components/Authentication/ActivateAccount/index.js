import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TextHeading from '../../Common/Heading/TextHeading';
import CardLayout from '../../Common/Card';
import TextBlock from '../../Common/Text/TextBlock';
import { RedEmail } from '../../../assets';
import SecondaryButton from '../../Common/Button/SecondaryButton';
import i18n from '../../../locales/i18n.js';

export default class ActivateAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sentClicked: false
    };
  }
  render() {
    return (
      <div className="app-container__content--center sidenav-wrapper">
        <TextHeading>{i18n.t('label.activate_ur_account')}</TextHeading>
        {this.state.sentClicked ? (
          <CardLayout>
            <img src={RedEmail} />
            <div className={'gap'} />
            <TextBlock>{i18n.t('label.mail_sent_activation')}</TextBlock>
            <TextBlock>{i18n.t('label.complete_sigup_process')}</TextBlock>
            <div className={'gap'} />
            <TextBlock>{i18n.t('label.resend_email_text')}</TextBlock>
            <div className={'gap'} />
            <SecondaryButton
              onClick={() => {
                this.setState({ sentClicked: true });
                this.props.sendEmail();
              }}
            >
              {i18n.t('label.resent_email')}
            </SecondaryButton>
          </CardLayout>
        ) : (
          <CardLayout>
            <img src={RedEmail} />
            <div className={'gap'} />
            <TextBlock strong={true}>
              {i18n.t('label.not_yet_activated')}
            </TextBlock>
            <div className={'gap'} />
            <TextBlock>{i18n.t('label.received_email')}</TextBlock>
            <div className={'gap'} />
            <TextBlock>{i18n.t('label.not_received_email')}</TextBlock>
            <div className={'gap'} />
            <SecondaryButton
              onClick={() => {
                this.setState({ sentClicked: true });
                this.props.sendEmail();
              }}
            >
              {i18n.t('label.resent_email')}
            </SecondaryButton>
          </CardLayout>
        )}
      </div>
    );
  }
}

ActivateAccount.propTypes = {
  sendEmail: PropTypes.func,
  email: PropTypes.string
};
