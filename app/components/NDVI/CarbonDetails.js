import React from 'react';
import PropTypes from 'prop-types';

const CarbonDetails = props => {
  const onClickHelp = _ => {
    props.onClickHelp('help');
  };
  return (
    <React.Fragment>
      <div className="carbon-details-container">
        <div className="row">
          <div className="flex-1 carbon-value-box">
            <h5>{props.carbonValue} Kg</h5>
          </div>
          <div className="flex-1 text-center btn-container">
            <button onClick={onClickHelp}>?</button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default CarbonDetails;

CarbonDetails.propTypes = {
  carbonValue: PropTypes.number,
  onClickHelp: PropTypes.func
};
