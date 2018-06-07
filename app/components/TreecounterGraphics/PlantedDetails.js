import React from 'react';
import PropTypes from 'prop-types';
import i18n from '../../locales/i18n.js';

const PlantedDetails = ({ personal, community }) => (
  <div className="fixed-planted-details">
    <strong>{personal}</strong> {i18n.t('label.personal')}
    <br />
    <strong>{community}</strong> {i18n.t('label.community')}
  </div>
);

export default PlantedDetails;

PlantedDetails.propTypes = {
  personal: PropTypes.string.isRequired,
  community: PropTypes.string.isRequired
};
