/* eslint-disable no-underscore-dangle */
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { FlatList, View } from 'react-native';

import PlantProjectSnippet from '../../../components/PlantProjects/PlantProjectSnippet';
import styles from '../../../styles/selectplantproject/list.native';

import { flatListContainerStyle } from '../../../styles/selectplantproject/selectplantproject-snippet.native';

export default class ListViewProjects extends PureComponent {
  _keyExtractor = item => item.id.toString();

  _renderItem = ({ item }) => (
    <PlantProjectSnippet
      cardStyle={styles.cardStyle}
      key={'projectFull' + item.id}
      onMoreClick={id => this.props.onMoreClick(id, item.name)}
      plantProject={item}
      onSelectClickedFeaturedProjects={this.props.selectProject}
      showMoreButton={false}
      tpoName={item.tpo_name}
    />
  );

  render() {
    return (
      <View style={{ height: '100%' }}>
        <FlatList
          contentContainerStyle={{
            ...flatListContainerStyle
          }}
          data={this.props.projects}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
        />
      </View>
    );
  }
}

ListViewProjects.propTypes = {
  projects: PropTypes.array.isRequired,
  selectProject: PropTypes.func.isRequired,
  onMoreClick: PropTypes.func.isRequired
};
