import React from 'react';
import PropTypes from 'prop-types';
import i18n from '../../locales/i18n';

const PlantProject = ({ taxDeductableIn }) => {
  return <div>{i18n.t('label.tax_deductablein')}</div>;
};

PlantProject.propTypes = {
  taxDeductableIn: PropTypes.array.isRequired
};

export default PlantProject;
