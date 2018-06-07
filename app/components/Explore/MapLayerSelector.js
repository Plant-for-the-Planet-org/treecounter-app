import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class MapLayerSelector extends Component {
  constructor() {
    super();
  }

  GetCheckbox(objKey) {
    return (
      <div>
        <input type="checkbox" name="checkbox" id={objKey} value={objKey} />
        <label htmlFor={objKey}>{this.props.mapLayers[objKey]}</label>
      </div>
    );
  }

  render() {
    const { mapLayers } = this.props;
    let checkboxes = [];
    for (let key in mapLayers) {
      checkboxes.push(this.GetCheckbox(key));
    }
    return checkboxes;
  }
}

MapLayerSelector.propTypes = {
  mapLayers: PropTypes.object.isRequired,
  activeMapLayers: PropTypes.object
};
