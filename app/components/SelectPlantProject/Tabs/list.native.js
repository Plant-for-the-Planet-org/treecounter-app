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
import CardLayout from '../../Common/Card';

const { height, width } = Dimensions.get('window');
import { getAppBarHeight } from '../../../styles/common/header';
import SeeMoreToggle from '../../Common/SeeMoreToggle';
import SearchBar from '../../Header/SearchBar';
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
      <CardLayout style={styles.cardStyle} key={'listViewProject'}>
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
            <Image source={iosSearchGrey} style={styles.searchIcon} />
          </View>
        </View>

        <ListViewProjects
          projects={filteredProjects}
          selectProject={projectId => this.props.selectProject(projectId)}
        />
      </CardLayout>
    );
  }
}

ListProjects.propTypes = {
  plantProjects: Proptypes.array.isRequired,
  selectProject: Proptypes.func.isRequired
};
