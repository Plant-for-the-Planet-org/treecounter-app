import React from 'react';
import PropTypes from 'prop-types';
import i18n from '../../locales/i18n.js';

const PlantedDetails = ({ personal, community }) => (
  <div className="fixed-planted-details">
    <strong>{personal.toFixed(2).toLocaleString('en')}</strong>{' '}
    {i18n.t('label.plant_personal')}
    <br />
    <strong>{community.toFixed(2).toLocaleString('en')}</strong>{' '}
    {i18n.t('label.plant_community')}
  </div>
);

export default PlantedDetails;

PlantedDetails.propTypes = {
  personal: PropTypes.string.isRequired,
  community: PropTypes.string.isRequired
};
