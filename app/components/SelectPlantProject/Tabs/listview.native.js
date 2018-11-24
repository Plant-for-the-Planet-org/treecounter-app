import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import styles from '../../../styles/selectplantproject/list';
import PlantProjectSnippet from '../../../components/PlantProjects/PlantProjectSnippet';
import Proptypes from 'prop-types';
import scrollStyleNative from '../../../styles/common/scrollStyle.native';

export default class ListViewProjects extends Component {
  constructor(props) {
    super(props);
    this.state = { selectedItem: null };
  }
  highLightProject(projectId) {
    this.setState({ selectedItem: projectId });
  }
  selectProject(id) {
    this.props.selectProject(id);
  }
  render() {
    let { projects } = this.props;
    return (
      <ScrollView contentContainerStyle={{ backgroundColor: 'white' }}>
        {projects.length !== 0
          ? projects.map(project => (
              <PlantProjectSnippet
                cardStyle={styles.cardStyle}
                key={'projectFull' + project.id}
                onMoreClick={id => this.props.onMoreClick(id)}
                plantProject={project}
                onSelectClickedFeaturedProjects={id =>
                  this.props.selectProject(id)
                }
                showMoreButton={false}
                tpoName={project.tpo_name}
              />
            ))
          : null}
      </ScrollView>
    );
  }
}

ListViewProjects.propTypes = {
  projects: Proptypes.array.isRequired
};
