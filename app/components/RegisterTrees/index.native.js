/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import { ScrollView, Text } from 'react-native';
import PropTypes from 'prop-types';
import { TabBar, TabView } from 'react-native-tab-view';
import CardLayout from '../Common/Card';

import i18n from '../../locales/i18n.js';
// import { renderFilledTabBar } from '../Common/Tabs';
import RegisterTreeTab from './RegisterTreeTab.native';
import { getPlantProjectEnum, isTpo } from '../../helpers/utils';
import tabBarStyles from '../../styles/common/tabbar.native';
import styles from '../../styles/trillion.native';

const routes = [
  {
    key: 'single-tree',
    title: i18n.t('label.individual')
  },
  { key: 'multiple-trees', title: i18n.t('label.many_trees') }
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

    // Bind Local method
    this._handleIndexChange = this._handleIndexChange.bind(this);
    this.handleGeoLocationChange = this.handleGeoLocationChange.bind(this);
  }

  _handleIndexChange = index => this.setState({ index });

  handleGeoLocationChange(/* geoLocation */) {
    //console.log(geoLocation);
  }

  _renderTabBar = props => {
    return (
      <TabBar
        {...props}
        style={[tabBarStyles.tabBar, { justifyContent: 'center' }]}
        labelStyle={tabBarStyles.textStyle}
        indicatorStyle={tabBarStyles.textActive}
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
        onRegister={(mode, value, plantProject)=>{
          console.log('Data in index register',value)
          return this.props.onSubmit(mode, value, plantProject)
        }}
        isTpo={isTpo(this.props.currentUserProfile)}
        mode={route.key}
        plantProjects={plantProjects}
      />
    );
  };

  render() {
    return (
      <ScrollView
        contentContainerStyle={{ flex: 1, paddingBottom: 72 }}
        enableOnAndroid
        keyboardShouldPersistTaps
      >
        <CardLayout style={{ flex: 1 }}>
          <Text style={styles.ufpTrees}>Register Trees</Text>
          <Text style={styles.textStyle}>
            Please use this form to register the trees you have planted
            personally
          </Text>
          <TabView
            useNativeDriver
            ref="registerTreeForm"
            navigationState={this.state}
            renderScene={this._renderScene.bind(this)}
            renderTabBar={this._renderTabBar}
            onIndexChange={this._handleIndexChange}
          />

        </CardLayout>
      </ScrollView>
    );
  }
}

RegisterTrees.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  currentUserProfile: PropTypes.any.isRequired,
  navigation: PropTypes.any.isRequired
};
