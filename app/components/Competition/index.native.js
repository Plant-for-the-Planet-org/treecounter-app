import React from 'react';
import { Dimensions, Text, View } from 'react-native';
import { TabBar, TabView } from 'react-native-tab-view';
import styles from '../../styles/common/tabbar';
import MineCompetitions from './Tabs/mine.native';
import FeaturedCompetitions from './Tabs/featured.native';
import AllCompetitions from './Tabs/all.native';
import i18n from '../../locales/i18n';

const Layout = {
  window: {
    width: Dimensions.get('window').width
  }
};

class Competiton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      routes: [
        { key: 'mine', title: i18n.t('label.mine_competitions') },
        { key: 'featured', title: i18n.t('label.featured_competitions') },
        { key: 'all', title: i18n.t('label.all_competitions') }
      ],
      index: 1
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
    this.setState({ index });
  };

  _renderTabBar = props => {
    return (
      <TabBar
        {...props}
        indicatorStyle={styles.indicator}
        style={styles.tabBar}
        tabStyle={{ width: Layout.window.width / 3 }}
        labelStyle={styles.textStyle}
        indicatorStyle={styles.textActive}
      />
    );
  };

  _renderSelectPlantScene = ({ route }) => {
    switch (route.key) {
      case 'mine':
        return <MineCompetitions {...this.props} />;
      case 'featured':
        return <FeaturedCompetitions {...this.props} />;
      case 'all':
        return <AllCompetitions {...this.props} />;
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
      </View>
    );
  }
}
export default Competiton;
