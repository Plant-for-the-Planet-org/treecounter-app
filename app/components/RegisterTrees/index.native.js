/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import { TabView } from 'react-native-tab-view';
import CardLayout from '../Common/Card';
import {
  singleTreeRegisterFormSchema,
  schemaOptionsSingleTree,
  multipleTreesRegisterFormSchema,
  schemaOptionsMultipleTrees
} from '../../server/parsedSchemas/registerTrees';
import i18n from '../../locales/i18n.js';
import { renderFilledTabBar } from '../Common/Tabs';
import RegisterTreeTab from './RegisterTreeTab.native';
import { getPlantProjectEnum, isTpo } from '../../helpers/utils';

export default class RegisterTrees extends Component {
  constructor() {
    super();

    this.state = {
      individual: {
        treeCount: 1
      },
      index: 0,
      routes: [
        {
          key: 'single-tree',
          title: i18n.t('label.individual')
        },
        { key: 'multiple-trees', title: i18n.t('label.many_trees') }
      ]
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
    return renderFilledTabBar(
      props.navigationState.routes,
      this.state.index,
      index => this.setState({ index })
    );
  };

  _renderScene = ({ route }) => {
    const plantProjects = getPlantProjectEnum(
      this.props.currentUserProfile,
      this.props.plantProjects
    );

    return (
      <RegisterTreeTab
        onRegister={this.props.onSubmit}
        isTpo={isTpo(this.props.currentUserProfile)}
        mode={route.key}
        schemaType={
          route.key == 'single-tree'
            ? singleTreeRegisterFormSchema
            : multipleTreesRegisterFormSchema
        }
        schemaOptions={
          route.key == 'single-tree'
            ? schemaOptionsSingleTree
            : schemaOptionsMultipleTrees
        }
        plantProjects={plantProjects}
      />
    );
  };

  render() {
    return (
      <ScrollView
        contentContainerStyle={{ flex: 1, paddingBottom: 72 }}
        enableOnAndroid
      >
        <CardLayout style={{ flex: 1 }}>
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
  currentUserProfile: PropTypes.any.isRequired
};
