import React from 'react';
import PropTypes from 'prop-types';
import MapLayerSelector from './MapLayerSelector';
import ArcGISExploreMap from '../Map/ArcGISExploreMap';
import i18n from '../../locales/i18n';

export default class MapTab extends React.Component {
  constructor(props) {
    super(props);

    const mapDescriptionInfoMap = {
      [props.mapInfo.mapLayersKeys[0]]: {
        description: i18n.t('label.plantedTrees_description'),
        source: ''
      },
      [props.mapInfo.mapLayersKeys[1]]: {
        description: i18n.t('label.existingForest_description'),
        source: i18n.t('label.existingForest_source')
      },
      [props.mapInfo.mapLayersKeys[2]]: {
        description: i18n.t('label.restorationOpportunities_description'),
        source: i18n.t('label.restorationOpportunities_source')
      }
    };
    this.state = {
      webMapId: props.mapInfo.webMapIds.explore,
      mapLayers: props.mapInfo.mapLayers,
      activeMapLayers: props.mapInfo.mapLayersKeys.splice(0, 1),
      mapDescriptionInfoMap
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
          webMapId={this.state.webMapId}
          layers={this.state.activeMapLayers}
        />

        {this.state.activeMapLayers.map((layer, index) => {
          return (
            <div className="map-layer-descriptions" key={index}>
              <div className="description">
                {this.state.mapDescriptionInfoMap[layer].description}
              </div>
              <div className="source">
                {this.state.mapDescriptionInfoMap[layer].source}
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

MapTab.propTypes = {
  mapInfo: PropTypes.object
};
