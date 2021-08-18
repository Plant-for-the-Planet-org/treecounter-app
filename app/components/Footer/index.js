import React from 'react';

import { FooterLogos } from '../../assets';
import TransparentButton from '../Common/Button/TransparentButton';
import i18n from '../../locales/i18n.js';
import { updateRoute } from '../../helpers/routerHelper';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const Footer = () => {
  return (
    <div className="sidenav-wrapper app-container__footer">
      <div className="app-container__footerimage">
        <img className="footer-logo" src={FooterLogos} />
      </div>

      <div className="app-container__buttons">
        <a
          className="pftp-button-transparent"
          href="https://a.plant-for-the-planet.org/imprint"
        >
          <span>{i18n.t('label.imprint')}</span>
        </a>
        <span className="seprator">|</span>
        <a
          className="pftp-button-transparent"
          href="https://a.plant-for-the-planet.org/privacy-terms"
        >
          <span>{i18n.t('label.privacy')}</span>
        </a>
        <span className="seprator">|</span>
        <a
          className="pftp-button-transparent"
          href="mailto:support@trilliontreecampaign.org"
        >
          <span>{i18n.t('label.contact')}</span>
        </a>
        <span className="seprator">|</span>
        <a
          className="pftp-button-transparent"
          href="https://a.plant-for-the-planet.org/faq"
        >
          <span>{i18n.t('label.faqs')}</span>
        </a>
      </div>
    </div>
  );
};
const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      route: (routeName, id) => dispatch => updateRoute(routeName, dispatch, id)
    },
    dispatch
  );
};

export default connect(mapDispatchToProps)(Footer);
