import React from 'react';
import { loadingBar } from '../../assets';
import i18n from '../../locales/i18n.js';
let lng = 'en';

const LoadingIndicator = () => (
  <div id="loading-indicator" style={loadingIndicatorStyle} className="active">
    <img src={loadingBar} alt={i18n.t('label.commonlabels.loading', { lng })} />
  </div>
);

const loadingIndicatorStyle = {
  marginTop: '30px'
};

export default LoadingIndicator;
