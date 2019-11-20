import React, { Component, lazy } from 'react';

const TextHeading = lazy(() => import('../../Common/Heading/TextHeading'));
const CardLayout = lazy(() => import('../../Common/Card'));
const InlineLink = lazy(() => import('../../Common/InlineLink'));
const TextBlock = lazy(() => import('../../Common/Text/TextBlock'));

import { GreenEmail } from '../../../assets';
import i18n from '../../../locales/i18n.js';

export default class EmailSent extends Component {
  render() {
    return (
      <div className="app-container__content--center sidenav-wrapper">
        <TextHeading>{i18n.t('label.forgot_ur_password')}</TextHeading>
        <CardLayout>
          <img src={GreenEmail} />
          <div className={'gap'} />
          <TextBlock strong>{i18n.t('label.mail_sent')}</TextBlock>
          <div className={'gap'} />
          <TextBlock>{i18n.t('label.secure_link')}</TextBlock>
          <div className={'gap'} />
          <TextBlock>
            <InlineLink
              uri={'app_login'}
              caption={i18n.t('label.try_again_login') + '.'}
            />
          </TextBlock>
        </CardLayout>
      </div>
    );
  }
}
