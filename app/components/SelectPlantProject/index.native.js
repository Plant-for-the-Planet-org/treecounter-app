import React, { Component } from 'react';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import FeaturedProjects from './Tabs/featured';
import ListProjects from './Tabs/list';
import PriceProjects from './Tabs/price';
import styles from '../../styles/common/tabbar';
import { Dimensions, View } from 'react-native';
import CountryProjects from './Tabs/country.native';
import TabContainer from '../../containers/Menu/TabContainer';

import i18n from '../../locales/i18n.js';

const Layout = {
  window: {
    width: Dimensions.get('window').width
  }
};

export default class SelectPlantTabView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      routes: [
        { key: 'featured', title: i18n.t('label.featured') },
        { key: 'list', title: i18n.t('label.list') },
        { key: 'price', title: i18n.t('label.price') },
        { key: 'country', title: i18n.t('label.country') }
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
        tabStyle={{ width: Layout.window.width / 4 }}
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
      case 'country':
        return <CountryProjects {...this.props} />;
      default:
        return null;
    }
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <TabView
          useNativeDriver
          navigationState={this.state}
          renderScene={this._renderSelectPlantScene}
          renderTabBar={this._renderTabBar}
          onIndexChange={this._handleIndexChange}
        />
        {this.props.navigation.getParam('giftMethod') ? (
          <TabContainer {...this.props} />
        ) : null}
      </View>
    );
  }
}
