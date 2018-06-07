import React from 'react';
import PropTypes from 'prop-types';

const MapLayerSelector = ({ mapLayers, activeMapLayers, onStateUpdate }) => {
  const HandleInputChange = clickedLayer => {
    onStateUpdate(
      Object.keys(mapLayers).filter(
        layer => !((clickedLayer === layer) ^ !activeMapLayers.includes(layer))
      )
    );
  };

  return (
    <div>
      {Object.keys(mapLayers).map(layer => {
        return (
          <div key={layer} className="explore-checkbox--option">
            <input
              defaultChecked={activeMapLayers.includes(layer)}
              type="checkbox"
              name="checkbox"
              id={layer}
              value={layer}
              onChange={evt => HandleInputChange(evt.target.value)}
            />
            <label htmlFor={layer}>{mapLayers[layer]}</label>
          </div>
        );
      })}
    </div>
  );
};

MapLayerSelector.propTypes = {
  mapLayers: PropTypes.object.isRequired,
  activeMapLayers: PropTypes.array.isRequired,
  onStateUpdate: PropTypes.func.isRequired
};

export default MapLayerSelector;
