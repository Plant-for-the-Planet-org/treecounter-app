import React from 'react';
import Circle from '../../components/NDVI/Circle';
//styles
import '../../styles/NDVI/legend.scss';

const Legend = props => {
  return (
    <div className="legend-component">
      <div className="row">
        <h2 className="title">Indicators</h2>
      </div>
      <div className="row gradient-row">
        <ul className="ul-first-child">
          <li>
            <Circle gradientName="water" />
          </li>
          <li className="gradient-description">Water</li>
        </ul>
        <ul>
          <li>
            <Circle gradientName="rock-sand-snow" />
          </li>
          <li className="gradient-description">Rock/Sand/Snow</li>
        </ul>
        <ul className="ul-last-child">
          <li>
            <Circle gradientName="grasslands" />
          </li>
          <li className="gradient-description">Grasslands</li>
        </ul>
      </div>
      <div className="row">
        <ul className="dense-vegation">
          <li>
            <Circle gradientName="dense-vegetation" />
          </li>
          <li className="dense-vegation-gradient-description">
            Dense Vegetation
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Legend;
