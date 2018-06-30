import * as React from 'react';
import { WebMap } from 'react-arcgis';
import PropTypes from 'prop-types';

class MapContributions extends React.Component {
  constructor(props) {
    super(props);
    console.log('%%%%%%%%%%%%%%% MapContributions props: ', props);
    this.state = {
      status: 'loading',
      map: null,
      view: null,
      userId: ''
    };

    this.handleFail = this.handleFail.bind(this);
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
    const user_id = this.props.userId;
    // FIND TREE LAYER //
    const tree_inventory_layer = map.layers.find(layer => {
      return layer.title === 'Tree Inventory';
    });

    //
    // https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-FeatureLayer.html
    //
    if (tree_inventory_layer) {
      // SET TREE INVENTORY FILTER TO USER ID //
      //
      // https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-FeatureLayer.html#definitionExpression
      //
      tree_inventory_layer.definitionExpression = `user_id = ${user_id}`;
      const query = tree_inventory_layer.createQuery();
      query.where = `user_id = ${user_id}`;
      tree_inventory_layer
        .queryFeatures(query)
        .then(({ features }) => {
          if (features.length) {
            view.goTo({ target: features, scale: 10000 });
          }
        })
        .catch(error => console.log(error.message));
    }
    this.setState({ map, view, status: 'loaded' });
  }

  handleFail(e) {
    console.error(e);
    this.setState({ status: 'failed' });
  }
}

MapContributions.propTypes = {
  webMapId: PropTypes.string,
  userId: PropTypes.number
};

export default MapContributions;
