import React, { Component } from 'react';
import { View, ScrollView, Dimensions } from 'react-native';
import styles from '../../../styles/selectplantproject/selectplantproject';
import i18n from '../../../locales/i18n.js';

import Slick from 'react-native-slick';
import PlantProjectFull from '../../PlantProjects/PlantProjectFull';

export default class FeaturedProjects extends Component {
  constructor(props) {
    super(props);

    this.state = {
      expanded: false,
      pageIndex: 0,
      featuredProjects: props.plantProjects
    };
  }
  componentWillMount() {
    let { plantProjects } = this.props;

    let featuredProjects = plantProjects.reduce((projects, project) => {
      if (project.isFeatured) {
        projects.push(project);
      }
      return projects;
    }, []);
    this.setState({
      featuredProjects: featuredProjects
    });
  }

  componentWillReceiveProps(nextProps) {
    let { plantProjects } = nextProps;
    let featuredProjects = plantProjects.reduce((projects, project) => {
      if (project.isFeatured) {
        projects.push(project);
      }
      return projects;
    }, []);
    this.setState({
      featuredProjects: featuredProjects
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
        {featuredProjects && featuredProjects.length > 0 ? (
          <Slick style={styles.slickWrapper} showsPagination={false}>
            {featuredProjects.map(project => (
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
            ))}
          </Slick>
        ) : null}
      </ScrollView>
    );
  }
}
