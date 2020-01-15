/* eslint-disable no-underscore-dangle */
import orderBy from 'lodash/orderBy';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { FlatList, View, Image, Text } from 'react-native';

import { updateStaticRoute } from '../../../helpers/routerHelper';
import styles from '../../../styles/selectplantproject/featured.native';
import PlantProjectSnippet from '../../PlantProjects/PlantProjectSnippet';
import { flatListContainerStyle } from '../../../styles/selectplantproject/selectplantproject-snippet.native';
import { trees } from './../../../assets';
import i18n from '../../../locales/i18n.js';
export default class FeaturedProjects extends PureComponent {
  constructor(props) {
    super(props);
    this.onSelectClickedFeaturedProjects = this.onSelectClickedFeaturedProjects.bind(
      this
    );
  }
  onRefresh() {
    if (!this.state.isFetching && this.state.shouldLoad)
      this.setState({ isFetching: true, page: 1 }, async () => {
        try {
          const data = await this.props.loadProjects('featured', {
            page: this.state.page
          });
          this.setState({
            plantProjects: [...data],
            isFetching: false,
            shouldLoad: data.length == this.perPage
          });
        } catch (error) {
          this.setState({ isFetching: false });
        }
      });
  }
  async componentWillReceiveProps(nextProps) {
    if (nextProps.index == 0 && !this.state.initiated) {
      console.log(
        'component got index calling in featured=======================================================',
        nextProps
      );
      this.setState({
        initiated: true,
        shouldLoad: this.props.plantProjects.length == this.perPage
      });
    }
  }
  fetchMore = () => {
    console.log('this. should load in fetch more', this.state.shouldLoad);
    if (!this.state.isFetching && this.state.shouldLoad)
      this.setState({ page: this.state.page + 1 }, async () => {
        try {
          const data = await this.props.loadProjects('featured', {
            page: this.state.page
          });
          this.setState({
            isFetching: false,
            shouldLoad: data.length == this.perPage,
            plantProjects: [...this.state.plantProjects, ...data]
          });
          console.log('Got from fetch more:', data, this.perPage);
        } catch (error) {
          this.setState({ isFetching: false, shouldLoad: false });
        }
      });
  };
  _keyExtractor = item => item.id.toString();
  onSelectClickedFeaturedProjects(id) {
    this.props.selectProject(id);
    const { navigation } = this.props;
    updateStaticRoute(
      'app_donate_detail',
      navigation,
      navigation.getParam('userForm')
    );
  }

  _renderItem = ({ item }) => (
    <PlantProjectSnippet
      key={'projectFull' + item.id}
      cardStyle={styles.cardStyle}
      onMoreClick={id => this.props.onMoreClick(id, item.name)}
      plantProject={item}
      onSelectClickedFeaturedProjects={this.onSelectClickedFeaturedProjects}
      showMoreButton={false}
      tpoName={item.tpo_name}
      selectProject={this.props.onSelectProjects}
      navigation={this.props.navigation}
    />
  );

  render() {
    let featuredProjects = orderBy(
      this.props.plantProjects.filter(project => project.isFeatured),
      'created'
    );

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
      <View style={styles.flexContainer}>
        <FlatList
          contentContainerStyle={{
            ...flatListContainerStyle
          }}
          ListHeaderComponent={Header}
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
