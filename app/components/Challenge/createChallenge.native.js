import React, { Component } from 'react';
import { TabView, TabBar, SceneMap, View } from 'react-native-tab-view';
import styles from '../../styles/common/tabbar';
import { Dimensions } from 'react-native';
import ChallengeUser from './Tabs/ChallengeUser';
import ChallengeEmail from './Tabs/ChallengeEmail';

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
        { key: 'email', title: 'Email' },
        { key: 'user', title: 'Search User' }
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
        tabStyle={{ width: Layout.window.width / 2 }}
        labelStyle={styles.textStyle}
        indicatorStyle={styles.textActive}
      />
    );
  };

  _renderSelectionScene = ({ route }) => {
    switch (route.key) {
      case 'email':
        return <ChallengeEmail />;
      case 'user':
        return <ChallengeUser />;
      default:
        return null;
    }
  };

  render() {
    return (
      <TabView
        useNativeDriver
        navigationState={this.state}
        renderScene={this._renderSelectionScene}
        renderTabBar={this._renderTabBar}
        onIndexChange={this._handleIndexChange}
      />
    );
  }
}
