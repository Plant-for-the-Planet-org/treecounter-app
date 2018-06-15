import React, { Component } from 'react';

import CardLayout from '../Common/Card/CardLayout';
import Tabs from '../Common/Tabs';
import MapLayerSelector from './MapLayerSelector';
import ArcGISExploreMap from '../Map/ArcGISExploreMap';

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
    this.state = {
      activeTab: '',
      activeMapLayers: ['Tree Inventory']
    };
    this.onTabChange = this.onTabChange.bind(this);
    this.onMapLayerSelectUpdate = this.onMapLayerSelectUpdate.bind(this);
  }

  onTabChange(tab) {
    console.log(tab);
    this.setState({
      activeTab: tab
    });
  }

  onMapLayerSelectUpdate(activeMapLayers) {
    console.log('%%%%%%%%%% onMapLayerSelectUpdate ', activeMapLayers);
    this.setState({ activeMapLayers });
  }

  render() {
    return (
      <div className={'explore-page'}>
        <CardLayout>
          <Tabs data={Explore.data.tabs} onTabChange={this.onTabChange}>
            {this.state.activeTab === Explore.data.tabs[0].id ? (
              <div>
                <div className="explore-checkbox">
                  <MapLayerSelector
                    mapLayers={{ 'Tree Inventory': 'Planted trees' }}
                    activeMapLayers={this.state.activeMapLayers}
                    onStateUpdate={this.onMapLayerSelectUpdate}
                  />
                </div>
                <ArcGISExploreMap
                  webMapId={'d601683709dc415b99ddc1bc66a6d8eb'}
                  layers={this.state.activeMapLayers}
                />
              </div>
            ) : null}
          </Tabs>
        </CardLayout>
      </div>
    );
  }
}
