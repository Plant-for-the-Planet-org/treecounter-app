import React from 'react';
import PropTypes from 'prop-types';
import MapLayerSelector from './MapLayerSelector';
import ArcGISExploreMap from '../Map/ArcGISExploreMap';

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
        <MapLayerSelector
          mapLayers={this.state.mapLayers}
          activeMapLayers={this.state.activeMapLayers}
          onStateUpdate={this.onMapLayerSelectUpdate}
        />
        <ArcGISExploreMap
          webMapId={'d601683709dc415b99ddc1bc66a6d8eb'}
          layers={this.state.activeMapLayers}
        />
      </div>
    );
  }
}

MapTab.propTypes = {
  mapInfo: PropTypes.object
};
