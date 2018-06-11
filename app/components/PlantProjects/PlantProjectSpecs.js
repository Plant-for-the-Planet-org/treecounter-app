import React from 'react';
import PropTypes from 'prop-types';
import PlantProjectSpecsItem from './PlantProjectSpecsItem';
import i18n from '../../locales/i18n.js';

import {
  locationIcon,
  plantedTarget,
  target,
  tree_survival,
  dollar
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
    <div className="project-specs__container">
      <PlantProjectSpecsItem
        icon={locationIcon}
        value={location}
        label={i18n.t('label.location')}
      />
      <PlantProjectSpecsItem
        icon={plantedTarget}
        value={countPlanted}
        label={i18n.t('label.planted')}
      />
      <PlantProjectSpecsItem
        icon={target}
        value={countTarget}
        label={i18n.t('label.target')}
      />
      <PlantProjectSpecsItem
        icon={tree_survival}
        value={survivalRate}
        label={i18n.t('label.survival_rate')}
      />
      <PlantProjectSpecsItem
        icon={dollar}
        value={`${currency} ${treeCost}`}
        label={i18n.t('label.Cost')}
      />
      <div className="project-specs__taxdeductible">
        {taxDeduction
          ? i18n.t('label.tax_deductible') +
            ' ' +
            i18n.t('label.in') +
            ' ' +
            taxDeduction.join(', ')
          : null}
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
