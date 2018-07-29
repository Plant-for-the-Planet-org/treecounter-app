import React, { Component } from 'react';

import { StyleSheet, View, Animated, TouchableOpacity } from 'react-native';
import { TabView } from 'react-native-tab-view';

import styles from '../../styles/common/tabbar';
import i18n from '../../locales/i18n.js';
import Featured from './featured.native';
import MapComponent from './map';
import PriceCmponent from './price';

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
    return (
      <View style={styles.tabBar}>
        {props.navigationState.routes.map((route, i) => {
          return (
            <TouchableOpacity
              style={
                this.state.index === i ? styles.tabItemActive : styles.tabItem
              }
              key={'route' + i}
              onPress={() => this.setState({ index: i })}
            >
              <Animated.Text
                style={this.state.index === i ? styles.textActive : styles.text}
              >
                {route.title}
              </Animated.Text>
            </TouchableOpacity>
          );
        })}
      </View>
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
