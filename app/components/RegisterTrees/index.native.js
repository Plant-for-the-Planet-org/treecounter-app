import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import { TabView } from 'react-native-tab-view';
import CardLayout from '../Common/Card/CardLayout';
import {
  singleTreeRegisterFormSchema,
  schemaOptionsSingleTree,
  multipleTreesRegisterFormSchema,
  schemaOptionsMultipleTrees
} from '../../server/parsedSchemas/registerTrees';
import i18n from '../../locales/i18n.js';
import { renderFilledTabBar } from '../Common/Tabs';
import RegisterTreeTab from './RegisterTreeTab.native';

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

  handleGeoLocationChange(geoLocation) {
    console.log(geoLocation);
  }

  _renderTabBar = props => {
    return renderFilledTabBar(
      props.navigationState.routes,
      this.state.index,
      index => this.setState({ index })
    );
  };

  _renderScene = ({ route }) => {
    return (
      <RegisterTreeTab
        onRegister={this.props.onSubmit}
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
        // value={{ treeCount: 1 }}
      />
    );
  };

  render() {
    return (
      <ScrollView>
        <CardLayout>
          <TabView
            ref="registerTreeForm"
            navigationState={this.state}
            renderScene={this._renderScene}
            renderTabBar={this._renderTabBar}
            onIndexChange={this._handleIndexChange}
          />
        </CardLayout>
      </ScrollView>
    );
  }
}

RegisterTrees.propTypes = {
  onSubmit: PropTypes.func.isRequired
};
