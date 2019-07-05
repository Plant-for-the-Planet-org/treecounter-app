import React from 'react';
import LegendCircle from '../../components/NDVI/LegendCircle';

const Legend = _ => {
  return (
    <div className="legend-component">
      <div className="row">
        <h2 className="title">Indicators</h2>
      </div>
      <div className="row gradient-row">
        <ul className="ul-first-child">
          <li>
            <LegendCircle gradientName="water" />
          </li>
          <li className="gradient-description">Water</li>
        </ul>
        <ul>
          <li>
            <LegendCircle gradientName="rock-sand-snow" />
          </li>
          <li className="gradient-description">Rock/Sand/Snow</li>
        </ul>
        <ul className="ul-last-child">
          <li>
            <LegendCircle gradientName="grasslands" />
          </li>
          <li className="gradient-description">Grasslands</li>
        </ul>
      </div>
      <div className="row">
        <ul className="dense-vegation">
          <li>
            <LegendCircle gradientName="dense-vegetation" />
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
