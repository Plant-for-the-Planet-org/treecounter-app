import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class MapLayerSelector extends Component {
  constructor() {
    super();
    this.HandleInputChange = this.HandleInputChange.bind(this);
  }

  HandleInputChange(event) {
    if (this.props.activeMapLayers.includes(event.target.value)) {
      this.props.activeMapLayers.splice(
        this.props.activeMapLayers.indexOf(event.target.value),
        1
      );
    } else this.props.activeMapLayers.push(event.target.value);
    this.props.onStateUpdate(this.props.activeMapLayers);
  }

  GetCheckbox(objKey) {
    return (
      <div className="explore-checkbox--option">
        <input
          defaultChecked={this.props.activeMapLayers.includes(objKey)}
          type="checkbox"
          name="checkbox"
          id={objKey}
          value={objKey}
          onChange={this.HandleInputChange}
        />
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
  activeMapLayers: PropTypes.object,
  onStateUpdate: PropTypes.func
};
