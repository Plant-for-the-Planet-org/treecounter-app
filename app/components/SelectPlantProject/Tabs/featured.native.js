import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import PlantProjectSnippet from '../../PlantProjects/PlantProjectSnippet';
import { updateStaticRoute } from '../../../helpers/routerHelper';
import styles from '../../../styles/selectplantproject/featured.native';
import scrollStyle from '../../../styles/common/scrollStyle.native';

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
    const { navigation } = this.props;
    updateStaticRoute('app_donate_detail', navigation);
  };

  render() {
    let { featuredProjects } = this.state;
    return (
      <ScrollView
        contentContainerStyle={[scrollStyle.styleContainer, { flex: 1 }]}
      >
        {featuredProjects && featuredProjects.length > 0
          ? featuredProjects.map(project => (
              <PlantProjectSnippet
                key={'projectFull' + project.id}
                cardStyle={styles.cardStyle}
                onMoreClick={id => this.props.onMoreClick(id)}
                plantProject={project}
                onSelectClickedFeaturedProjects={id =>
                  this.onSelectClickedFeaturedProjects(id)
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
