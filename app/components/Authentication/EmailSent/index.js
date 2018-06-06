import React, { Component } from 'react';

import TextHeading from '../../Common/Heading/TextHeading';
import CardLayout from '../../Common/Card/CardLayout';
import InlineLink from '../../Common/InlineLink';
import TextBlock from '../../Common/Text/TextBlock';
import { GreenEmail } from '../../../assets';
import i18n from '../../../locales/i18n.js';
let lng = 'en';

export default class EmailSent extends Component {
  render() {
    return (
      <div className="app-container__content--center sidenav-wrapper">
        <TextHeading>
          {i18n.t('label.emailSentlabels.forgot_ur_password', { lng })}
        </TextHeading>
        <CardLayout>
          <img src={GreenEmail} />
          <div className={'gap'} />
          <TextBlock strong={true}>
            {i18n.t('label.emailSentlabels.mail_sent', { lng })}
          </TextBlock>
          <div className={'gap'} />
          <TextBlock>
            {i18n.t('label.emailSentlabels.secure_link', { lng })}
          </TextBlock>
          <div className={'gap'} />
          <TextBlock>
            <InlineLink
              uri={'app_login'}
              caption={i18n.t('label.emailSentlabels.try_again_login', { lng })}
            />
          </TextBlock>
        </CardLayout>
      </div>
    );
  }
}
