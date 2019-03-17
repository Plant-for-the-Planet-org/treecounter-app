import React, { Component } from 'react';
import { ScrollView, Text, View } from 'react-native';
import PlantProjectSnippet from '../../PlantProjects/PlantProjectSnippet';
import { updateStaticRoute } from '../../../helpers/routerHelper';
import styles from '../../../styles/selectplantproject/featured.native';
import scrollStyle from '../../../styles/common/scrollStyle.native';

export default class FeaturedCompetitions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      expanded: false,
      pageIndex: 1
    };
  }
  componentWillMount() {
    // let { plantProjects } = this.props;
    // let featuredProjects = plantProjects.reduce((projects, project) => {
    //   if (project.isFeatured) {
    //     projects.push(project);
    //   }
    //   return projects;
    // }, []);
    // this.setState({
    //   featuredProjects: featuredProjects
    // });
  }

  componentWillReceiveProps(nextProps) {
    // let { plantProjects } = nextProps;
    // let featuredProjects = plantProjects.reduce((projects, project) => {
    //   if (project.isFeatured) {
    //     projects.push(project);
    //   }
    //   return projects;
    // }, []);
    // this.setState({
    //   featuredProjects: featuredProjects
    // });
  }

  onSelectClickedFeaturedProjects = id => {
    // this.props.selectProject(id);
    // const { navigation } = this.props;
    // updateStaticRoute(
    //   'app_donate_detail',
    //   navigation,
    //   0,
    //   navigation.getParam('userForm')
    // );
  };

  render() {
    let { featuredProjects } = this.state;
    return (
      <View>
        <Text>Featured</Text>
      </View>
    );
  }
}
