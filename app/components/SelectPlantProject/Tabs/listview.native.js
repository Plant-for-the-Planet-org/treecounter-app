/* eslint-disable no-underscore-dangle */
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { FlatList, View, Image, Text } from 'react-native';
import { trees } from './../../../assets';
import i18n from '../../../locales/i18n.js';

import PlantProjectSnippet from '../../../components/PlantProjects/PlantProjectSnippet';
import styles from '../../../styles/selectplantproject/list.native';
import { updateStaticRoute } from '../../../helpers/routerHelper';
import { flatListContainerStyle } from '../../../styles/selectplantproject/selectplantproject-snippet.native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectPlantProjectAction } from '../../../actions/selectPlantProjectAction';
class ListViewProjects extends PureComponent {
  constructor(props) {
    super(props);
  }
  _keyExtractor = item => item.id.toString();
  onSelectClickedFeaturedProjects(id) {
    this.props.selectPlantProjectAction(id);
    const { navigation } = this.props;
    updateStaticRoute(
      'app_donate_detail',
      navigation,
      navigation.getParam('userForm')
    );
  }
  _renderItem = ({ item }) => (
    <PlantProjectSnippet
      cardStyle={styles.cardStyle}
      key={'projectFull' + item.id}
      onMoreClick={id => this.props.onMoreClick(id, item.name)}
      plantProject={item}
      onSelectClickedFeaturedProjects={this.props.selectProject}
      showMoreButton={false}
      tpoName={item.tpo_name}
      selectProject={this.onSelectClickedFeaturedProjects}
      navigation={this.props.navigation}
    />
  );

  render() {
    const Header = (
      <View style={styles.headerView}>
        <Text style={styles.headerTitle}>
          {i18n.t('label.select_project_title')}
        </Text>
        <Image
          source={trees}
          style={{ height: 60, flex: 1 }}
          resizeMode="contain"
        />
      </View>
    );
    return (
      <View style={{ height: '100%' }}>
        <FlatList
          contentContainerStyle={{
            ...flatListContainerStyle
          }}
          ListHeaderComponent={Header}
          data={this.props.projects}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
        />
      </View>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      selectPlantProjectAction
    },
    dispatch
  );
};
export default connect(null, mapDispatchToProps)(ListViewProjects);
ListViewProjects.propTypes = {
  projects: PropTypes.array.isRequired,
  selectProject: PropTypes.func.isRequired,
  onMoreClick: PropTypes.func.isRequired
};
