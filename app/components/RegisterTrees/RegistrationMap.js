import React from 'react';
import PropTypes from 'prop-types';
import { loadModules } from 'esri-loader';
import ArcGISContributionCaptureMap from '../Map/ArcGISContributionCaptureMap';

class RegistrationMap extends React.Component {
  constructor(props) {
    super(props);

    const userId = 3643;

    this.state = {
      layer: null,
      userId,
      geoLocation: this.props.geoLocation || {}
    };

    this.onLocationSelected = this.onLocationSelected.bind(this);
  }

  UNSAFE_componentWillMount() {
    loadModules(['esri/layers/FeatureLayer'])
      .then(([FeatureLayer]) => {
        const layer = new FeatureLayer({
          portalItem: {
            id: 'd601683709dc415b99ddc1bc66a6d8eb'
          }
        });
        return layer.load();
      })
      .then(layer => {
        this.setState({ layer });
      });
  }

  // WIRE UP A REGISTER BUTTON FOR THIS METHOD
  register() {
    //    loadModules(['esri/Graphic']).then(([Graphic]) => {
    loadModules(['esri/Graphic']).then((/*[]*/) => {
      // const geometry = {
      //   spatialReference: {wkid: 4326},
      //   x: this.state.geoLocation.geoLongitude,
      //   y: this.state.geoLocation.geoLatitude
      // };
      // const attributes = {
      //   'type': 'donation',
      //   'tpo_id': null,
      //   'plant_project_id': 1,
      //   'user_id': this.state.userId || null,
      //   'user_name': null,
      //   'tree_count': 1,
      //   'plant_date': (new Date()).valueOf(),
      //   'tree_type': null,
      //   'geo_longitude': this.state.geoLocation.geoLongitude || null,
      //   'geo_latitude': this.state.geoLocation.geoLatitude || null,
      //   'country': this.state.geoLocation.countryCode
      // };
      //const feature = new Graphic({attributes, geometry});
      // UNCOMMENT THIS WHEN READY TO START REGISTERING TREES
      // CALL FEATURE LAYER APPLYEDITS //
      // https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-FeatureLayer.html#applyEdits
      // this.state.layer.applyEdits({ addFeatures: [feature] }).then(applyEditsResults => {
      //   // MAKE SURE THE FEATURE WAS CREATED //
      //   // https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-FeatureLayer.html#FeatureEditResult
      //   const addFeatureResult = applyEditsResults.addFeatureResults[0];
      //   debug(addFeatureResult);
      // });
    });
  }

  onLocationSelected(geoLocation) {
    this.setState({ geoLocation });
    this.props.onGeoLocationSelected(geoLocation);
  }

  render() {
    return (
      <div>
        <ArcGISContributionCaptureMap
          geoLocation={this.state.geoLocation}
          onLocationSelected={this.onLocationSelected}
        />
      </div>
    );
  }
}

RegistrationMap.propTypes = {
  onGeoLocationSelected: PropTypes.func.isRequired,
  geoLocation: PropTypes.object
};

export default RegistrationMap;
