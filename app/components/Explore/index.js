import React, { Component } from 'react';
// import PropTypes from 'prop-types';

import CardLayout from '../Common/Card/CardLayout';
import Tabs from '../Common/Tabs';
import Map from '../Common/EsriMap/Map';

export default class Explore extends Component {
  static data = {
    tabs: [
      {
        name: 'Map',
        id: 'map'
      },
      {
        name: 'Leaderboards',
        id: 'leaderboards'
      }
    ]
  };

  constructor() {
    super();
    this.onTabChange = this.onTabChange.bind(this);
  }

  onTabChange(tab) {
    console.log(tab);
  }

  render() {
    return (
      <CardLayout>
        <Tabs data={Explore.data.tabs} onTabChange={this.onTabChange}>
          <Map />
        </Tabs>
      </CardLayout>
    );
  }
}
