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
