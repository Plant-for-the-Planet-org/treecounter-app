import React from 'react';
import Circle from '../../components/NDVI/Circle';
import PropTypes from 'prop-types';

const Legend = props => {
  return (
    <div className="legend-component">
      <div className="row">
        <h2 className="title">{props.indicatorsSpell}</h2>
      </div>
      <div className="row gradient-row">
        <ul className="ul-first-child">
          <li>
            <Circle gradientName="water" />
          </li>
          <li className="gradient-description">{props.waterSpell}</li>
        </ul>
        <ul>
          <li>
            <Circle gradientName="rock-sand-snow" />
          </li>
          <li className="gradient-description">{props.rockSandSnowSpell}</li>
        </ul>
        <ul className="ul-last-child">
          <li>
            <Circle gradientName="grasslands" />
          </li>
          <li className="gradient-description">{props.grasslandsSpell}</li>
        </ul>
      </div>
      <div className="row">
        <ul className="dense-vegation">
          <li>
            <Circle gradientName="dense-vegetation" />
          </li>
          <li className="dense-vegation-gradient-description">
            {props.denseVegetationSpell}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Legend;

Legend.propTypes = {
  waterSpell: PropTypes.string,
  rockSandSnowSpell: PropTypes.string,
  grasslandsSpell: PropTypes.string,
  denseVegetationSpell: PropTypes.string,
  indicatorsSpell: PropTypes.string
};
