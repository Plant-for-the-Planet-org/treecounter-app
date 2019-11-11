import React from 'react';
import Circle from '../../components/NDVI/Circle';
import PropTypes from 'prop-types';

const Legend = props => {
  const Legends = [
    { gradientName: 'water', description: props.waterSpell },
    { gradientName: 'rock-sand-snow', description: props.rockSandSnowSpell },
    { gradientName: 'grasslands', description: props.grasslandsSpell },
    {
      gradientName: 'dense-vegetation',
      description: props.denseVegetationSpell
    }
  ];
  return (
    <div className="legend-component">
      <div className="row">
        <h2 className="title">{props.indicatorsSpell}</h2>
      </div>
      <div className="gradient-container">
        <div className="row" style={{ flexWrap: 'wrap' }}>
          {/* one description */}
          {Legends.map((legend, index) => {
            return (
              <div
                className="row"
                key={'legend-' + index}
                style={{ marginTop: 5 }}
              >
                <div className="pr-1">
                  <Circle gradientName={legend.gradientName} />
                </div>
                <div className="pr-2">
                  <p className="gradient-description">{legend.description}</p>
                </div>
              </div>
            );
          })}
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
