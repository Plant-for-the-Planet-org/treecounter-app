import React from 'react';

import i18n from '../../locales/i18n.js';
import RoundedButton from '../Common/Button/RoundedButton';
// import { updateRoute } from '../../helpers/routerHelper/routerHelper';
import { useAuth0 } from '../auth0/Auth0Provider';

const AnonHeader = ({ hidden = false }) => {
  // Temporarily inserting a direct action to login here until
  // 'auth0_authorize' route can be added.
  const { loginWithRedirect } = useAuth0();

  const authorize = () =>
    loginWithRedirect({
      redirect_uri: `${window.location.origin}/auth0-callback`
    });

  return (
    <div className={`header-icons ${hidden ? 'hidden' : ''}`}>
      <RoundedButton onClick={authorize}>{i18n.t('label.login')}</RoundedButton>
      <RoundedButton onClick={authorize}>
        {i18n.t('label.signUp')}
      </RoundedButton>
    </div>
  );
};

export default AnonHeader;
