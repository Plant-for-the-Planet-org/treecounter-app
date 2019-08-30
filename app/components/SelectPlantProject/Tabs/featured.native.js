import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import PlantProjectSnippet from '../../PlantProjects/PlantProjectSnippet';
import { updateStaticRoute } from '../../../helpers/routerHelper';
import styles from '../../../styles/selectplantproject/featured.native';
import scrollStyle from '../../../styles/common/scrollStyle.native';
import _ from 'lodash';

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
    featuredProjects = _.orderBy(featuredProjects, 'created');
    this.setState({
      featuredProjects: featuredProjects
    });
  }
  _keyExtractor = (item, index) => item.id.toString();

  _renderItem = ({ item }) => (
    <PlantProjectSnippet
      key={'projectFull' + item.id}
      cardStyle={styles.cardStyle}
      onMoreClick={id => this.props.onMoreClick(id, item.name)}
      plantProject={item}
      onSelectClickedFeaturedProjects={id =>
        this.onSelectClickedFeaturedProjects(id)
      }
      showMoreButton={false}
      tpoName={item.tpo_name}
    />
  );

  componentWillReceiveProps(nextProps) {
    let { plantProjects } = nextProps;
    let featuredProjects = plantProjects.reduce((projects, project) => {
      if (project.isFeatured) {
        projects.push(project);
      }
      return projects;
    }, []);
    featuredProjects = _.orderBy(featuredProjects, 'created');
    this.setState({
      featuredProjects: featuredProjects
    });
  }

  onSelectClickedFeaturedProjects = id => {
    this.props.selectProject(id);
    const { navigation } = this.props;
    updateStaticRoute(
      'app_donate_detail',
      navigation,
      0,
      navigation.getParam('userForm')
    );
  };

  render() {
    let { featuredProjects } = this.state;
    return (
      <View style={styles.flexContainer}>
        <FlatList
          contentContainerStyle={{ paddingBottom: 45 }}
          data={featuredProjects}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
        />
      </View>
    );
  }
}
