import React, { Component } from 'react';
import { View, ScrollView, Dimensions } from 'react-native';
import styles from '../../styles/selectplantproject/selectplantproject';
import i18n from '../../locales/i18n.js';
import PropTypes from 'prop-types';
import Slick from 'react-native-slick';
import PlantProjectFull from '../PlantProjects/PlantProjectFull';
import PrimaryButton from '../Common/Button/PrimaryButton.native';

class PlantProjectCarousel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      expanded: false
    };
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
    const { plantProjects, tpoName } = this.props;

    return (
      <Slick
        style={styles.slickWrapper}
        showsPagination
        paginationStyle={{
          position: 'absolute',
          top: 0,
          bottom: 490,
          elevation: 9
        }}
        activeDotStyle={{
          backgroundColor: '#b9d384'
        }}
      >
        {plantProjects.length !== 0
          ? plantProjects.map(project => (
              <ScrollView key={project.id}>
                <PlantProjectFull
                  key={'projectFull' + project.id}
                  callExpanded={() => this.callExpanded()}
                  expanded={false}
                  plantProject={project}
                  onSelectClickedFeaturedProjects={id =>
                    this.props.onSelect(id)
                  }
                  tpoName={tpoName}
                />
              </ScrollView>
            ))
          : null}
      </Slick>
    );
  }
}

PlantProjectCarousel.propTypes = {
  tpoName: PropTypes.string,
  plantProjects: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired
};

export default PlantProjectCarousel;
