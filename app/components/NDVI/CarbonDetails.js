import React from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';
import { questionmark_orange } from '../../assets';

const CarbonDetails = props => {
  return (
    <React.Fragment>
      <div className="carbon-details-container">
        <div className="row">
          <div className="flex-1 carbon-value-box">
            <h5>{props.carbonValue} Kg</h5>
          </div>
          <div className="flex-1 text-center btn-container">
            <div className="tooltip">
              <a data-tip data-for="dedicate-trees-icon">
                <img src={questionmark_orange} />
              </a>
              <ReactTooltip id="dedicate-trees-icon" effect="solid" type="dark">
                <span className="tooltip-text">
                  {props.toolTipHelpButtonSpell
                    ? props.toolTipHelpButtonSpell
                    : 'none'}
                </span>
              </ReactTooltip>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default CarbonDetails;

CarbonDetails.propTypes = {
  carbonValue: PropTypes.number,
  toolTipHelpButtonSpell: PropTypes.string
};
