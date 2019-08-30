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
import styles from '../../styles/myTrees/my_trees';
import tabBarStyles from '../../styles/common/tabbar';

import PrimaryButton from '../Common/Button/PrimaryButton';
import { plantedTarget } from '../../assets';
import { getLocalRoute } from '../../actions/apiRouting';
import { TabView, TabBar } from 'react-native-tab-view';

export default class UserContributions extends React.Component {
  constructor() {
    super();

    this.state = {
      index: 0,
      routes: [
        { key: 'map', title: i18n.t('label.map') },
        { key: 'list', title: i18n.t('label.list') }
      ]
    };
  }

  _renderTabBar = props => {
    return (
      <TabBar
        {...props}
        indicatorStyle={tabBarStyles.indicator}
        style={[tabBarStyles.tabBar]}
        labelStyle={tabBarStyles.textStyle}
        indicatorStyle={tabBarStyles.textActive}
      />
    );
  };

  _handleIndexChange = index => this.setState({ index });
  _renderScene = ({ route }) => {
    switch (route.key) {
      case 'map':
        return (
          <View {...this.props} style={styles.mapContainer}>
            <Text>{i18n.t('label.map')}</Text>

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
                deleteContribution={this.props.deleteContribution}
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
            {i18n.t('label.register_new_trees')}
          </PrimaryButton>
        </View>
        <TabView
          useNativeDriver
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
  userContributions: PropTypes.array.isRequired,
  navigation: PropTypes.any,
  deleteContribution: PropTypes.func
};
