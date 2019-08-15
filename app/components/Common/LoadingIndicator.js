import React from 'react';
import { loadingBar } from '../../assets';
import i18n from '../../locales/i18n.js';

const LoadingIndicator = () => (
  <div id="loading-indicator" style={loadingIndicatorStyle} className="active">
    <img src={loadingBar} alt={i18n.t('label.loading')} />
  </div>
);

const loadingIndicatorStyle = {
  marginTop: '30px'
};

export default LoadingIndicator;
