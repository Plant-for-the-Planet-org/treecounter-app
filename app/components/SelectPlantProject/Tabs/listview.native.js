/* eslint-disable no-underscore-dangle */
import React, { PureComponent } from 'react';
import { FlatList, View, RefreshControl, Animated } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { debug } from '../../../debug';
import PlantProjectSnippet from '../../../components/PlantProjects/PlantProjectSnippet';
import styles from '../../../styles/selectplantproject/list.native';
import { updateStaticRoute } from '../../../helpers/routerHelper';
import { flatListContainerStyle } from '../../../styles/selectplantproject/selectplantproject-snippet.native';
import { selectPlantProjectAction } from '../../../actions/selectPlantProjectAction';
import LoadingIndicator from '../../Common/LoadingIndicator.native';

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
  async UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.index && !this.state.initiated) {
      // debug(
      //   'component got index list =======================================================',
      //   nextProps
      // );
      this.setState({ initiated: true, isFetching: true });
      try {
        const data = await this.props.loadProjects('all', {});
        this.setState({ isFetching: false, plantProjects: data }, () => {
          debug(
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
        // debug('fettch more list calling load');
        try {
          const data = await this.props.loadProjects('all', {
            page: this.state.page
          });
          this.setState({
            isFetching: false,
            shouldLoad: data.length == this.perPage,
            plantProjects: [...this.state.plantProjects, ...data]
          });
          // debug('Got from fetch more:', data);
        } catch (error) {
          this.setState({ isFetching: false });
        }
      });
  };
  _keyExtractor = item => item.id.toString();
  onSelectClickedFeaturedProjects = (id) => {
    this.props.selectPlantProjectAction(id);
    const { navigation, context } = this.props;
    updateStaticRoute('app_donate_detail', navigation, {
      id: id,
      userForm: navigation.getParam('userForm'),
      context: context
    });
  }
  _renderItem = ({ item }) => (
    <PlantProjectSnippet
      cardStyle={styles.cardStyle}
      key={'projectFull' + item.id}
      onMoreClick={id => this.props.onMoreClick(id, item.name)}
      plantProject={item}
      onSelectClickedFeaturedProjects={this.onSelectClickedFeaturedProjects}
      showMoreButton={false}
      tpoName={item.tpo_name}
      navigation={this.props.navigation}
      context={this.props.context}
    />
  );

  render() {
    const { isFetching } = this.state;
    return (
      <View style={{ height: '100%' }}>
        {!isFetching ? (
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
            scrollEventThrottle={24}
            onScroll={Animated.event([
              {
                nativeEvent: {
                  contentOffset: { y: this.props.scrollY }
                }
              }
            ])}
          />
        ) : (
            <LoadingIndicator contentLoader screen={'ProjectsLoading'} />
          )}
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
