import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import styles from '../../styles/selectplantproject/selectplantproject';
import PropTypes from 'prop-types';
import Slick from 'react-native-slick';
import PlantProjectFull from '../PlantProjects/PlantProjectFull';

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
    const backgroundColor = '#b9d384';
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
          backgroundColor: backgroundColor
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
                  selectProject={this.props.selectProject}
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
