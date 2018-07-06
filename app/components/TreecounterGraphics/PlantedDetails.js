import React from 'react';
import PropTypes from 'prop-types';
import i18n from '../../locales/i18n.js';
import ReactTooltip from 'react-tooltip';
import { questionmark_orange } from '../../assets';

const PlantedDetails = ({ personal, community, type }) => (
  <div className="fixed-planted-details">
    <strong>{personal.toFixed().toLocaleString('en')}</strong>{' '}
    {i18n.t(
      'individual' === type
        ? 'label.individual_plant_personal'
        : 'label.tpo_plant_personal'
    )}
    <br />
    <span>
      <strong>{community.toFixed().toLocaleString('en') + ' '}</strong>
      <span>
        {i18n.t(
          'individual' === type
            ? 'label.individual_plant_community'
            : 'label.tpo_individual_plant_community'
        )}
      </span>
      <div className="tooltip">
        <a data-tip data-for="community">
          <img src={questionmark_orange} />
        </a>

        <ReactTooltip id="community" effect="solid" type="dark">
          <span className="tooltip-text">
            Trees planted by people who made this tree counter their community.
            Your community can be any other profile that you want to support
            towards reaching their tree target, like your school, city or
            employer. If you plant or donate trees, these will then also appear
            in your community’s tree-counter.
          </span>
        </ReactTooltip>
      </div>
    </span>
  </div>
);

export default PlantedDetails;

PlantedDetails.propTypes = {
  personal: PropTypes.string.isRequired,
  community: PropTypes.string.isRequired,
  type: PropTypes.string
};
