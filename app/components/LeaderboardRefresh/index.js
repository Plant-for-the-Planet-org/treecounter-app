import * as React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import Map from './Map/map';
import Leaderboard from './LeaderBoard/leaderboard';
import World from './World/world';
import Header from './header';

const initialLayout = { width: Dimensions.get('window').width };

const Layout = {
  window: {
    width: Dimensions.get('window').width
  }
};
const LeaderboardTabs = () => {
  const [index, setIndex] = React.useState(1);
  const [routes] = React.useState([
    { key: 'first', title: 'World' },
    { key: 'second', title: 'Leaderboard' },
    { key: 'three', title: 'Maps' }
  ]);

  const renderScene = SceneMap({
    first: World,
    second: Leaderboard,
    three: Map
  });
  const _renderTabBar = props => {
    return (
      <TabBar
        {...props}
        style={styles.tabBar}
        tabStyle={{ width: Layout.window.width / 3 }}
        labelStyle={styles.textStyle}
        indicatorStyle={styles.textActive}
      />
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
        renderTabBar={_renderTabBar}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  tabBar: {
    backgroundColor: '#ffffff'
  },
  tabItem: {
    color: '#89b53a'
  },
  textActive: {
    backgroundColor: '#89b53a',
    height: 3,
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
    color: '#89b53a'
  },
  textStyle: {
    color: '#aba2a2',
    fontSize: 11,
    fontFamily: 'OpenSans-SemiBold',
    textTransform: 'capitalize'
  }
});
export default LeaderboardTabs;
