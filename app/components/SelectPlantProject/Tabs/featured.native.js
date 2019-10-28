/* eslint-disable no-underscore-dangle */
import orderBy from 'lodash/orderBy';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { FlatList, View } from 'react-native';

import { updateStaticRoute } from '../../../helpers/routerHelper';
import styles from '../../../styles/selectplantproject/featured.native';
import PlantProjectSnippet from '../../PlantProjects/PlantProjectSnippet';

export default class FeaturedProjects extends PureComponent {
  _keyExtractor = item => item.id.toString();

  _renderItem = ({ item }) => (
    <PlantProjectSnippet
      key={'projectFull' + item.id}
      cardStyle={styles.cardStyle}
      onMoreClick={id => this.props.onMoreClick(id, item.name)}
      plantProject={item}
      onSelectClickedFeaturedProjects={this.onSelectClickedFeaturedProjects}
      showMoreButton={false}
      tpoName={item.tpo_name}
    />
  );

  onSelectClickedFeaturedProjects = id => {
    this.props.selectProject(id);
    const { navigation } = this.props;
    updateStaticRoute(
      'app_donate_detail',
      navigation,
      navigation.getParam('userForm')
    );
  };

  render() {
    let featuredProjects = orderBy(
      this.props.plantProjects.filter(project => project.isFeatured),
      'created'
    );

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

FeaturedProjects.propTypes = {
  plantProjects: PropTypes.array.isRequired,
  selectProject: PropTypes.func.isRequired,
  onMoreClick: PropTypes.func.isRequired,
  navigation: PropTypes.object.isRequired
};
