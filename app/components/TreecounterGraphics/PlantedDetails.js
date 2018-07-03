import React from 'react';
import PropTypes from 'prop-types';
import i18n from '../../locales/i18n.js';
import { questionmark_orange } from '../../assets';

const PlantedDetails = ({ personal, community, type }) => (
  <div className="fixed-planted-details">
    <strong>{personal.toLocaleString('en')}</strong>{' '}
    {i18n.t(
      'individual' === type
        ? 'label.individual_plant_personal'
        : 'label.tpo_plant_personal'
    )}
    <br />
    <strong>{community.toLocaleString('en')}</strong>{' '}
    {i18n.t(
      'individual' === type
        ? 'label.individual_plant_community'
        : 'label.tpo_individual_plant_community'
    )}{' '}
    <img src={questionmark_orange} />
  </div>
);

export default PlantedDetails;

PlantedDetails.propTypes = {
  personal: PropTypes.string.isRequired,
  community: PropTypes.string.isRequired,
  type: PropTypes.string
};
