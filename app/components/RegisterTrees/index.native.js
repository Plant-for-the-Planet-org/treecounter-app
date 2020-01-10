/* eslint-disable no-underscore-dangle,react-native/no-color-literals */
import React, { Component } from 'react';
import { Text, PixelRatio } from 'react-native';
import PropTypes from 'prop-types';
import { TabBar, TabView } from 'react-native-tab-view';
import CardLayout from '../Common/Card';

import i18n from '../../locales/i18n.js';
// import { renderFilledTabBar } from '../Common/Tabs';
import RegisterTreeTab from './RegisterTreeTab.native';
import { getPlantProjectEnum, isTpo } from '../../helpers/utils';
import styles from '../../styles/register_trees.native';
import { Dimensions } from 'react-native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const routes = [
  {
    key: 'single-tree',
    title: i18n.t('label.individual'),
    color: '#89b53a'
  },
  {
    key: 'multiple-trees',
    title: i18n.t('label.many_trees'),
    color: '#89b53a'
  }
];
export default class RegisterTrees extends Component {
  constructor(props) {
    super(props);
    this.state = {
      individual: {
        treeCount: 1
      },
      index: 0,
      routes: routes
    };
    console.log('this.props.navigation', this.props);
    // Bind Local method
    this._handleIndexChange = this._handleIndexChange.bind(this);
    this.handleGeoLocationChange = this.handleGeoLocationChange.bind(this);
  }

  _handleIndexChange = index => this.setState({ index });

  handleGeoLocationChange(/* geoLocation */) {
    //console.log(geoLocation);
  }

  _renderTabBar = props => {
    console.log(
      "Dimensions.get('window').width",
      Dimensions.get('window').width
    );
    return (
      <TabBar
        {...props}
        keyboardDismissMode={'on-drag'}
        style={[styles.tabBar]}
        labelStyle={styles.tabBarTextStyle}
        renderLabel={({ route, focused }) => {
          return (
            <Text
              style={[
                styles.tabBarTextStyle,
                { color: focused ? route.color : '#4d5153' }
              ]}
            >
              {route.title}
            </Text>
          );
        }}
        contentContainerStyle={{ justifyContent: 'center' }}
        indicatorStyle={styles.tabBarTextActive}
        indicatorContainerStyle={{
          left:
            Dimensions.get('window').width <= 400
              ? PixelRatio.roundToNearestPixel(
                  Dimensions.get('window').width * 0.28
                )
              : PixelRatio.roundToNearestPixel(
                  Dimensions.get('window').width * 0.3
                )
        }}
        tabStyle={{ width: 'auto', alignItems: 'flex-end' }}
        useNativeDriver
      />
    );
  };

  _renderScene = ({ route }) => {
    const plantProjects = getPlantProjectEnum(
      this.props.currentUserProfile,
      this.props.plantProjects
    );
    return (
      <RegisterTreeTab
        onRegister={(mode, value, plantProject) => {
          return this.props.onSubmit(mode, value, plantProject);
        }}
        isTpo={isTpo(this.props.currentUserProfile)}
        mode={route.key}
        plantProjects={plantProjects}
        navigation={this.props.navigation}
      />
    );
  };

  render() {
    console.log('this.props===----===--=-=-=->', this.props);
    return (
      <KeyboardAwareScrollView
        enableOnAndroid
        contentContailnerStyle={{ justifyContent: 'center' }}
        extraHeight={66}
        keyboardShouldPersistTaps={'handled'}
      >
        <CardLayout style={{ flex: 1 }}>
          <Text style={styles.ufpTrees}>{i18n.t('label.register_trees')}</Text>
          <Text style={styles.textStyle}>
            {i18n.t('label.register_trees_description')}
          </Text>
        </CardLayout>

        <TabView
          useNativeDriver
          ref="registerTreeForm"
          navigationState={this.state}
          renderScene={this._renderScene.bind(this)}
          renderTabBar={this._renderTabBar}
          onIndexChange={this._handleIndexChange}
        />
      </KeyboardAwareScrollView>
    );
  }
}

RegisterTrees.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  currentUserProfile: PropTypes.any.isRequired,
  navigation: PropTypes.any.isRequired
};
