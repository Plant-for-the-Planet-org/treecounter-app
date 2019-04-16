import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';
import styles from '../../../styles/selectplantproject/list';
import PlantProjectSnippet from '../../../components/PlantProjects/PlantProjectSnippet';
import Proptypes from 'prop-types';
import { FlatList } from 'react-native';

export default class ListViewProjects extends Component {
  constructor(props) {
    super(props);
  }
  selectProject(id) {
    this.props.selectProject(id);
  }

  _keyExtractor = (item, index) => item.id.toString();

  _renderItem = ({ item }) => (
    <PlantProjectSnippet
      cardStyle={styles.cardStyle}
      key={'projectFull' + item.id}
      onMoreClick={id => this.props.onMoreClick(id)}
      plantProject={item}
      onSelectClickedFeaturedProjects={id => this.props.selectProject(id)}
      showMoreButton={false}
      tpoName={item.tpo_name}
    />
  );

  render() {
    let { projects } = this.props;

    return (
      <View style={{ height: '100%' }}>
        <FlatList
          data={projects}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
        />
      </View>
    );
  }
}

ListViewProjects.propTypes = {
  projects: Proptypes.array.isRequired
};
