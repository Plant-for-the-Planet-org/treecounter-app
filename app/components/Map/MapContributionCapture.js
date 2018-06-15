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
      search: null
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
    loadModules(['esri/widgets/Search'])
      .then(([Search]) => {
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

        this.setState({ map, view, search, status: 'loaded' });
      })
      .catch(err => console.error(err));
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
