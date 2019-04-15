import * as React from 'react';
import { WebMap, loadModules } from 'react-arcgis';
import PropTypes from 'prop-types';

//import { context } from '../../config/index';

class MapLayerView extends React.Component {
  constructor(props) {
    console.log('MapLayerView: props ', props);
    super(props);
    this.state = {
      status: 'loading',
      map: null,
      view: null,
      layers: []
    };

    this.handleFail = this.handleFail.bind(this);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { layers } = nextProps;
    if (this.state.map) {
      this.state.map.layers.forEach(layer => {
        layer.visible = layers.includes(layer.title);
      });
    }
  }

  componentDidMount() {
    loadModules(['esri/core/urlUtils', 'esri/config'])
      .then(([urlUtils, esriConfig]) => {
        // const proxyUrl = `${context.scheme}://${context.host}/esri/proxy.php`;
        // console.log('proxyUrl: ', proxyUrl);
        //
        // //const corsEnabledServer =`${context.host}:80`;
        // const corsEnabledServer = `treecounter.plant-for-the-planet.org`;
        // console.log('corsEnabledServer: ', corsEnabledServer);
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
      })
      .catch(error => console.error(error));
  }
  toggleMap() {
    this.setState({ fullMapView: !this.state.fullMapView });
  }

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
            onLoad={this.handleLoad.bind(this)}
            onFail={this.handleFail.bind(this)}
          />
          <button
            className="button-container"
            onClick={this.toggleMap.bind(this)}
          >
            {this.state.fullMapView ? 'collapse' : 'expand'}
          </button>
        </div>
      </div>
    );
  }

  handleLoad(map, view) {
    console.log('handleLoad: map', map);
    map.layers.forEach(layer => {
      layer.visible = this.props.layers.includes(layer.title);
    });
    this.setState({ map, view, status: 'loaded' });
  }

  handleFail(e) {
    console.error(e);
    this.setState({ status: 'failed' });
  }
}

MapLayerView.propTypes = {
  layers: PropTypes.array,
  webMapId: PropTypes.string
};

export default MapLayerView;
