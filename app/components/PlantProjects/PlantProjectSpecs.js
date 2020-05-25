import React from 'react';
import PropTypes from 'prop-types';
import PlantProjectSpecsItem from './PlantProjectSpecsItem';
import i18n from '../../locales/i18n.js';
import { getISOToCountryName } from '../../helpers/utils';
import { locationIcon } from '../../assets';
/**
 * see: https://github.com/Plant-for-the-Planet-org/treecounter-platform/wiki/Component-PlantProjectSpecs
 */
const PlantProjectSpecs = ({ location, taxDeduction }) => {
  const getTaxCountries = () => {
    return (
      taxDeduction &&
      taxDeduction.length &&
      taxDeduction
        .map(country => getISOToCountryName(country).country)
        .join(', ')
        .concat('.')
    );
  };
  return (
    <div className="project-specs-left__container">
      <PlantProjectSpecsItem icon={locationIcon} label={location} />
      <div className="project-specs__taxdeductible">
        {taxDeduction && taxDeduction.length ? (
          <div>
            {i18n.t('label.tax_deductible') +
              ' ' +
              i18n.t('label.in') +
              ' ' +
              getTaxCountries()}
          </div>
        ) : null}
      </div>
    </div>
  );
};

PlantProjectSpecs.propTypes = {
  location: PropTypes.string,
  countPlanted: PropTypes.number.isRequired,
  countTarget: PropTypes.number,
  treeCost: PropTypes.number.isRequired,
  currency: PropTypes.string.isRequired,
  taxDeduction: PropTypes.array,
  survivalRate: PropTypes.number.isRequired
};

export default PlantProjectSpecs;
