import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { TabView, TabBar } from 'react-native-tab-view';
import { Text, View, ScrollView } from 'react-native';
import tabBarStyles from '../../styles/common/tabbar.native';
import t from 'tcomb-form-native';
import {
  parsedSchema,
  plantProjectSchema
} from '../../server/parsedSchemas/editProfile';
import CardLayout from '../Common/Card';

const Form = t.form.Form;
export default class EditUserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      routes: [
        {
          key: 'basic',
          title: 'Basic'
        },
        {
          key: 'desc',
          title: 'Description'
        },
        {
          key: 'security',
          title: 'Security'
        }
      ]
    };
  }

  _renderTabBar = props => {
    return (
      <TabBar
        {...props}
        indicatorStyle={tabBarStyles.indicator}
        style={[tabBarStyles.tabBar]}
        labelStyle={tabBarStyles.textStyle}
        indicatorStyle={tabBarStyles.textActive}
      />
    );
  };

  _handleIndexChange = index => this.setState({ index });

  getFormSchemaOption = (userType, profileType) => {
    let schemaOptions = parsedSchema[userType][profileType].schemaOptions;

    return schemaOptions;
  };

  _renderScene = ({ route }) => {
    const { type, image } = this.props.currentUserProfile;
    switch (route.key) {
      case 'basic':
        return (
          <CardLayout style={{ flex: 1 }}>
            <View {...this.props} style={styles.mapContainer}>
              <Form
                ref={'profile'}
                type={parsedSchema[type].profile.transformedSchema}
                options={this.getFormSchemaOption(type, 'profile')}
                value={this.props.currentUserProfile}
              />
            </View>
          </CardLayout>
        );
        break;
      case 'desc':
        return (
          <View {...this.props} style={styles.listContainer}>
            <ScrollView>
              <Text>Description</Text>
            </ScrollView>
          </View>
        );
      case 'security':
        return (
          <View {...this.props} style={styles.listContainer}>
            <ScrollView>
              <Text>Security</Text>
            </ScrollView>
          </View>
        );
        break;
        return null;
    }
  };

  render() {
    return (
      <ScrollView contentContainerStyle={{ flex: 1 }}>
        <View style={styles.headContainer} />
        <TabView
          useNativeDriver={true}
          navigationState={this.state}
          renderScene={this._renderScene.bind(this)}
          renderTabBar={this._renderTabBar}
          onIndexChange={this._handleIndexChange}
        />
      </ScrollView>
    );
  }
}

EditUserProfile.propTypes = {
  onSave: PropTypes.func.isRequired,
  currentUserProfile: PropTypes.object,
  openPasswordUpdatedDialog: PropTypes.bool,
  handlePaswordUpdatedClose: PropTypes.func,
  deleteProfile: PropTypes.func.isRequired,
  updatePlantProject: PropTypes.func.isRequired,
  deletePlantProject: PropTypes.func.isRequired,
  addPlantProject: PropTypes.func.isRequired
};
