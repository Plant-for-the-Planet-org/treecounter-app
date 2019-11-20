import React, { lazy } from 'react';
import PropTypes from 'prop-types';

const PrimaryButton = lazy(() => import('../Common/Button/PrimaryButton'));

import ReactTooltip from 'react-tooltip';
import { questionmark_orange } from '../../assets';

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
        <div className="text-center btn-container">
          <div className="tooltip">
            <a data-tip data-for="loading-ndvi-icon">
              <img className="ndvi-img" src={questionmark_orange} />
            </a>
            <ReactTooltip
              id="loading-ndvi-icon"
              place="left"
              effect="solid"
              type="dark"
            >
              <span className="tooltip-text">
                {props.toolTipHelpButtonSpell
                  ? props.toolTipHelpButtonSpell
                  : 'none'}
              </span>
            </ReactTooltip>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="flex-1 refresh-box select-project_button__container">
          <PrimaryButton onClick={onClick}>
            {props.refreshButtonSpell ? props.refreshButtonSpell : 'Refresh'}
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
};

export default LoadingNDVI;

LoadingNDVI.propTypes = {
  paragraphSpell: PropTypes.string,
  refreshButtonSpell: PropTypes.string,
  onRefreshClick: PropTypes.func,
  toolTipHelpButtonSpell: PropTypes.string
};
