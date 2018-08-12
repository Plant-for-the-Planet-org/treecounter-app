import React, { Component } from 'react';
import { View, ScrollView, Dimensions } from 'react-native';
import styles from '../../styles/selectplantproject/selectplantproject';
import i18n from '../../locales/i18n.js';

import Slick from 'react-native-slick';
import PlantProjectFull from '../PlantProjects/PlantProjectFull';
import PrimaryButton from '../Common/Button/PrimaryButton.native';
import CardLayout from '../Common/Card/CardLayout';
const { width, height } = Dimensions.get('window');

export default class SelectPlantProject extends Component {
  static data = {
    tabs: [
      {
        name: i18n.t('label.name'),
        id: 'name'
      },
      {
        name: i18n.t('label.price'),
        id: 'price'
      }
    ]
  };
  constructor(props) {
    super(props);

    this.state = {
      expanded: false,
      pageIndex: 0,
      filteredProjects: props.plantProjects,
      featuredProjects: props.plantProjects,
      priceSortedProjects: props.plantProjects,
      searchFieldValue: '',
      mode: 'name',
      isOpen: false,
      modalProject: null
    };
  }
  componentWillMount() {
    let { plantProjects, currencies } = this.props;
    currencies = currencies.currencies;
    let featuredProjects = plantProjects.reduce((projects, project) => {
      if (project.isFeatured) {
        projects.push(project);
      }
      return projects;
    }, []);
    let priceSortedProjects = JSON.parse(JSON.stringify(plantProjects));
    if (currencies) {
      priceSortedProjects = priceSortedProjects.sort(function(a, b) {
        return (
          a.treeCost *
            parseFloat(currencies.currency_rates['EUR'].rates[a.currency]) -
          b.treeCost *
            parseFloat(currencies.currency_rates['EUR'].rates[b.currency])
        );
      });
    }
    this.setState({
      filteredProjects: plantProjects,
      featuredProjects: featuredProjects,
      priceSortedProjects: priceSortedProjects
    });
  }

  componentWillReceiveProps(nextProps) {
    let { plantProjects, currencies } = nextProps;
    currencies = currencies.currencies;
    let featuredProjects = plantProjects.reduce((projects, project) => {
      if (project.isFeatured) {
        projects.push(project);
      }
      return projects;
    }, []);
    let priceSortedProjects = plantProjects;
    if (currencies) {
      priceSortedProjects = plantProjects.sort(function(a, b) {
        return (
          a.treeCost *
            parseFloat(currencies.currency_rates['EUR'].rates[a.currency]) -
          b.treeCost *
            parseFloat(currencies.currency_rates['EUR'].rates[b.currency])
        );
      });
    }
    this.setState({
      filteredProjects: plantProjects,
      featuredProjects: featuredProjects,
      priceSortedProjects: priceSortedProjects
    });
  }

  onSelectClickedFeaturedProjects = id => {
    this.props.selectProject(id);
  };

  callExpanded = () => {
    this.setState({
      expanded: !this.state.expanded
    });
  };

  render() {
    let { featuredProjects } = this.state;
    return (
      <Slick
        style={styles.slickWrapper}
        // showsPagination={true}
        // paginationStyle={{
        //   position: 'absolute',
        //   top: 0,
        //   bottom: 490,
        //   elevation: 9
        // }}
        // activeDotStyle={{
        //   backgroundColor: '#b9d384'
        // }}
      >
        {featuredProjects.length !== 0
          ? featuredProjects.map(project => (
              <ScrollView key={project.id}>
                <PlantProjectFull
                  key={'projectFull' + project.id}
                  callExpanded={() => this.callExpanded()}
                  expanded={false}
                  plantProject={project}
                  onSelectClickedFeaturedProjects={id =>
                    this.onSelectClickedFeaturedProjects(id)
                  }
                  tpoName={project.tpo_name}
                />
              </ScrollView>
            ))
          : null}
      </Slick>
    );
  }
}
