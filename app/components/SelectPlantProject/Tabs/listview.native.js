/* eslint-disable no-underscore-dangle */
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { FlatList, View, RefreshControl } from 'react-native';
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
    this.perPage = 10;
    this.state = {
      plantProjects: [],
      isFetching: false,
      page: 1,
      initiated: false,
      shouldLoad: true
    };
  }
  onRefresh() {
    this.setState({ isFetching: true, page: 1 }, async () => {
      try {
        const data = await this.props.loadProjects('all', {
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
    if (nextProps.index && !this.state.initiated) {
      console.log(
        'component got index list =======================================================',
        nextProps
      );
      this.setState({ initiated: true });
      try {
        const data = await this.props.loadProjects('all', {});
        this.setState({ isFetching: false, plantProjects: data }, () => {
          console.log(
            'component updated with data first time list =======================================================',
            this.state
          );
        });
      } catch (error) {
        this.setState({ isFetching: false });
      }
    }
  }
  fetchMore = () => {
    if (!this.state.isFetching && this.state.shouldLoad)
      this.setState({ page: this.state.page + 1 }, async () => {
        console.log('fettch more list calling load');
        try {
          const data = await this.props.loadProjects('all', {
            page: this.state.page
          });
          this.setState({
            isFetching: false,
            shouldLoad: data.length == this.perPage,
            plantProjects: [...this.state.plantProjects, ...data]
          });
          console.log('Got from fetch more:', data);
        } catch (error) {
          this.setState({ isFetching: false });
        }
      });
  };
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
    return (
      <View style={{ height: '100%' }}>
        <FlatList
          contentContainerStyle={{
            ...flatListContainerStyle
          }}
          data={this.state.plantProjects}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
          onEndReached={this.fetchMore}
          onEndReachedThreshold={3}
          refreshControl={
            <RefreshControl
              refreshing={this.state.isFetching}
              onRefresh={this.onRefresh.bind(this)}
              tintColor={'#89b53a'}
            />
          }
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
