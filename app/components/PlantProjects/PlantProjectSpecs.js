import React from 'react';
import PropTypes from 'prop-types';
import PlantProjectSpecsItem from './PlantProjectSpecsItem';
import i18n from '../../locales/i18n.js';

import {
  locationIcon,
  plantedTarget,
  target,
  tree_survival,
  dollar,
  questionmark_orange
} from '../../assets';
/**
 * see: https://github.com/Plant-for-the-Planet-org/treecounter-platform/wiki/Component-PlantProjectSpecs
 */
const PlantProjectSpecs = ({
  location,
  countPlanted,
  countTarget,
  survivalRate,
  currency,
  treeCost,
  taxDeduction
}) => {
  return (
    <div className="project-specs-left__container">
      <PlantProjectSpecsItem icon={locationIcon} label={location} />

      <PlantProjectSpecsItem
        icon={tree_survival}
        value={i18n.t('label.survival_rate')}
        label={survivalRate + '%'}
      />

      <div className="project-specs__taxdeductible">
        {taxDeduction && taxDeduction.length ? (
          <div>
            {i18n.t('label.tax_deductible') +
              ' ' +
              i18n.t('label.in') +
              ' ' +
              taxDeduction.join(', ')}
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
