import React, { Component, Suspense, lazy } from 'react';

const TextHeading = lazy(() => import('../../Common/Heading/TextHeading'));
const CardLayout = lazy(() => import('../../Common/Card'));
const TextBlock = lazy(() => import('../../Common/Text/TextBlock'));
const InlineLink = lazy(() => import('../../../components/Common/InlineLink'));

import PropTypes from 'prop-types';
import i18n from '../../../locales/i18n.js';
import { check_green, redeemSignIn } from '../../../assets';

export default class SuccessfullyActivatedAccount extends Component {
  render() {
    const setTarget = (
      <InlineLink uri={'app_userHome'} caption={i18n.t('label.set_a_target')} />
    );
    const customizeProfile = (
      <InlineLink
        uri={'app_userHome'}
        caption={i18n.t('label.customize_your_profile')}
      />
    );
    const login = (
      <InlineLink caption={i18n.t('label.login')} uri={'app_login'} />
    );

    return (
      <div className="app-container__content--center sidenav-wrapper">
        <TextHeading>{i18n.t('label.account_activation')}</TextHeading>
        <CardLayout>
          {this.props.success ? (
            <img src={check_green} />
          ) : (
            <img src={redeemSignIn} />
          )}
          <div className={'gap'} />
          {this.props.success ? (
            <TextBlock>{i18n.t('label.successfully_activated')}</TextBlock>
          ) : (
            <TextBlock>{i18n.t('label.already_activated')}</TextBlock>
          )}
          <div className={'gap'} />

          {this.props.success ? (
            <TextBlock>
              {i18n.t('label.do_profile_or_target') + ' '} {customizeProfile}{' '}
              {' ' + i18n.t('label.or') + ' '} {setTarget} {'.'}
            </TextBlock>
          ) : (
            <TextBlock>
              {i18n.t('label.do_login') + ' '} {login} {'.'}
            </TextBlock>
          )}
        </CardLayout>
      </div>
    );
  }
}
SuccessfullyActivatedAccount.propTypes = {
  success: PropTypes.any
};
