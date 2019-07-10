import React from 'react';
import Circle from '../../components/NDVI/Circle';
import PropTypes from 'prop-types';

const Legend = props => {
  return (
    <div className="legend-component">
      <div className="row">
        <h2 className="title">{props.indicatorsSpell}</h2>
      </div>
      <div className="gradient-container">
        <div className="row">
          {/* one description */}
          <div className="fex-1">
            <div className="row">
              <div className="pr-1">
                <Circle gradientName="water" />
              </div>
              <div className="flex-1 pr-2">
                <p className="gradient-description">{props.waterSpell}</p>
              </div>
            </div>
          </div>
          {/* Two description */}
          <div className="flex-1">
            <div className="row">
              <div className="pr-1">
                <Circle gradientName="rock-sand-snow" />
              </div>
              <div className="flex-1 pr-2">
                <p className="gradient-description">
                  {props.rockSandSnowSpell}
                </p>
              </div>
            </div>
          </div>
          {/*  Three */}
          <div className="flex-1">
            <div className="row">
              <div className="pr-1">
                <Circle gradientName="grasslands" />
              </div>
              <div className="flex-1">
                <p className="gradient-description">{props.grasslandsSpell}</p>
              </div>
            </div>
          </div>
        </div>
        {/*  */}
        <div className="row pt-1">
          <div className="flex-1">
            <div className="row">
              <div className="pr-1">
                <Circle gradientName="dense-vegetation" />
              </div>
              <div className="flex-1">
                <p className="gradient-description">
                  {props.denseVegetationSpell}
                </p>
              </div>
            </div>
          </div>
        </div>
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
