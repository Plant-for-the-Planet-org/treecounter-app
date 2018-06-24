import React from 'react';

import { FooterLogos, FooterMobileLogos } from '../../assets';

const Footer = () => {
  return (
    <div className="app-container__footer sidenav-wrapper">
      <img className="footer-logo" src={FooterLogos} />
      <img className="footer-logo-mobile" src={FooterMobileLogos} />
    </div>
  );
};

export default Footer;
