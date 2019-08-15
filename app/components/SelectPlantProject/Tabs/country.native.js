import React, { Component } from 'react';
import { View, Image, Text } from 'react-native';
import styles from '../../../styles/selectplantproject/list';
import CardLayout from '../../Common/Card';

import Proptypes from 'prop-types';
import ListViewProjects from './listview';
import { foldout, foldin } from '../../../assets';
import TouchableItem from '../../Common/TouchableItem.native';
import _ from 'lodash';
import i18n from '../../../locales/i18n';

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

      countrySortedProjects = _.orderBy(
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

      countrySortedProjects = _.orderBy(
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
      <View style={styles.flexContainer}>
        <View style={styles.cardHeader}>
          <Text style={styles.headingStyle}>
            {i18n.t('label.select_by_country')}
          </Text>
          <View style={styles.sortContainer}>
            <TouchableItem
              style={styles.imageStyleContainer}
              hitSlop={{ left: 50, right: 150 }}
              onPress={this.sortProjects.bind(this, 'desc')}
            >
              <Image style={styles.imageStyle} source={foldin} />
            </TouchableItem>
            <TouchableItem
              style={styles.imageStyleContainer}
              hitSlop={{ left: 50, right: 150 }}
              onPress={this.sortProjects.bind(this, 'asc')}
            >
              <Image style={styles.imageStyle} source={foldout} />
            </TouchableItem>
          </View>
        </View>
        <View style={styles.listViewContainer}>
          <ListViewProjects
            projects={countrySortedProjects}
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

CountryProjects.propTypes = {
  plantProjects: Proptypes.array.isRequired,
  selectProject: Proptypes.func.isRequired,
  currencies: Proptypes.object.isRequired,
  onMoreClick: Proptypes.func.isRequired
};
