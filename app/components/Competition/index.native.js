/* eslint-disable no-underscore-dangle */
import React from 'react';
import {
  Dimensions,
  Text,
  View,
  TouchableOpacity,
  // SafeAreaView,
  Animated
} from 'react-native';
import { SafeAreaView } from 'react-navigation';

import { TabBar, TabView } from 'react-native-tab-view';
import styles from '../../styles/common/tabbar.native';
import buttonStyles from '../../styles/common/button.native';
import { fullPageWhite } from '../../styles/common/common_styles';
import i18n from '../../locales/i18n';
import { updateStaticRoute } from '../../helpers/routerHelper';
import ClosedCompetitions from './Tabs/closed.native'; // Shows all Archived competitions
import MineCompetitions from './Tabs/mine.native'; // Shows my competitions
import FeaturedCompetitions from './Tabs/featured.native'; // Shows featured competitions
import AllCompetitions from './Tabs/all.native'; // Shows all competitions

import HeaderStatic from './../Header/HeaderStatic';

const Layout = {
  window: {
    width: Dimensions.get('window').width
  }
};

class Competiton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // Routes are used for showing the tabs
      routes: [
        { key: 'featured', title: i18n.t('label.featured_competitions') },
        { key: 'all', title: i18n.t('label.all_competitions') },
        { key: 'mine', title: i18n.t('label.mine_competitions') },
        { key: 'closed', title: i18n.t('label.archived_competitions') }
      ],
      index: 0, // It refers to the selected tab, 0 goes for featured
      scrollY: new Animated.Value(0)
    };
  }

  // Function to change the index and update the state
  _handleIndexChange = index => {
    this.setState({ index });
  };

  // Tabbar represents the top header with the different tab items
  _renderTabBar = props => {
    return (
      <TabBar
        scrollEnabled
        {...props}
        style={[styles.tabBar]}
        tabStyle={{ width: 'auto', padding: 0 }}
        indicatorStyle={{ backgroundColor: '#fff' }}
        renderLabel={({ route, focused, color }) => (
          <View style={{ textAlign: 'left', marginRight: 24 }}>
            <Text
              style={{
                color: focused ? '#89b53a' : '#4d5153',
                fontSize: 13,
                fontFamily: 'OpenSans-SemiBold',
                textTransform: 'capitalize',
                textAlign: 'left'
              }}
            >
              {route.title}
            </Text>
            {focused ? (
              <View
                style={[
                  {
                    width: '100%',
                    marginTop: 11,
                    backgroundColor: '#89b53a',
                    height: 3,
                    borderTopLeftRadius: 3,
                    borderTopRightRadius: 3,
                    color: '#89b53a'
                  }
                ]}
              />
            ) : null}
          </View>
        )}
      />
    );
  };

  // This loads the different components based on the selected index
  _renderSelectPlantScene = ({ route }) => {
    switch (route.key) {
      case 'mine':
        return (
          <MineCompetitions {...this.props} scrollY={this.state.scrollY} />
        );
      case 'featured':
        return (
          <FeaturedCompetitions {...this.props} scrollY={this.state.scrollY} />
        );
      case 'all':
        return <AllCompetitions {...this.props} scrollY={this.state.scrollY} />;
      case 'closed':
        return (
          <ClosedCompetitions {...this.props} scrollY={this.state.scrollY} />
        );
      default:
        return null;
    }
  };

  render() {
    const headerTop = this.state.scrollY.interpolate({
      inputRange: [0, 120],
      outputRange: [56, 0],
      extrapolate: 'clamp'
    });
    return (
      <>
        <SafeAreaView>
          <HeaderStatic
            title={'Competitions'}
            scrollY={this.state.scrollY}
            pageName={'competitions'}
          />
          <Animated.View style={{ marginTop: 56 }} />
        </SafeAreaView>
        <TabView
          useNativeDriver
          navigationState={this.state}
          renderScene={this._renderSelectPlantScene}
          renderTabBar={this._renderTabBar}
          onIndexChange={this._handleIndexChange}
        />

        {/* Button to add new competitions(On each page) */}
        <TouchableOpacity
          style={buttonStyles.plusButton}
          onPress={() => {
            updateStaticRoute('app_create_competition', this.props.navigation, {
              onCreateCompetition: this.props.onCreateCompetition
            });
          }}
        >
          <Text style={buttonStyles.plusButtonIcon}>+</Text>
        </TouchableOpacity>
      </>
    );
  }
}
export default Competiton;
