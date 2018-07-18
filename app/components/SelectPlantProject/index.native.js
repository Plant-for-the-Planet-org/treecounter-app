import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableHighlight } from 'react-native';
import styles from '../../styles/selectplantproject';
import i18n from '../../locales/i18n.js';

import Slick from 'react-native-slick';
import PlantProjectFull from '../PlantProjects/PlantProjectFull';
import PrimaryButton from '../Common/Button/PrimaryButton.native';

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
      <ScrollView>
        <View style={styles.selectPlantProjectContainer}>
          <View style={styles.header}>
            <Text style={styles.titleText}>{i18n.t('label.donateTrees')}</Text>
            <View style={styles.titleTextUnderline} />
          </View>
          <View style={styles.cardContainer}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardHeaderText}>
                {i18n.t('label.featuredProjects')}
              </Text>
            </View>
            <View style={styles.cardContent}>
              <Slick
                style={styles.slickWrapper}
                //  buttonWrapperStyle={styles.tpoFooterNavImage}
                nextButton={<Text style={styles.tpoFooterNavImageLeft}>›</Text>}
                prevButton={
                  <Text style={styles.tpoFooterNavImageRight}>‹</Text>
                }
                dot={
                  <View
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 50,
                      elevation: 5,
                      backgroundColor: 'black',
                      width: 8,
                      height: 8,
                      borderRadius: 4,
                      marginLeft: 3,
                      marginRight: 3,
                      marginTop: 3,
                      marginBottom: 3
                    }}
                  />
                }
                showButtons={true}
                height="100%"
              >
                {featuredProjects.length !== 0
                  ? featuredProjects.map(project => (
                      <View key={project.id} style={styles.plantProjectContent}>
                        <View style={styles.plantProjectContentFull}>
                          <PlantProjectFull
                            callExpanded={() => this.callExpanded()}
                            expanded={false}
                            plantProject={project}
                            tpoName={project.tpo_name}
                          />
                        </View>
                        <View style={styles.plantProjectSelectButton}>
                          <PrimaryButton
                            onClick={() =>
                              this.onSelectClickedFeaturedProjects(project.id)
                            }
                          >
                            {i18n.t('label.select_project')}
                          </PrimaryButton>
                        </View>
                      </View>
                    ))
                  : null}
              </Slick>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}
