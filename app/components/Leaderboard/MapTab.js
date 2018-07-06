import React from 'react';
import PropTypes from 'prop-types';
import MapLayerSelector from './MapLayerSelector';
import ArcGISExploreMap from '../Map/ArcGISExploreMap';
import i18n from '../../locales/i18n';
import { map_legend_TreeDensity } from '../../assets';
import { map_legend_Trees } from '../../assets';
import { map_legend_Restoration } from '../../assets';

export default class MapTab extends React.Component {
  constructor(props) {
    super(props);

    const mapDescriptionInfoMap = {
      [props.mapInfo.mapLayersKeys[0]]: {
        description: i18n.t('label.plantedTrees_description'),
        source: '',
        legend: map_legend_Trees
      },
      [props.mapInfo.mapLayersKeys[1]]: {
        description: i18n.t('label.existingForest_description'),
        source: i18n.t('label.existingForest_source'),
        legend: map_legend_TreeDensity
      },
      [props.mapInfo.mapLayersKeys[2]]: {
        description: i18n.t('label.restorationOpportunities_description'),
        source: i18n.t('label.restorationOpportunities_source'),
        legend: map_legend_Restoration
      }
    };
    this.state = {
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
          webMapId={'d601683709dc415b99ddc1bc66a6d8eb'}
          layers={this.state.activeMapLayers}
        />

        {this.state.activeMapLayers.map((layer, index) => {
          return (
            <div className="map-layer-descriptions" key={index}>
              <strong>{this.state.mapLayers[layer]}</strong>
              <div className="description">
                {this.state.mapDescriptionInfoMap[layer].description}
              </div>
              <img src={this.state.mapDescriptionInfoMap[layer].legend} />
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
