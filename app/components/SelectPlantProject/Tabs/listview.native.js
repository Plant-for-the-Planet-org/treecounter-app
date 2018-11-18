import React, { Component } from 'react';
import {
  View,
  ScrollView,
  Text,
  Image,
  TouchableHighlight
} from 'react-native';
import styles from '../../../styles/selectplantproject/list';
import PlantProjectSnippet from '../../../components/PlantProjects/PlantProjectSnippet';
import Proptypes from 'prop-types';

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
      <ScrollView>
        <View style={styles.listContentContainer}>
          {projects.length !== 0
            ? projects.map((project, index) => (
                <PlantProjectSnippet
                  cardStyle={{
                    padding: 0,
                    margin: 0
                  }}
                  key={'projectFull' + project.id}
                  onMoreClick={id => this.props.onMoreClick(id)}
                  plantProject={project}
                  onSelectClickedFeaturedProjects={id =>
                    this.props.selectProject(id)
                  }
                  showMoreButton={true}
                  tpoName={project.tpo_name}
                />
              ))
            : null}
        </View>
      </ScrollView>
    );
  }
}

ListViewProjects.propTypes = {
  projects: Proptypes.array.isRequired
};
