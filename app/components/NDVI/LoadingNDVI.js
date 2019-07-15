import React from 'react';

const LoadingNDVI = _ => (
  <div className="loading-ndvi-container">
    <div className="row">
      <div className="flex-1">
        <h5 className="fetching-paragraph">
          Currently Fetching NDVI. Please check in a minute or two.
        </h5>
      </div>
    </div>
    <div className="row">
      <div className="flex-1 refresh-box">
        <button type="button" className="refresh-btn">
          Refresh
        </button>
      </div>
      <div className="flex-1 text-center help-btn">
        <button type="button">?</button>
      </div>
    </div>
  </div>
);

export default LoadingNDVI;
