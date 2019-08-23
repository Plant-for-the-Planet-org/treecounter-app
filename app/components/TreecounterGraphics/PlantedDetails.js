import React from 'react';
import PropTypes from 'prop-types';
import i18n from '../../locales/i18n.js';
import ReactTooltip from 'react-tooltip';
import { questionmark_orange, close_green } from '../../assets';
import { tree, tree_outline } from '../../assets';
import { delimitNumbers } from '../../utils/utils';

const PlantedDetails = ({ personal, community, type, onToggle }) => (
  <div className="svg-text-container">
    <div className="svg-text-container__row">
      <div className="svg-text-container__row--col" />
      <div className="svg-text-container__row--col" />

      <div className="svg-text-container__row--col2 closeContainer">
        <img
          className="smallImage"
          src={close_green}
          onClick={() => onToggle(false)}
        />
      </div>
    </div>

    <div className="svg-text-container__row">
      <img className="svg-text-container__row--col" src={tree} />
      <div className="svg-text-container__row--col">
        <div className="textLabel">
          {i18n.t(
            'individual' === type
              ? 'label.individual_plant_personal'
              : 'label.tpo_plant_personal'
          )}
        </div>
        <div>
          <strong>{personal}</strong>
        </div>
      </div>
    </div>

    <hr className="svg-text-container__bar" />

    <div className="svg-text-container__row">
      <img className="svg-text-container__row--col" src={tree_outline} />
      <div className="svg-text-container__row--col">
        <div className="community_row">
          <div className="communtiy_col textLabel">
            {i18n.t(
              'individual' === type
                ? 'label.individual_plant_community'
                : 'label.tpo_individual_plant_community'
            )}
          </div>

          <div className="tooltip communtiy_col">
            <a data-tip data-for="community">
              <img className="smallImage" src={questionmark_orange} />
            </a>

            <ReactTooltip id="community" effect="solid" type="dark">
              <span className="tooltip-text">
                {i18n.t('label.treecounter_tooltip')}
              </span>
            </ReactTooltip>
          </div>
        </div>
        <div>
          <strong>{community}</strong>
        </div>
      </div>
    </div>
  </div>
);

export default PlantedDetails;

PlantedDetails.propTypes = {
  personal: PropTypes.string.isRequired,
  community: PropTypes.string.isRequired,
  type: PropTypes.string,
  onToggle: PropTypes.func
};
