import React from 'react';

import { FooterLogos } from '../../assets';
import TransparentButton from '../Common/Button/TransparentButton';
import i18n from '../../locales/i18n.js';

const Footer = () => {
  return (
    <div className="app-container__footer">
      <div className="app-container__footerimage">
        <img className="footer-logo" src={FooterLogos} />
      </div>

      <div className="app-container__buttons">
        <TransparentButton onClick={() => console.log('imprint')}>
          <span>{i18n.t('label.imprint')}</span>
        </TransparentButton>
        <TransparentButton onClick={() => console.log('privacy')}>
          <span>{i18n.t('label.privacy')}</span>
        </TransparentButton>
      </div>
    </div>
  );
};

export default Footer;
