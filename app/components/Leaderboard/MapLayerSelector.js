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
    <div className="map-tab-checkboxes-row">
      {Object.keys(mapLayers).map((layer, index) => {
        return (
          <div className="pftp-checkbox" key={index}>
            <input
              className="pftp-checkbox__input"
              type="checkbox"
              value={layer}
              defaultChecked={activeMapLayers.includes(layer)}
              onChange={evt => HandleInputChange(evt.target.value)}
            />
            <label className={'pftp-text-span'}>{mapLayers[layer]}</label>
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
