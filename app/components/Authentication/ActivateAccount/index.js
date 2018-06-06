import React, { Component } from 'react';

import TextHeading from '../../Common/Heading/TextHeading';
import CardLayout from '../../Common/Card/CardLayout';
import TextBlock from '../../Common/Text/TextBlock';
import { RedEmail } from '../../../assets';
import SecondaryButton from '../../Common/Button/SecondaryButton';
import i18n from '../../../locales/i18n.js';
// { i18n.t('name.label', { lng }) }
let lng = 'en';
export default class ActivateAccount extends Component {
  render() {
    return (
      <div className="app-container__content--center sidenav-wrapper">
        <TextHeading>
          {i18n.t('label.activateAccountlabels.activate_ur_account', { lng })}
        </TextHeading>
        <CardLayout>
          <img src={RedEmail} />
          <div className={'gap'} />
          <TextBlock strong={true}>
            {i18n.t('label.activateAccountlabels.not_yet_activated', { lng })}
          </TextBlock>
          <div className={'gap'} />
          <TextBlock>
            {i18n.t('label.activateAccountlabels.received_email', { lng })}
          </TextBlock>
          <div className={'gap'} />
          <TextBlock>
            {i18n.t('label.activateAccountlabels.not_received_email', { lng })}
          </TextBlock>
          <div className={'gap'} />
          <SecondaryButton>
            {i18n.t('label.activateAccountlabels.resent_email', { lng })}
          </SecondaryButton>
        </CardLayout>
      </div>
    );
  }
}
