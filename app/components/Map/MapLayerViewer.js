import * as React from 'react';
import { WebMap } from 'react-arcgis';
import PropTypes from 'prop-types';

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

  render() {
    return (
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
