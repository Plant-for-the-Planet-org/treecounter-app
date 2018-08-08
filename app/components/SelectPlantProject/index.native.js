import React, { Component } from 'react';
import { TabView } from 'react-native-tab-view';

import { renderBasicTabbar } from '../../components/Common/Tabs/basicTabbar';
import FeaturedProjects from './Tabs/featured';
import ListProjects from './Tabs/list';
import PriceProjects from './Tabs/price';

export default class SelectPlantTabView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      routes: [
        { key: 'list', title: 'List' },
        { key: 'featured', title: 'Featured' },
        { key: 'past', title: 'Past' },

        { key: 'price', title: 'Price' },
        { key: 'map', title: 'Map' }
      ],
      index: 0
    };
  }
  componentDidMount() {}

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

  _handleIndexChange = index => {
    this.setState({ index });
  };

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
        return <FeaturedProjects {...this.props} />;
      case 'list':
        return <ListProjects {...this.props} />;
      case 'price':
        return <PriceProjects {...this.props} />;
      default:
        return null;
    }
  };

  render() {
    return (
      <TabView
        useNativeDriver={true}
        navigationState={this.state}
        renderScene={this._renderSelectPlantScene}
        renderTabBar={this._renderTabBar}
        onIndexChange={this._handleIndexChange}
      />
    );
  }
}
