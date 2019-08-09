import React from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';
import { questionmark_orange } from '../../assets';
import { delimitNumbers } from '../../utils/utils';

const CarbonDetails = props => {
  return (
    <React.Fragment>
      <div className="carbon-details-container">
        <div className="row">
          <div className="flex-1 carbon-value-box">
            <h5>{delimitNumbers(props.carbonValue)} Kg</h5>
          </div>
          <div className="text-center btn-container">
            <div className="tooltip">
              <a data-tip data-for="carbon-details-icon">
                <img className="ndvi-img" src={questionmark_orange} />
              </a>
              <ReactTooltip id="carbon-details-icon" effect="solid" type="dark">
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
