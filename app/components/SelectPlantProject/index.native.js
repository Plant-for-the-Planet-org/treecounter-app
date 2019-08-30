import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { View } from 'react-native';
import { TabBar, TabView } from 'react-native-tab-view';

import TabContainer from '../../containers/Menu/TabContainer';
import i18n from '../../locales/i18n.js';
import styles from '../../styles/common/tabbar';
import CountryProjects from './Tabs/country.native';
import FeaturedProjects from './Tabs/featured';
import ListProjects from './Tabs/list';
import PriceProjects from './Tabs/price';

export default class SelectPlantTabView extends PureComponent {
  state = {
    routes: [
      { key: 'featured', title: i18n.t('label.featured') },
      { key: 'list', title: i18n.t('label.list') },
      { key: 'price', title: i18n.t('label.price') },
      { key: 'country', title: i18n.t('label.country') }
    ],
    index: 0
  };

  handleExpandedClicked = optionNumber => {
    this.setState({
      expandedOption: optionNumber
    });
  };

  handleIndexChange = index => {
    this.setState({ index });
  };

  renderTabBar = props => {
    return (
      <TabBar
        {...props}
        indicatorStyle={styles.indicator}
        style={styles.tabBar}
        //tabStyle={{ width: Layout.window.width / 4 }}
        labelStyle={styles.textStyle}
        indicatorStyle={styles.textActive}
        scrollEnabled
        bounces
        useNativeDriver
      />
    );
  };

  renderSelectPlantScene = ({ route }) => {
    const props = ({ plantProjects, onMoreClick, selectProject } = this.props);
    const { index } = this.state;

    // Only render a tab if it is focused
    switch (route.key) {
      case 'featured':
        return index === 0 && <FeaturedProjects {...props} />;
      case 'list':
        return index === 1 && <ListProjects {...props} />;
      case 'price':
        return index === 2 && <PriceProjects {...props} />;
      case 'country':
        return index === 3 && <CountryProjects {...props} />;
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
          renderScene={this.renderSelectPlantScene}
          renderTabBar={this.renderTabBar}
          onIndexChange={this.handleIndexChange}
        />
        {this.props.navigation.getParam('giftMethod') ? (
          <TabContainer {...this.props} />
        ) : null}
      </View>
    );
  }
}

SelectPlantTabView.propTypes = {
  plantProjects: PropTypes.array,
  currencies: PropTypes.object,
  selectProject: PropTypes.func,
  onMoreClick: PropTypes.func,
  navigation: PropTypes.object
};
