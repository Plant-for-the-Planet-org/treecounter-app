import React, { Component } from 'react';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import FeaturedProjects from './Tabs/featured';
import ListProjects from './Tabs/list';
import PriceProjects from './Tabs/price';
import styles from '../../styles/common/tabbar';

export default class SelectPlantTabView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      routes: [
        { key: 'featured', title: 'Featured' },
        { key: 'list', title: 'List' },
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
    return (
      <TabBar
        {...props}
        indicatorStyle={styles.indicator}
        style={styles.tabBar}
        tabStyle={styles.tabItem}
        labelStyle={styles.textStyle}
        indicatorStyle={styles.textActive}
      />
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
        useNativeDriver
        navigationState={this.state}
        renderScene={this._renderSelectPlantScene}
        renderTabBar={this._renderTabBar}
        onIndexChange={this._handleIndexChange}
        //   canJumpToTab={this._canJumpToTab}
      />
    );
  }
}
