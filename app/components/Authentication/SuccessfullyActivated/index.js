import React, { Component } from 'react';

import TextHeading from '../../Common/Heading/TextHeading';
import CardLayout from '../../Common/Card';
import TextBlock from '../../Common/Text/TextBlock';
import PropTypes from 'prop-types';

import { check_green, redeemSignIn } from '../../../assets';
import InlineLink from '../../../components/Common/InlineLink';

export default class SuccessfullyActivatedAccount extends Component {
  render() {
    const setTarget = (
      <InlineLink uri={'app_userHome'} caption="set a target" />
    );
    const customizeProfile = (
      <InlineLink uri={'app_userHome'} caption="customize your profile" />
    );
    const login = <InlineLink caption="log in" uri={'app_login'} />;

    return (
      <div className="app-container__content--center sidenav-wrapper">
        <TextHeading>Account Activation</TextHeading>
        <CardLayout>
          {this.props.success ? (
            <img src={check_green} />
          ) : (
            <img src={redeemSignIn} />
          )}
          <div className={'gap'} />
          {this.props.success ? (
            <TextBlock>
              You have successfully activated your <br />account.)
            </TextBlock>
          ) : (
            <TextBlock>
              Your account has already been activated <br />previously.
            </TextBlock>
          )}
          <div className={'gap'} />

          {this.props.success ? (
            <TextBlock>
              You can {customizeProfile} now <br />or {setTarget}
            </TextBlock>
          ) : (
            <TextBlock>You can {login}.</TextBlock>
          )}
        </CardLayout>
      </div>
    );
  }
}
SuccessfullyActivatedAccount.propTypes = {
  success: PropTypes.any
};
