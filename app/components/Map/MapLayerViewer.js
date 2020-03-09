/* eslint-disable no-underscore-dangle */
import * as React from 'react';
import { WebMap } from '@esri/react-arcgis';
import { loadModules } from 'esri-loader';
import PropTypes from 'prop-types';
import { debug } from '../../debug';
import { mapCollapse, mapExpand } from '../../assets';
import i18n from '../../locales/i18n.js';

//import { context } from '../../config/index';

class MapLayerView extends React.Component {
  state = {
    status: i18n.t('label.loading'),
    map: null,
    view: null,
    layers: [],
    fullMapView: false
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { layers } = nextProps;
    if (this.state.map) {
      this.state.map.layers.forEach(layer => {
        layer.visible = layers.includes(layer.title);
      });
    }
  }

  escFunction = event => {
    if (event.keyCode === 27) {
      if (this.state.fullMapView) {
        this.setState({
          fullMapView: false
        });
      }
    }
  };

  componentDidMount() {
    this._mounted = true;
    document.addEventListener('keydown', this.escFunction, false);
    loadModules(['esri/core/urlUtils', 'esri/config'])
      // .then(([urlUtils, esriConfig]) => {
      // const proxyUrl = `${context.scheme}://${context.host}/esri/proxy.php`;
      // debug('proxyUrl: ', proxyUrl);
      //
      // //const corsEnabledServer =`${context.host}:80`;
      // const corsEnabledServer = `treecounter.plant-for-the-planet.org`;
      // debug('corsEnabledServer: ', corsEnabledServer);
      //
      // esriConfig.request.corsEnabledServers.push(corsEnabledServer);
      // esriConfig.request.proxyUrl = '/esri/proxy.php';
      //
      // urlUtils.addProxyRule({
      //   urlPrefix: 'arcgis.com',
      //   proxyUrl: proxyUrl
      // });
      // urlUtils.addProxyRule({
      //   urlPrefix: 'landscape6.arcgis.com',
      //   proxyUrl: proxyUrl
      // });
      // urlUtils.addProxyRule({
      //   urlPrefix: 'services7.arcgis.com',
      //   proxyUrl: proxyUrl
      // });
      // urlUtils.addProxyRule({
      //   urlPrefix: 'services.arcgisonline.com',
      //   proxyUrl: proxyUrl
      // });
      // })
      .catch(error => console.error(error));
  }

  componentWillUnmount() {
    this._mounted = false;
    document.removeEventListener('keydown', this.escFunction, false);
  }

  toggleMap = () => {
    this.setState({ fullMapView: !this.state.fullMapView });
  };

  render() {
    return (
      <div
        className={
          'webmap-container' + (this.state.fullMapView ? ' map-fullView' : '')
        }
      >
        <div className="webmap-content">
          <WebMap
            loaderOptions={{
              dojoConfig: {
                has: {
                  'esri-promise-compatibility': 1,
                  'esri-featurelayer-webgl': 1
                }
              }
            }}
            id={this.props.webMapId}
            onLoad={this.handleLoad}
            onFail={this.handleFail}
          />
          <div className="button-container" onClick={this.toggleMap}>
            {this.state.fullMapView ? (
              <img src={mapCollapse} />
            ) : (
              <img src={mapExpand} />
            )}
          </div>
        </div>
      </div>
    );
  }

  handleLoad = (map, view) => {
    debug('WebMap.onLoad', this._mounted, map);
    if (this._mounted) {
      map.layers.forEach(layer => {
        layer.visible = this.props.layers.includes(layer.title);
      });
      this.setState({ map, view, status: 'loaded' });
    }
  };

  handleFail = e => {
    debug('WebMap.onFail', this._mounted, e);
    if (this._mounted) {
      this.setState({ status: 'failed' });
    }
  };
}

MapLayerView.propTypes = {
  layers: PropTypes.array,
  webMapId: PropTypes.string
};

export default MapLayerView;
