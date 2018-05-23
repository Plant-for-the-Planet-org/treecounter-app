import React from 'react';
import { loadingBar } from '../../assets';

const LoadingIndicator = () => (
  <div id="loading-indicator" style={loadingIndicatorStyle} className="active">
    <img src={loadingBar} alt="loading ..." />
  </div>
);

const loadingIndicatorStyle = {
  marginTop: '30px'
};

export default LoadingIndicator;
