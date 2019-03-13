import React, { Component } from 'react';
import { View, Image, Text } from 'react-native';
import styles from '../../../styles/selectplantproject/list';
import CardLayout from '../../Common/Card';

import Proptypes from 'prop-types';
import ListViewProjects from './listview';
import { foldout, foldin } from '../../../assets';
import TouchableItem from '../../Common/TouchableItem.native';
import orderBy from 'lodash/orderBy';

export default class CountryProjects extends Component {
  constructor(props) {
    super(props);

    this.state = {
      expanded: false,
      countrySortedProjects: props.plantProjects
    };
  }
  componentDidMount() {
    let { plantProjects } = this.props;
    let countrySortedProjects = JSON.parse(JSON.stringify(plantProjects));

    countrySortedProjects = countrySortedProjects.sort(function(a, b) {
      return a.country > b.country;
    });

    this.setState({
      countrySortedProjects: countrySortedProjects
    });
  }

  callExpanded = () => {
    this.setState({
      expanded: !this.state.expanded
    });
  };

  sortProjects(sortType) {
    let { plantProjects } = this.props;
    if (sortType == 'desc') {
      let countrySortedProjects = JSON.parse(JSON.stringify(plantProjects));

      countrySortedProjects = orderBy(
        countrySortedProjects,
        ['country'],
        'desc'
      );

      this.setState({
        countrySortedProjects: countrySortedProjects
      });
    } else {
      let { plantProjects } = this.props;

      let countrySortedProjects = plantProjects;

      countrySortedProjects = orderBy(
        countrySortedProjects,
        ['country'],
        'asc'
      );
      this.setState({
        countrySortedProjects: Object.assign([], countrySortedProjects)
      });
    }
  }

  render() {
    let { countrySortedProjects } = this.state;
    return (
      <View>
        <View style={styles.cardHeader}>
          <Text style={styles.headingStyle}>Sort by Country</Text>
          <View style={styles.sortContainer}>
            <TouchableItem
              style={styles.imageStyleContainer}
              onPress={this.sortProjects.bind(this, 'desc')}
            >
              <Image style={styles.imageStyle} source={foldin} />
            </TouchableItem>
            <TouchableItem
              style={styles.imageStyleContainer}
              onPress={this.sortProjects.bind(this, 'asc')}
            >
              <Image style={styles.imageStyle} source={foldout} />
            </TouchableItem>
          </View>
        </View>

        <ListViewProjects
          projects={countrySortedProjects}
          selectProject={projectId => this.props.selectProject(projectId)}
          onMoreClick={projectId => this.props.onMoreClick(projectId)}
        />
      </View>
    );
  }
}

CountryProjects.propTypes = {
  plantProjects: Proptypes.array.isRequired,
  selectProject: Proptypes.func.isRequired,
  currencies: Proptypes.object.isRequired,
  onMoreClick: Proptypes.func.isRequired
};
