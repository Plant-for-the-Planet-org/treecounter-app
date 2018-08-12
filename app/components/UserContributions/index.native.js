import React from 'react';
import PropTypes from 'prop-types';

import ContributionCardList from './ContributionCardList';
import ContributionsMapLegend from './ContributionsMapLegend';
import i18n from '../../locales/i18n.js';
import {
  Text,
  View,
  TouchableOpacity,
  Animated,
  ScrollView
} from 'react-native';
import styles from '../../styles/myTrees/my_trees.native';
import tabBarStyles from '../../styles/common/tabbar.native';

import PrimaryButton from '../Common/Button/PrimaryButton';
import { plantedTarget } from '../../assets';
import { getLocalRoute } from '../../actions/apiRouting';
import { TabView } from 'react-native-tab-view';

export default class UserContributions extends React.Component {
  constructor() {
    super();

    this.state = {
      index: 0,
      routes: [
        {
          key: 'map',
          title: 'Map'
        },
        { key: 'list', title: 'List' }
      ]
    };
  }

  _renderTabBar = props => {
    return (
      <View style={tabBarStyles.tabBar}>
        {props.navigationState.routes.map((route, i) => {
          return (
            <TouchableOpacity
              style={
                this.state.index === i
                  ? tabBarStyles.tabItemActive
                  : tabBarStyles.tabItem
              }
              key={'route' + i}
              onPress={() => this.setState({ index: i })}
            >
              <Animated.Text
                style={
                  this.state.index === i
                    ? tabBarStyles.textActive
                    : tabBarStyles.text
                }
              >
                {route.title}
              </Animated.Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  _handleIndexChange = index => this.setState({ index });
  _renderScene = ({ route }) => {
    switch (route.key) {
      case 'map':
        return (
          <View {...this.props} style={styles.mapContainer}>
            <Text>Map</Text>

            <ContributionsMapLegend />
          </View>
        );
        break;
      case 'list':
        return (
          <View {...this.props} style={styles.listContainer}>
            <ScrollView>
              <ContributionCardList
                contributions={this.props.userContributions}
              />
            </ScrollView>
          </View>
        );
        break;
        return null;
    }
  };

  render() {
    const { userProfileId, userContributions } = this.props;
    return (
      <ScrollView contentContainerStyle={{ flex: 1 }}>
        <View style={styles.headContainer}>
          <PrimaryButton
            onClick={event => {
              setTimeout(() => {
                this.props.navigation.navigate(
                  getLocalRoute('app_registerTrees')
                );
              }, 0);
            }}
            image={plantedTarget}
          >
            Register new trees
          </PrimaryButton>
        </View>
        <TabView
          useNativeDriver={true}
          navigationState={this.state}
          renderScene={this._renderScene}
          renderTabBar={this._renderTabBar}
          onIndexChange={this._handleIndexChange}
        />
      </ScrollView>
    );
  }
}

UserContributions.propTypes = {
  userProfileId: PropTypes.number.isRequired,
  userContributions: PropTypes.array.isRequired
};
