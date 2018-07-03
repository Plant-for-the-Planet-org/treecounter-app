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
      mapLayers: props.mapInfo.mapLayers,
      activeMapLayers: Object.keys(props.mapInfo.mapLayers).splice(0, 1),
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
        <div className="map-layer-description">
          <div>
            {
              this.state.mapDescriptionInfoMap[this.state.activeMapLayers]
                .description
            }
          </div>
          <div>
            {
              this.state.mapDescriptionInfoMap[this.state.activeMapLayers]
                .source
            }
          </div>
        </div>
      </div>
    );
  }
}

MapTab.propTypes = {
  mapInfo: PropTypes.object
};
