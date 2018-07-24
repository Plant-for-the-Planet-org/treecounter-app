import React, { Component } from 'react';
import {
  ScrollView,
  View,
  Text,
  Animated,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import PropTypes from 'prop-types';
import styles from '../../styles/login';
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
  // state = {

  // };

  constructor() {
    super();

    this.state = {
      mode: '',
      individual: {
        treeCount: 1
      },
      index: 0,
      routes: [
        { key: 'singleTree', title: i18n.t('label.individual') },
        { key: 'multipleTrees', title: i18n.t('label.many_trees') }
      ]
    };

    // Bind Local method
    this.onSubmitClick = this.onSubmitClick.bind(this);
    this._handleIndexChange = this._handleIndexChange.bind(this);
    this.handleGeoLocationChange = this.handleGeoLocationChange.bind(this);
  }

  onSubmitClick() {
    this.props.onSubmit(this.state.mode);
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

  _renderScene = SceneMap({
    singleTree: singleTreeForm,
    multipleTrees: multipleTreesForm
  });

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <CardLayout>
          <TabView
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

class singleTreeForm extends Component {
  render() {
    return (
      <View style={{ backgroundColor: '#ffffff' }}>
        <Form
          ref="registerTreeForm"
          type={singleTreeRegisterFormSchema}
          options={schemaOptionsSingleTree}
          // value={this.state.individual}
        />
      </View>
    );
  }
}

class multipleTreesForm extends Component {
  render() {
    return (
      <View style={{ backgroundColor: '#ffffff' }}>
        <Form
          ref="registerTreeForm"
          type={multipleTreesRegisterFormSchema}
          options={schemaOptionsMultipleTrees}
        />
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
    paddingTop: 20,
    backgroundColor: '#ffffff',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
    elevation: 1
  },
  tabItemActive: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    borderBottomColor: '#ec6453',
    borderBottomWidth: 2
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    padding: 10
  },
  textActive: {
    color: '#ec6453',
    fontSize: 18
  },
  text: {
    color: '#aba2a2',
    fontSize: 18
  }
});

RegisterTrees.propTypes = {
  onSubmit: PropTypes.func.isRequired
};
