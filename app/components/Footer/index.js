import React, { lazy } from 'react';

import { FooterLogos } from '../../assets';

const TransparentButton = lazy(() =>
  import('../Common/Button/TransparentButton')
);

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
        <TransparentButton onClick={() => updateRoute('app_imprint')}>
          <span>{i18n.t('label.imprint')}</span>
        </TransparentButton>
        <span className="seprator">|</span>
        <TransparentButton onClick={() => updateRoute('app_privacy')}>
          <span>{i18n.t('label.privacy')}</span>
        </TransparentButton>
        <span className="seprator">|</span>
        <a
          className="pftp-button-transparent"
          href="mailto:support@trilliontreecampaign.org"
        >
          <span>{i18n.t('label.contact')}</span>
        </a>
        <span className="seprator">|</span>
        <TransparentButton onClick={() => updateRoute('app_faq')}>
          <span>{i18n.t('label.faqs')}</span>
        </TransparentButton>
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
