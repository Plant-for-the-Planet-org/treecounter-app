/* eslint-disable no-underscore-dangle */
import React, { PureComponent } from 'react';
import { WebMap } from '@esri/react-arcgis';
import PropTypes from 'prop-types';
import { debug } from '../../debug';

class MapContributions extends PureComponent {
  // state = {
  //   status: 'loading',
  //   map: null,
  //   view: null
  // };

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
    const user_id = this.props.userId;
    // // FIND TREE LAYER //
    // const tree_inventory_layer = map.layers.find(layer => {
    //   return layer.title === 'Tree Inventory';
    // });

    // GET THE FIRST LAYER
    const tree_inventory_layer = map.layers.getItemAt(0);
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
      // query.outFields = ["*"];
      query.where = `user_id = ${user_id}`;
      tree_inventory_layer
        .queryFeatures(query)
        .then(featureSet => {
          if (!this._mounted) return;
          /* debug(
            '############ MapContributions featureSet: ',
            featureSet.features
          ); */
          // featureSet.features.forEach(feature => {
          //   const {attributes, geometry} =  feature;
          // });
          view.goTo(featureSet.features);
        })
        .catch(error => debug(error.message));
    }
    // this.setState({ map, view, status: 'loaded' });
  };

  handleFail = e => {
    if (!this._mounted) return;
    console.error(e);
    // this.setState({ status: 'failed' });
  };
}

MapContributions.propTypes = {
  webMapId: PropTypes.string,
  userId: PropTypes.number
};

export default MapContributions;
