import React, { lazy } from 'react';
import PropTypes from 'prop-types';

const PlantProjectSpecsItem = lazy(() => import('./PlantProjectSpecsItem'));
import i18n from '../../locales/i18n.js';
import { locationIcon, tree_survival } from '../../assets';
/**
 * see: https://github.com/Plant-for-the-Planet-org/treecounter-platform/wiki/Component-PlantProjectSpecs
 */
const PlantProjectSpecs = ({ location, survivalRate, taxDeduction }) => {
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
