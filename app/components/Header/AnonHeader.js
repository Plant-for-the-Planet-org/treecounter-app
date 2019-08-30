import React from 'react';

import i18n from '../../locales/i18n.js';
import RoundedButton from '../Common/Button/RoundedButton';
import { updateRoute } from '../../helpers/routerHelper/routerHelper';

const AnonHeader = () => {
  return (
    <div className="header-icons">
      <RoundedButton onClick={() => updateRoute('app_login')}>
        {i18n.t('label.login')}
      </RoundedButton>
      <RoundedButton onClick={() => updateRoute('app_signup')}>
        {i18n.t('label.signUp')}
      </RoundedButton>
      {/* <ProfilePickerModal
    isOpen={this.state.profilePickerModal}
    onRequestClose={this.closeProfilePickerModal.bind(this)}
    pickupProfile={this.pickupProfile.bind(this)}
  /> */}
    </div>
  );
};

export default AnonHeader;
