import React, { Component } from 'react';
import {
  View,
  ScrollView,
  Dimensions,
  Text,
  TextInput,
  Image
} from 'react-native';
import styles from '../../../styles/selectplantproject/list';
import i18n from '../../../locales/i18n.js';

import PrimaryButton from '../../Common/Button/PrimaryButton';
import CardLayout from '../../Common/Card/CardLayout';

const { height, width } = Dimensions.get('window');
import { getAppBarHeight } from '../../../styles/common/header';
import SeeMoreToggle from '../../Common/SeeMoreToggle';
import SearchBar from '../../Header/SearchBar.ios';
import { iosSearchWhite } from '../../../assets';

export default class ListProjects extends Component {
  constructor(props) {
    super(props);

    this.state = {
      expanded: false,
      filteredProjects: props.plantProjects,
      priceSortedProjects: props.plantProjects,
      searchFieldValue: '',
      mode: 'name',
      isOpen: false,
      modalProject: null
    };
  }
  componentWillMount() {
    this.setState({
      filteredProjects: this.props.plantProjects
    });
  }

  onSelectProject = id => {
    this.props.selectProject(id);
  };

  callExpanded = () => {
    this.setState({
      expanded: !this.state.expanded
    });
  };

  _handleChangeText = event => {
    let value = event.toLowerCase();
    let { plantProjects } = this.props;
    let filteredProjects = plantProjects.reduce((projects, project) => {
      if (
        project.name.toLowerCase().includes(value) ||
        project.tpo_name.toLowerCase().includes(value)
      ) {
        projects.push(project);
      }
      return projects;
    }, []);
    this.setState({
      filteredProjects: filteredProjects,
      searchFieldValue: value
    });
  };

  render() {
    let { filteredProjects } = this.state;
    return (
      <CardLayout
        style={{
          flex: 1,
          flexDirection: 'column'
        }}
      >
        <View style={[styles.searchContainer]}>
          <TextInput
            ref={view => {
              this._textInput = view;
            }}
            clearButtonMode="while-editing"
            onChangeText={this._handleChangeText}
            value={this.state.text}
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="search"
            placeholder="Search"
            placeholderTextColor={this.props.placeholderTextColor || '#ccc'}
            style={[styles.searchInput]}
          />

          <View style={styles.searchIconContainer}>
            <Image source={iosSearchWhite} style={styles.searchIcon} />
          </View>
        </View>
        <ScrollView>
          <View style={styles.listContentContainer}>
            {filteredProjects.length !== 0
              ? filteredProjects.map(project => (
                  <View
                    style={{
                      height: 170,
                      flexDirection: 'column'
                    }}
                  >
                    <View style={styles.projectNameContainer}>
                      <Text style={styles.projectNameText}>{project.name}</Text>
                      <Text
                        style={[styles.projectNameText, styles.tpoNameText]}
                      >
                        By {project.tpo_name}
                      </Text>
                    </View>
                    <View style={styles.projectMetaContainer}>
                      <View style={styles.projectMetaLabels}>
                        <Text style={styles.textStyle}>Location</Text>
                        <Text style={styles.textStyle}>Planted Trees</Text>
                        <Text style={styles.textStyle}>Survival Rate</Text>
                        <Text style={styles.textStyle}>Cost Per Tree</Text>
                      </View>
                      <View style={styles.projectMetaValue}>
                        <Text style={styles.textStyle}>{project.location}</Text>
                        <Text style={styles.textStyle}>
                          {project.countPlanted}
                        </Text>
                        <Text style={styles.textStyle}>
                          {project.survivalRate}
                        </Text>
                        <Text style={styles.textStyle}>
                          {project.treeCost.toFixed(2)}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.projectButtonContainer}>
                      <SeeMoreToggle
                        style={{ paddingLeft: 5 }}
                        seeMore={!this.state.expanded}
                        onToggle={this.toggleExpanded}
                      />
                      <PrimaryButton
                        buttonStyle={{
                          height: 20,
                          paddingLeft: 2,
                          paddingRight: 2,
                          paddingTop: 0,
                          paddingBottom: 0,
                          margin: 0,
                          borderWidth: 0,
                          borderRadius: 0,
                          marginRight: 5
                        }}
                        textStyle={{ fontSize: 12 }}
                      >
                        select project
                      </PrimaryButton>
                    </View>
                  </View>
                ))
              : null}
          </View>
        </ScrollView>
      </CardLayout>
    );
  }
}
