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

export default class RegisterTrees extends Component {
  routes = [
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

  constructor(props) {
    super(props);
    this.state = {
      individual: {
        treeCount: 1
      },
      mode: 'single-tree',
      index: 0,
      routes: this.routes
    };
    console.log('this.props.navigation', this.props);
    // Bind Local method
    this._handleIndexChange = this._handleIndexChange.bind(this);
    this.handleGeoLocationChange = this.handleGeoLocationChange.bind(this);
  }

  _handleIndexChange = index =>
    this.setState({
      index,
      mode: index === 0 ? 'single-tree' : 'multiple-trees'
    });

  handleGeoLocationChange(/* geoLocation */) {
    //console.log(geoLocation);
  }

  _renderTabBar = props => {
    return (
      <TabBar
        {...props}
        keyboardDismissMode={'on-drag'}
        style={[styles.tabBar, { paddingLeft: 8 }]}
        labelStyle={styles.tabBarTextStyle}
        onTabPress={({ route }) => {
          this.setState({ mode: route.key });
        }}
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
        indicatorStyle={styles.tabBarTextActive}
        indicatorContainerStyle={{
          left: PixelRatio.roundToNearestPixel(
            Dimensions.get('window').width * 0.04
          )
        }}
        tabStyle={{ width: 'auto', alignItems: 'flex-end' }}
        useNativeDriver
      />
    );
  };

  _renderScene = () => {
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
        mode={this.state.mode}
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
        extraScrollHeight={50}
        enableResetScrollToCoords={false}
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
          renderTabBar={props => this._renderTabBar(props)}
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
