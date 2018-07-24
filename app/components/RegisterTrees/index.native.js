import React, { Component, PureComponent } from 'react';
import {
  ScrollView,
  View,
  Text,
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
    const inputRange = props.navigationState.routes.map((x, i) => i);

    return (
      <View style={styles1.tabBar}>
        {props.navigationState.routes.map((route, i) => {
          return (
            <TouchableOpacity
              style={
                this.state.index === i ? styles1.tabItemActive : styles1.tabItem
              }
              key={'route' + i}
              onPress={() => this.setState({ index: i })}
            >
              <Animated.Text
                style={
                  this.state.index === i ? styles1.textActive : styles1.text
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

const styles1 = StyleSheet.create({
  container: {
    flex: 1
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderWidth: 4,
    borderColor: '#ff644e',
    borderRadius: 5,
    margin: 15
  },
  tabItemActive: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#ff644e'
  },
  tabItem: {
    flex: 1,
    alignItems: 'center'
  },
  textActive: {
    color: '#fff',
    fontSize: 18,
    padding: 10
  },
  text: {
    color: '#ff644e',
    padding: 10,
    fontSize: 18
  }
});

RegisterTrees.propTypes = {
  onSubmit: PropTypes.func.isRequired
};
