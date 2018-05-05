import React, { Component } from 'react';

export default class Map extends Component {
  render() {
    return (
      <div className="limap">
        <div className="esriPlantLocationMap">
          <div id="map" className="map" />
        </div>
      </div>
    );
  }
}
