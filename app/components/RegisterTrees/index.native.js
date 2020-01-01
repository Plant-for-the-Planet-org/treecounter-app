/* eslint-disable no-underscore-dangle,react-native/no-color-literals */
import React, {Component} from 'react';
import {Text} from 'react-native';
import PropTypes from 'prop-types';
import {TabBar, TabView} from 'react-native-tab-view';
import CardLayout from '../Common/Card';

import i18n from '../../locales/i18n.js';
// import { renderFilledTabBar } from '../Common/Tabs';
import RegisterTreeTab from './RegisterTreeTab.native';
import {getPlantProjectEnum, isTpo} from '../../helpers/utils';
import tabBarStyles from '../../styles/common/tabbar.native';
import styles from '../../styles/trillion.native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const routes = [
  {
    key: 'single-tree',
    title: i18n.t('label.individual'),
    color: '#89b53a'
  },
  {
    key: 'multiple-trees', title: i18n.t('label.many_trees'), color: '#89b53a'
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

    // Bind Local method
    this._handleIndexChange = this._handleIndexChange.bind(this);
    this.handleGeoLocationChange = this.handleGeoLocationChange.bind(this);
  }

  _handleIndexChange = index => this.setState({index});

  handleGeoLocationChange(/* geoLocation */) {
    //console.log(geoLocation);
  }

  _renderTabBar = props => {
    return (
      <TabBar
        {...props}
        style={[tabBarStyles.tabBar]}
        labelStyle={tabBarStyles.textStyle}
        renderLabel={({route, focused}) => {
          return (
            <Text style={[tabBarStyles.textStyle, {color: focused ? route.color : '#aba2a2'}]}>
              {route.title}
            </Text>
          )
        }}

        contentContainerStyle={{justifyContent: 'center'}}
        indicatorStyle={tabBarStyles.textActive}
        indicatorContainerStyle={{justifyContent: 'center', left: 105}}
        tabStyle={{width: 'auto', alignItems: 'flex-end'}}
        useNativeDriver
      />
    )
      ;
  };

  _renderScene = ({route}) => {
    const plantProjects = getPlantProjectEnum(
      this.props.currentUserProfile,
      this.props.plantProjects
    );

    return (
      <RegisterTreeTab
        onRegister={(mode, value, plantProject) => {
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
      <KeyboardAwareScrollView
        enableOnAndroid
        contentContailnerStyle={{justifyContent: 'center'}}
        extraHeight={66}
        keyboardShouldPersistTaps={'always'}
      >
        <CardLayout style={{flex: 1}}>
          <Text style={styles.ufpTrees}>{i18n.t('label.register_trees')}</Text>
          <Text style={styles.textStyle}>
            {i18n.t('label.register_trees_description')}
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
      </KeyboardAwareScrollView>
    );
  }
}

RegisterTrees.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  currentUserProfile: PropTypes.any.isRequired,
  navigation: PropTypes.any.isRequired
};
