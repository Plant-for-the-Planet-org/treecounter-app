import React, { Component } from 'react';
import { TabView } from 'react-native-tab-view';

import Featured from './featured.native';
import MapComponent from './map';
import PriceCmponent from './price';
import { renderBasicTabbar } from '../../components/Common/Tabs/basicTabbar';

export default class SelectPlantTabView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      routes: [
        { key: 'featured', title: 'Featured' },
        { key: 'map', title: 'Map' },
        { key: 'price', title: 'Price' }
      ],
      index: 0
    };
  }

  indexChange(index) {
    this.setState({
      index: index
    });
  }

  handleExpandedClicked = optionNumber => {
    this.setState({
      expandedOption: optionNumber
    });
  };

  _handleIndexChange = index => this.setState({ index });

  _renderTabBar = props => {
    return renderBasicTabbar(
      props.navigationState.routes,
      this.state.index,
      index => this._handleIndexChange(index)
    );
  };

  _renderSelectPlantScene = ({ route }) => {
    switch (route.key) {
      case 'featured':
        return <Featured />;
      case 'map':
        return <MapComponent />;
      case 'price':
        return <PriceCmponent />;
      default:
        return null;
    }
  };

  render() {
    return (
      <TabView
        navigationState={this.state}
        renderScene={this._renderSelectPlantScene}
        renderTabBar={this._renderTabBar}
        onIndexChange={this._handleIndexChange}
      />
    );
  }
}
