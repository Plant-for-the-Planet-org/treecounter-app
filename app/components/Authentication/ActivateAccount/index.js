import React, { Component } from 'react';

import TextHeading from '../../Common/Heading/TextHeading';
import CardLayout from '../../Common/Card';
import TextBlock from '../../Common/Text/TextBlock';
import { RedEmail } from '../../../assets';
import SecondaryButton from '../../Common/Button/SecondaryButton';
import i18n from '../../../locales/i18n.js';

export default class ActivateAccount extends Component {
  render() {
    return (
      <div className="app-container__content--center sidenav-wrapper">
        <TextHeading>{i18n.t('label.activate_ur_account')}</TextHeading>
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
          <SecondaryButton>{i18n.t('label.resent_email')}</SecondaryButton>
        </CardLayout>
      </div>
    );
  }
}
