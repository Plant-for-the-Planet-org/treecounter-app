import React from 'react';

const LoadingIndicator = () => (
  <div id="loading-indicator" style={loadingIndicatorStyle} className="active">
    <img src="/web/images/loading-bar.gif" alt="loading ..." />
  </div>
);

const loadingIndicatorStyle = {
  marginTop: '30px'
};

export default LoadingIndicator;
