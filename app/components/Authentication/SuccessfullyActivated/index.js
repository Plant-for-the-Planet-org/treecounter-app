import React from 'react';

import TextHeading from '../../Common/Heading/TextHeading';
import CardLayout from '../../Common/Card';
import TextBlock from '../../Common/Text/TextBlock';
import { check_green } from '../../../assets';
import InlineLink from '../../../components/Common/InlineLink';

const SuccessfullyActivatedAccount = () => {
  const setTarget = <InlineLink uri={'app_userHome'} caption="set a target" />;
  const customizeProfile = (
    <InlineLink uri={'app_userHome'} caption="customize your profile" />
  );

  return (
    <div className="app-container__content--center sidenav-wrapper">
      <TextHeading>Account Activation</TextHeading>
      <CardLayout>
        <img src={check_green} />
        <div className={'gap'} />
        <TextBlock>
          You have successfully activated your <br />account.
        </TextBlock>
        <div className={'gap'} />
        <TextBlock>
          You can {customizeProfile} now <br />or {setTarget}
        </TextBlock>
      </CardLayout>
    </div>
  );
};

export default SuccessfullyActivatedAccount;
