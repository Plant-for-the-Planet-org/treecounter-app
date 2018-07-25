import React, { Component } from 'react';
import t from 'tcomb-form-native';
import PropTypes from 'prop-types';
import { StyleSheet, View, Animated, TouchableOpacity } from 'react-native';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import SelectPlantProjectContainer from '../../containers/SelectPlantProject';

import {
  receiptIndividualFormSchema,
  receiptCompanyFormSchema,
  companySchemaOptions,
  individualSchemaOptions
} from '../../server/parsedSchemas/donateTrees';
import CardLayout from '../Common/Card/CardLayout';

let Form = t.form.Form;

export default class DonateTrees extends Component {
  state = {
    index: 0,
    routes: [
      { key: 'featured', title: 'Featured' },
      { key: 'individual', title: 'Individual' },
      { key: 'company', title: 'Company' }
    ]
  };

  _handleIndexChange = index => this.setState({ index });

  _renderTabBar = props => {
    const inputRange = props.navigationState.routes.map((x, i) => i);

    return (
      <View style={styles.tabBar}>
        {props.navigationState.routes.map((route, i) => {
          return (
            <TouchableOpacity
              style={
                this.state.index === i ? styles.tabItemActive : styles.tabItem
              }
              key={'route' + i}
              onPress={() => this.setState({ index: i })}
            >
              <Animated.Text
                style={this.state.index === i ? styles.textActive : styles.text}
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
    individual: individualForm,
    company: companyForm,
    featured: Featured
  });

  render() {
    return (
      <TabView
        navigationState={this.state}
        renderScene={this._renderScene}
        renderTabBar={this._renderTabBar}
        onIndexChange={this._handleIndexChange}
      />
    );
  }
}

class individualForm extends Component {
  render() {
    return (
      <CardLayout
        style={{ flex: 1, justifyContent: 'flex-start', paddingTop: 10 }}
      >
        <Form
          ref={'donorDetailsForm'}
          type={receiptIndividualFormSchema}
          options={individualSchemaOptions}
        />
      </CardLayout>
    );
  }
}

class companyForm extends Component {
  render() {
    return (
      <CardLayout
        style={{ flex: 1, justifyContent: 'flex-start', paddingTop: 10 }}
      >
        <Form
          ref={'donorDetailsForm'}
          type={receiptCompanyFormSchema}
          options={companySchemaOptions}
        />
      </CardLayout>
    );
  }
}

class Featured extends Component {
  render() {
    return <SelectPlantProjectContainer />;
  }
}

const styles = StyleSheet.create({
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

DonateTrees.propTypes = {
  selectedProject: PropTypes.object,
  selectedTpo: PropTypes.object,
  currentUserProfile: PropTypes.object,
  currencies: PropTypes.object,
  donate: PropTypes.func,
  paymentClear: PropTypes.func,
  supportTreecounter: PropTypes.object,
  paymentStatus: PropTypes.object,
  plantProjectClear: PropTypes.func
};
