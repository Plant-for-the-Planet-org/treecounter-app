import React, { Component } from 'react';
import { View, Dimensions, TextInput, Image } from 'react-native';

import styles from '../../../styles/selectplantproject/list';
import CardLayout from '../../Common/Card';
import { iosSearchGrey } from '../../../assets';
import ListViewProjects from './listview';
import Proptypes from 'prop-types';

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
      <View key={'listViewProject'} style={styles.flexContainer}>
        <View style={styles.searchItem}>
          <View style={[styles.searchContainer]}>
            <TextInput
              ref={view => {
                this._textInput = view;
              }}
              clearButtonMode="while-editing"
              underlineColorAndroid={'transparent'}
              onChangeText={this._handleChangeText}
              value={this.state.text}
              autoCapitalize="none"
              autoCorrect={false}
              returnKeyType="search"
              placeholder="Search"
              placeholderTextColor={this.props.placeholderTextColor || '#ccc'}
              style={[styles.searchInput, { paddingVertical: 0 }]}
              autoCapitalize={'sentences'}
            />

            <View style={styles.searchIconContainer}>
              <Image
                source={iosSearchGrey}
                resizeMode="contain"
                style={styles.searchIcon}
              />
            </View>
          </View>
        </View>

        <View style={styles.listViewContainer}>
          <ListViewProjects
            projects={filteredProjects}
            selectProject={projectId => this.props.selectProject(projectId)}
            onMoreClick={(projectId, name) =>
              this.props.onMoreClick(projectId, name)
            }
          />
        </View>
      </View>
    );
  }
}

ListProjects.propTypes = {
  plantProjects: Proptypes.array.isRequired,
  selectProject: Proptypes.func.isRequired,
  onMoreClick: Proptypes.func.isRequired
};
