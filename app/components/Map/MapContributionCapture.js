/* eslint-disable no-underscore-dangle */
import React, { PureComponent } from 'react';
import { WebMap } from '@esri/react-arcgis';
import PropTypes from 'prop-types';
import { loadModules } from 'esri-loader';
import i18n from '../../locales/i18n.js';

class MapContributionCapture extends PureComponent {
  state = {
    status: i18n.t('label.loading'),
    map: null,
    view: null,
    graphic: null,
    search: null,
    webMercatorUtils: null,
    geoLocation: null
  };

  render() {
    return (
      <WebMap
        id={this.props.webMapId}
        loaderOptions={{
          dojoConfig: {
            has: {
              'esri-promise-compatibility': 1,
              'esri-featurelayer-webgl': 1
            }
          }
        }}
        onLoad={this.handleLoad}
        onFail={this.handleFail}
      />
    );
  }

  componentDidMount() {
    this._mounted = true;
  }

  componentWillUnmount() {
    this._mounted = false;
  }

  handleLoad = (map, view) => {
    if (!this._mounted) return;

    loadModules([
      'esri/widgets/Search',
      'esri/geometry/support/webMercatorUtils',
      'esri/Graphic',
      'esri/geometry/Point'
    ])
      .then(([Search, webMercatorUtils, Graphic, Point]) => {
        if (!this._mounted) return;

        // GET THE FIRST LAYER
        const tree_inventory_layer = map.layers.getItemAt(0);
        //        tree_inventory_layer.definitionExpression = `user_id = ${user_id}`;
        tree_inventory_layer.definitionExpression = `0=1`;

        // CENTER GRAPHIC //
        let center_graphic = new Graphic({
          geometry: null,
          symbol: {
            type: 'picture-marker',
            url:
              'https://s3-us-west-1.amazonaws.com/patterns.esri.com/icons/Web/Point%20Symbols/SVG/Street%20trees_d.svg',
            size: 24,
            width: 24,
            height: 24,
            xoffset: 0,
            yoffset: 0
          }
        });
        view.graphics.add(center_graphic);

        // UPDATE CENTER GRAPHIC //
        const update_center_graphic = location => {
          view.graphics.remove(center_graphic);
          center_graphic = center_graphic.clone();
          center_graphic.geometry = location;
          view.graphics.add(center_graphic);
        };

        // LOCATION SEARCH //
        const location_search = new Search({ view: view }, 'location-search');
        location_search.popupEnabled = false;
        location_search.autoNavigate = false;
        location_search.resultGraphicEnabled = false;

        // UPDATE DEFAULT LOCATOR (Esri World Geocoding Service) TO INCLUDE COUNTRY IN THE RESULTS //
        let locator_source;
        try {
          locator_source = location_search.sources.getItemAt(0);
          if (locator_source) {
            // RETURN COUNTRY CODE //
            locator_source.outFields.push('CountryCode');

            // RESET DEFAULT LOCATOR //
            location_search.sources = [locator_source];
          } else {
            // It does however work
            console.error(
              'No locator_source found on location_search',
              location_search
            );
          }
        } catch (error) {
          console.error('locator_source not found', error);
        }

        view.ui.add(location_search, 'top-right');

        // USER SELECTS SEARCH RESULT //
        location_search.on('select-result', evt => {
          if (!evt.errors) {
            const result = evt.result;
            view.goTo(result.extent).then(() => {
              const geoLocation = {
                geoLongitude: result.extent.center.longitude,
                geoLatitude: result.extent.center.latitude,
                countryCode: result.feature.attributes.CountryCode
              };
              this.setState({ geoLocation });
              this.props.onLocationSelected(geoLocation);
              update_center_graphic(result.extent.center);
            });
          }
        });

        // REVERSE GEOCODE USER CLICKED LOCATION //
        view.on('click', evt => {
          location_search.searchTerm = '';
          view.goTo(evt.mapPoint).then(() => {
            if (!locator_source) {
              console.error('locator_source was not set');
              return;
            }
            locator_source.locator
              .locationToAddress(evt.mapPoint)
              .then(address_candidate => {
                location_search.searchTerm = address_candidate.address;
                const geoLocation = {
                  geoLongitude: evt.mapPoint.longitude,
                  geoLatitude: evt.mapPoint.latitude,
                  countryCode: address_candidate.attributes.CountryCode
                };
                this.setState({ geoLocation });
                this.props.onLocationSelected(geoLocation);
                update_center_graphic(evt.mapPoint);
              });
          });
        });

        if (this.props.geoLocation.geoLongitude) {
          const oldLocation = new Point(
            this.props.geoLocation.geoLongitude,
            this.props.geoLocation.geoLatitude
          );
          view.goTo({ target: oldLocation, scale: 10000 });
          update_center_graphic(oldLocation);
        }

        this.setState({
          map,
          view,
          location_search,
          webMercatorUtils,
          status: 'loaded'
        });
      })
      .catch(err => console.error(err));
  };

  handleFail = e => {
    if (!this._mounted) return;
    console.error(e);
    this.setState({ status: 'failed' });
  };
}

MapContributionCapture.propTypes = {
  geoLocation: PropTypes.object,
  onLocationSelected: PropTypes.func,
  webMapId: PropTypes.string
};
export default MapContributionCapture;
