import React from 'react';
import PropTypes from 'prop-types';

const LoadingNDVI = props => {
  const onClick = () => {
    props.onRefreshClick('CLICKED REFRESH');
  };

  return (
    <div className="loading-ndvi-container">
      <div className="row">
        <div className="flex-1">
          <h5 className="fetching-paragraph">
            {props.paragraphSpell
              ? props.paragraphSpell
              : 'Currently Fetching NDVI. Please check in a minute or two.'}
          </h5>
        </div>
      </div>
      <div className="row">
        <div className="flex-1 refresh-box">
          <button onClick={onClick} type="button" className="refresh-btn">
            {props.refreshButtonSpell ? props.refreshButtonSpell : 'Refresh'}
          </button>
        </div>
        <div className="flex-1 text-center help-btn">
          <button type="button">?</button>
        </div>
      </div>
    </div>
  );
};

export default LoadingNDVI;

LoadingNDVI.propTypes = {
  paragraphSpell: PropTypes.string,
  refreshButtonSpell: PropTypes.string,
  onRefreshClick: PropTypes.func
};
