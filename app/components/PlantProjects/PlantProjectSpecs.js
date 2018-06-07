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
  paymentCurrencies,
  survivalRate
}) => {
  let allCurrencyKey = Object.keys(paymentCurrencies);

  return (
    <div className="project-specs__container">
      <div className="column">
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
      </div>
      <div className="column">
        <PlantProjectSpecsItem
          icon={dollar}
          value={
            paymentCurrencies && allCurrencyKey.length ? (
              <div className="tree-cost-subitem">
                <span className="currency-symbol">
                  {paymentCurrencies[allCurrencyKey[0]].currencySymbol}
                </span>
                <span>{paymentCurrencies[allCurrencyKey[0]].treeValue}</span>{' '}
                {paymentCurrencies[allCurrencyKey[0]].taxDeductable ? (
                  <span className="tax-span">{i18n.t('label.tax')}</span>
                ) : null}
              </div>
            ) : null
          }
          label={i18n.t('label.cost_per_tree')}
        />
        {allCurrencyKey.map((value, index) => {
          if (index == 0) return null;
          return (
            <PlantProjectSpecsItem
              key={index}
              value={
                <div className="tree-cost-subitem">
                  <span className="currency-symbol">
                    {paymentCurrencies[value].currencySymbol}
                  </span>
                  <span className="">{paymentCurrencies[value].treeValue}</span>
                  {paymentCurrencies[value].taxDeductable ? (
                    <span className="tax-span">{i18n.t('label.tax')}</span>
                  ) : null}
                </div>
              }
            />
          );
        })}
        <PlantProjectSpecsItem
          value={
            <div className="project-specs__taxdeductible">
              <span className="tax-span">{i18n.t('label.tax')}</span>
              <span> {i18n.t('label.tax_deductible')}</span>
            </div>
          }
        />
      </div>
    </div>
  );
};

PlantProjectSpecs.propTypes = {
  location: PropTypes.string,
  countPlanted: PropTypes.number.isRequired,
  countTarget: PropTypes.number,
  paymentCurrencies: PropTypes.object.isRequired,
  survivalRate: PropTypes.number.isRequired
};

export default PlantProjectSpecs;
