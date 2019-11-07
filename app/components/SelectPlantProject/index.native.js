import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { View } from 'react-native';
import { TabBar, TabView } from 'react-native-tab-view';
import { Dimensions } from 'react-native';
import TabContainer from '../../containers/Menu/TabContainer';
import i18n from '../../locales/i18n.js';
import styles from '../../styles/common/tabbar';
import FeaturedProjects from './Tabs/featured';
import ListProjects from './Tabs/list';

const Layout = {
  window: {
    width: Dimensions.get('window').width
  }
};
export default class SelectPlantTabView extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      routes: [
        { key: 'featured', title: i18n.t('label.featured') },
        { key: 'list', title: i18n.t('label.list') }
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

  _handleIndexChange = index => {
    this.setState({ index: index });
  };

  _renderTabBar = props => {
    return [
      <TabBar
        {...props}
        style={styles.tabBar}
        tabStyle={{ width: Layout.window.width / 2 }}
        labelStyle={styles.textStyle}
        indicatorStyle={styles.textActive}
      />
    ];
  };

  _renderSelectPlantScene = ({ route }) => {
    const {
      plantProjects,
      onMoreClick,
      selectProject,
      navigation,
      currencies
    } = this.props;
    // props for children
    const props = {
      plantProjects,
      onMoreClick,
      selectProject,
      navigation,
      currencies
    };
    const { index } = this.state;

    // Only render a tab if it is focused
    switch (route.key) {
      case 'featured':
        return <FeaturedProjects {...props} />;
      case 'list':
        return <ListProjects {...props} />;
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

SelectPlantTabView.propTypes = {
  plantProjects: PropTypes.array,
  currencies: PropTypes.object,
  selectProject: PropTypes.func,
  onMoreClick: PropTypes.func,
  navigation: PropTypes.object
};
