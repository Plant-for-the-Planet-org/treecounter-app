import React, { Component } from 'react';
import { loadModules } from '@esri/react-arcgis';

const styles = {
  container: {
    height: '100vh',
    width: '100vw'
  },
  mapDiv: {
    padding: 0,
    margin: 0,
    height: '100%',
    width: '100%'
  }
};

export default class UserHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      map: null,
      view: null,
      status: 'loading'
    };
  }

  componentDidMount() {
    loadModules([
      'esri/Map',
      'esri/views/MapView',
      'esri/widgets/Sketch',
      'esri/layers/GraphicsLayer'
    ]).then(([Map, MapView, Sketch, GraphicsLayer]) => {
      let graphicsLayer = new GraphicsLayer();
      const map = new Map({ layers: [graphicsLayer], basemap: 'topo-vector' });
      const view = new MapView({
        container: 'viewDiv',
        map,
        zoom: 15,
        center: [78.4867, 17.385]
      });

      const sketch = new Sketch({
        view: view,
        layer: GraphicsLayer
      });

      view.ui.add(sketch, 'top-right');

      view.then(() => {
        this.setState({
          map,
          view,
          status: 'loaded'
        });
      });
    });
  }

  renderMap() {
    if (this.state.status === 'loading') {
      return <div>loading</div>;
    }
    return null;
  }

  render() {
    return (
      <div style={styles.container}>
        <div id="viewDiv" style={styles.mapDiv}>
          {this.renderMap()}
        </div>
      </div>
    );
  }
}
