import React from 'react';
import PropTypes from 'prop-types';
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
  return (
    <div className="tpo-fotter-teaser__container">
      <div className="teaser__column">
        <div className="tpo-footer-projectspecs__item">
          <img src={locationIcon} />
          <span>location</span>
          <span>{location}</span>
        </div>
        <div className="tpo-footer-projectspecs__item">
          <img src={plantedTarget} />
          <span>Planted</span>
          <span>{countPlanted}</span>
        </div>
        <div className="tpo-footer-projectspecs__item">
          <img src={target} />
          <span>Target</span>
          <span>{countTarget}</span>
        </div>
        <div className="tpo-footer-projectspecs__item">
          <img src={tree_survival} />
          <span>Survival Rate</span>
          <span>{survivalRate}</span>
        </div>
      </div>
      <div className="teaser__column">
        <div className="tpo-footer-projectspecs__item">
          <img src={dollar} />
          <span>Cost per Tree</span>
        </div>
        <div>{paymentCurrencies[0]}</div>
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
