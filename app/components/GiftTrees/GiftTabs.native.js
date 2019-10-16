/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import { TabView, TabBar } from 'react-native-tab-view';
import styles from '../../styles/common/tabbar';
import { Dimensions } from 'react-native';
import GiftToUser from './Tabs/GiftUser';
import GiftEmail from './Tabs/GiftEmail';

import i18n from '../../locales/i18n';

const Layout = {
  window: {
    width: Dimensions.get('window').width
  }
};

export default class GiftTabView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      routes: [
        { key: 'user', title: i18n.t('label.user') },
        { key: 'email', title: i18n.t('label.email') }
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
        style={styles.tabBar}
        tabStyle={{ width: Layout.window.width / 2 }}
        labelStyle={styles.textStyle}
        indicatorStyle={styles.textActive}
      />
    );
  };

  _renderSelectPlantScene = ({ route }) => {
    switch (route.key) {
      case 'user':
        return <GiftToUser {...this.props} />;
      case 'email':
        return <GiftEmail {...this.props} />;

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
      />
    );
  }
}
