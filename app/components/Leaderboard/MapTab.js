import React from 'react';
import PropTypes from 'prop-types';
import MapLayerSelector from '../Explore/MapLayerSelector';

export default class MapTab extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mapLayers: props.mapInfo.mapLayers,
      activeMapLayers: Object.keys(props.mapInfo.mapLayers).splice(0, 1)
    };

    console.log('%%%%%%%%%% state ', this.state);
    this.onMapLayerSelectUpdate = this.onMapLayerSelectUpdate.bind(this);
  }

  onMapLayerSelectUpdate(activeMapLayers) {
    console.log('%%%%%%%%%% onMapLayerSelectUpdate ', activeMapLayers);
    this.setState({ activeMapLayers });
  }

  render() {
    const { mapInfo } = this.props;

    console.log('mapInfo ', mapInfo);
    return (
      <div className="map-tab__container">
        <div className="map-tab-checkboxes-row">
          <MapLayerSelector
            mapLayers={this.state.mapLayers}
            activeMapLayers={this.state.activeMapLayers}
            onStateUpdate={this.onMapLayerSelectUpdate}
          />
        </div>
      </div>
    );
  }
}

MapTab.propTypes = {
  mapInfo: PropTypes.object
};
