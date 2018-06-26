import React from 'react';

import { FooterLogos } from '../../assets';

const Footer = () => {
  return (
    <div className="app-container__footer sidenav-wrapper">
      <img className="footer-logo" src={FooterLogos} />
    </div>
  );
};

export default Footer;
