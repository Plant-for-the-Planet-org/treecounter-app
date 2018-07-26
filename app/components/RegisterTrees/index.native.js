import React, { Component, PureComponent } from 'react';
import {
  ScrollView,
  View,
  Animated,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import PropTypes from 'prop-types';
import t from 'tcomb-form-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import PrimaryButton from '../Common/Button/PrimaryButton';
import CardLayout from '../Common/Card/CardLayout';
import {
  singleTreeRegisterFormSchema,
  schemaOptionsSingleTree,
  multipleTreesRegisterFormSchema,
  schemaOptionsMultipleTrees
} from '../../server/parsedSchemas/registerTrees';
import i18n from '../../locales/i18n.js';
import { renderFilledTabBar } from '../Common/Tabs';

const Form = t.form.Form;
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
    switch (route.key) {
      case 'single-tree':
        return (
          <SingleTreeForm onRegister={this.props.onSubmit} mode={route.key} />
        );
      case 'multiple-trees':
        return (
          <MultipleTreesForm
            onRegister={this.props.onSubmit}
            mode={route.key}
          />
        );
      default:
        return null;
    }
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

class SingleTreeForm extends PureComponent {
  render() {
    return (
      <View style={{ backgroundColor: '#ffffff' }}>
        <Form
          ref="singleTreeForm"
          type={singleTreeRegisterFormSchema}
          options={schemaOptionsSingleTree}
          // value={this.state.individual}
        />
        <PrimaryButton
          onClick={() => {
            this.props.onRegister(this.props.mode, this.refs.singleTreeForm);
          }}
        >
          {i18n.t('label.register')}
        </PrimaryButton>
      </View>
    );
  }
}

class MultipleTreesForm extends PureComponent {
  render() {
    return (
      <View style={{ backgroundColor: '#ffffff' }}>
        <Form
          ref="multipleTreesForm"
          type={multipleTreesRegisterFormSchema}
          options={schemaOptionsMultipleTrees}
        />
        <PrimaryButton
          onClick={() => {
            this.props.onRegister(this.props.mode, this.refs.multipleTreesForm);
          }}
        >
          {i18n.t('label.register')}
        </PrimaryButton>
      </View>
    );
  }
}

RegisterTrees.propTypes = {
  onSubmit: PropTypes.func.isRequired
};
