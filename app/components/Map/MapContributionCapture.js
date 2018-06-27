import * as React from 'react';
import { Map } from 'react-arcgis';
import PropTypes from 'prop-types';
import { loadModules } from 'react-arcgis';

class MapContributionCapture extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      status: 'loading',
      map: null,
      view: null,
      graphic: null,
      search: null,
      webMercatorUtils: null,
      geLocation: null
    };

    this.handleFail = this.handleFail.bind(this);
  }

  render() {
    return (
      <Map
        loaderOptions={{
          dojoConfig: {
            has: {
              'esri-promise-compatibility': 1,
              'esri-featurelayer-webgl': 1
            }
          }
        }}
        onLoad={this.handleLoad.bind(this)}
        onFail={this.handleFail.bind(this)}
      />
    );
  }

  handleLoad(map, view) {
    loadModules([
      'esri/widgets/Search',
      'esri/geometry/support/webMercatorUtils'
    ])
      .then(([Search, webMercatorUtils]) => {
        const search = new Search({ view });
        const source = search.sources.getItemAt(0);
        source.outFields.push('CountryCode');
        source.resultSymbol = {
          type: 'picture-marker',
          url:
            'https://s3-us-west-1.amazonaws.com/patterns.esri.com/icons/Web/Point%20Symbols/SVG/Street%20trees_d.svg',
          width: '24px',
          height: '24px',
          yoffset: '10px'
        };
        search.sources = [source];
        view.ui.add(search, 'top-right');

        // zoom to geoLocation
        if (this.props.geoLocation) {
          view.goTo({
            target: {
              latitude: this.props.geoLocation.geoLatitude,
              longitude: this.props.geoLocation.geoLongitude,
              scale: 10000
            }
          });
        }

        // User selects a a search result
        search.on('select-result', ({ errors, result }) => {
          if (!errors) {
            const geoLocation = {
              geoLongitude: result.feature.geometry.longitude,
              geoLatitude: result.feature.geometry.latitude,
              countryCode: result.feature.attributes.CountryCode
            };
            this.setState({ geoLocation });
            this.props.onLocationSelected(geoLocation);
          }
        });

        // User clicks on map
        view.on('click', ({ mapPoint }) => {
          search.search(mapPoint);
          // search.searchTerm = '';
          // view.goTo(mapPoint).then(() => {
          //   return source.locator.locationToAddress(mapPoint);
          // })
          // .then(addressCandidate => {
          //   search.searchTerm = addressCandidate.address;
          // })
          // .catch(error => console.log(error))
        });

        this.setState({
          map,
          view,
          search,
          webMercatorUtils,
          status: 'loaded'
        });
      })
      .catch(err => console.error(err));
  }

  onSubmit() {
    // GEO LOCATION //
    const geo_location = new Point({
      spatialReference: { wkid: 4326 },
      x: this.state.geLocation.geoLongitude,
      y: this.state.geLocation.geoLatitude
    });

    const attributes = {
      type: 'planting',
      user_id: 1, // we have to get userProfile.id here
      user_name: 'Marco Polo', // we have to get userProfile.fullname here
      tree_count: 1, // we have to get userProfile.id here
      plant_date: new Date(), // have to figure out what format the date should be in
      tree_type: 'maple', // we have to get the user input here
      geo_longitude: this.state.geLocation.geoLongitude,
      geo_latitude: this.state.geLocation.geoLatitude,
      country: this.state.geLocation.countryCode
    };

    // NEW LOCATION //
    const new_location = this.state.webMercatorUtils.geographicToWebMercator(
      geo_location
    );

    // NEW FEATURE //
    const new_feature = new Graphic({
      geometry: new_location,
      attributes: attributes
    });

    // CALL FEATURE LAYER APPLYEDITS //
    // https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-FeatureLayer.html#applyEdits
    tree_inventory_layer
      .applyEdits({ addFeatures: [new_feature] })
      .then(applyEditsResults => {
        // MAKE SURE THE FEATURE WAS CREATED //
        // https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-FeatureLayer.html#FeatureEditResult
        const addFeatureResult = applyEditsResults.addFeatureResults[0];
        console.log(
          `Registered Successfully: ${addFeatureResult.error === null}`
        );
      });
  }

  handleFail(e) {
    console.error(e);
    this.setState({ status: 'failed' });
  }
}

MapContributionCapture.propTypes = {
  geoLocation: PropTypes.object,
  onLocationSelected: PropTypes.func
};
export default MapContributionCapture;
