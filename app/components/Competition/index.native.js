import React from 'react';
import { Dimensions, Text, View } from 'react-native';
import { TabBar, TabView } from 'react-native-tab-view';
import styles from '../../styles/common/tabbar';
import MineCompetitions from './Tabs/mine.native';
import FeaturedCompetitions from './Tabs/featured.native';
import AllCompetitions from './Tabs/all.native';

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
        { key: 'mine', title: 'MINE' },
        { key: 'featured', title: 'FEATURED' },
        { key: 'all', title: 'ALL' }
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
