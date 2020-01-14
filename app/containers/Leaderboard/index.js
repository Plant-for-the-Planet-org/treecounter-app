import React from 'react';
import Leaderboard from '../../components/Leaderboard';
import {
  ExploreDataAction,
  LeaderBoardDataAction
} from '../../actions/exploreAction';
import PropTypes from 'prop-types';
import { updateRoute, replaceRoute } from '../../helpers/routerHelper';
import i18n from '../../locales/i18n';
import { objectToQueryParams, queryParamsToObject } from '../../helpers/utils';

const tabs = [
  {
    name: i18n.t('label.treecount_map'),
    id: 'app_explore'
  },
  {
    name: i18n.t('label.treecount_leaderboard'),
    id: 'app_leaderboard'
  }
];

class LeaderBoardContainer extends React.Component {
  constructor(props) {
    super(props);
    const { match } = props;
    this.state = {
      queryResult: null,
      queryResultSelfData: null,
      exploreData: {},
      sectionInfo: {
        section: match && match.params.section,
        subSection: match && match.params.subSection
      },
      sortingQueryParam: {},
      tabInfo: {
        tabs: tabs,
        activeTab:
          match && match.path.includes('explore')
            ? 'app_explore'
            : 'app_leaderboard'
      },
      mapInfo: {}
    };
  }

  getDefaultQuery(searchQuery, orderBy, period) {
    let searchQueryObject = queryParamsToObject(searchQuery);
    if (!searchQuery || !Object.keys(searchQuery).length > 0) {
      searchQueryObject = {
        orderBy,
        period
      };
    }
    return searchQueryObject;
  }

  sendSearchQuery(
    section = this.state.sectionInfo.section ||
      (this.state.categoryInfo &&
        this.state.categoryInfo.categoryKeys &&
        this.state.categoryInfo.categoryKeys[0]),
    subSection = this.state.sectionInfo.subSection,
    orderBy = this.state.sortingQueryParam.orderBy,
    period = this.state.sortingQueryParam.period
  ) {
    console.log(
      section,
      orderBy,
      period,
      subSection,
      'section, orderBy, period, subSection  LeaderBoardDataAction'
    );
    LeaderBoardDataAction({ section, orderBy, period, subSection }).then(
      success => {
        console.log(success, 'SUCCESSS');
        if (
          success.data &&
          success.data instanceof Object &&
          success.data.data
        ) {
          this.setState({
            queryResult: success.data.data,
            queryResultSelfData: success.data.self
          });
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  handleBackButton = (
    section = this.state.sectionInfo.section,
    orderBy = this.state.sortingQueryParam.orderBy,
    period = this.state.sortingQueryParam.period
    // subSection = this.state.sectionInfo.subSection
  ) => {
    if (!this.props.navigation) {
      replaceRoute(
        this.state.tabInfo.activeTab,
        null,
        null,
        { section },
        objectToQueryParams({ orderBy, period })
      );
      return;
    }
  };

  handleSectionChange = (
    section = this.state.sectionInfo.section,
    orderBy = this.state.sortingQueryParam.orderBy,
    period = this.state.sortingQueryParam.period,
    subSection = this.state.sectionInfo.subSection
  ) => {
    if (!this.props.navigation) {
      updateRoute(
        this.state.tabInfo.activeTab,
        null,
        null,
        { section },
        objectToQueryParams({ orderBy, period })
      );
      return;
    }

    this.setState({
      sectionInfo: { section, subSection },
      sortingQueryParam: { orderBy, period },
      queryResult: null
    });
    this.sendSearchQuery(section, subSection, orderBy, period);
  };

  handleTabChange = tab => {
    if (tab != this.state.tabInfo.activeTab) {
      tab == 'app_leaderboard'
        ? updateRoute(tab, null, null, {
            section: this.state.categoryInfo.categoryKeys[0]
          })
        : updateRoute(tab);
    }
  };

  componentWillReceiveProps(nextProps /*, nextState*/) {
    console.log('__componentWillReceiveProps__');

    if (!this.props.navigation) {
      const { match } = nextProps;
      const newSortingQueryParam = this.getDefaultQuery(
        nextProps && nextProps.location && nextProps.location.search,
        this.state.sortingQueryParam.orderBy,
        this.state.sortingQueryParam.period
      );
      // const
      const sendNewQuery =
        match.params.subSection != this.props.match.params.subSection ||
        match.params.section != this.props.match.params.section ||
        newSortingQueryParam.orderBy != this.state.sortingQueryParam.orderBy ||
        newSortingQueryParam.period != this.state.sortingQueryParam.period;
      this.setState(
        {
          tabInfo: {
            tabs: tabs,
            activeTab:
              match && match.path.includes('explore')
                ? 'app_explore'
                : 'app_leaderboard'
          },
          sectionInfo: {
            section: match && match.params.section,
            subSection: match && match.params.subSection
          },
          sortingQueryParam: newSortingQueryParam,
          queryResult: sendNewQuery ? null : this.state.queryResult
        },
        () => {
          sendNewQuery && this.sendSearchQuery();
        }
      );
    }
  }

  componentDidMount() {
    ExploreDataAction().then(
      success => {
        const categoryInfo = {};
        const orderByOptionsInfo = {};
        const timePeriodsInfo = {};
        const exploreData = success.data;
        const mapInfo = {};
        if (exploreData) {
          if (exploreData.sections) {
            categoryInfo.categories = exploreData.sections;
            categoryInfo.categoryKeys = Object.keys(categoryInfo.categories);
            categoryInfo.categoryHeader = exploreData.sectionHeaders;
          }
          if (exploreData.orderByOptions) {
            orderByOptionsInfo.orderByOptions = exploreData.orderByOptions;
            orderByOptionsInfo.orderByOptionsKeys = Object.keys(
              orderByOptionsInfo.orderByOptions
            );
          }
          if (exploreData.timePeriods) {
            timePeriodsInfo.timePeriods = exploreData.timePeriods;
            timePeriodsInfo.timePeriodsKeys = Object.keys(
              timePeriodsInfo.timePeriods
            );
          }
          if (exploreData.mapLayers) {
            mapInfo.mapLayers = exploreData.mapLayers;
            mapInfo.mapLayersKeys = Object.keys(mapInfo.mapLayers);
          }
          if (exploreData.webMapIds) {
            mapInfo.webMapIds = exploreData.webMapIds;
          }
        }

        this.setState({
          exploreData,
          categoryInfo,
          orderByOptionsInfo,
          timePeriodsInfo,
          mapInfo,
          sortingQueryParam: this.getDefaultQuery(
            this.props && this.props.location && this.props.location.search,
            orderByOptionsInfo.orderByOptionsKeys
              ? orderByOptionsInfo.orderByOptionsKeys[0]
              : null,
            timePeriodsInfo.timePeriodsKeys
              ? timePeriodsInfo.timePeriodsKeys[0]
              : null
          )
        });
        this.sendSearchQuery();
      },
      error => console.log(error)
    );
  }

  render() {
    console.log(
      this.props.handleScrollAnimation,
      'this.props LeaderBoardContainer'
    );
    return (
      <Leaderboard
        ref={'leaderBoard'}
        categoryInfo={this.state.categoryInfo}
        orderByOptionsInfo={this.state.orderByOptionsInfo}
        timePeriodsInfo={this.state.timePeriodsInfo}
        sectionInfo={this.state.sectionInfo}
        tabInfo={this.state.tabInfo}
        handleSectionChange={this.handleSectionChange}
        handleTabChange={this.handleTabChange}
        queryResult={this.state.queryResult}
        mapInfo={this.state.mapInfo}
        sortingQuery={this.state.sortingQueryParam}
        navigation={this.props.navigation}
        handleScrollAnimation={this.props.handleScrollAnimation}
        handleBackButton={this.handleBackButton}
        queryResultSelfData={this.state.queryResultSelfData}
      />
    );
  }
}
export default LeaderBoardContainer;

LeaderBoardContainer.propTypes = {
  match: PropTypes.object,
  location: PropTypes.object,
  navigation: PropTypes.any,
  handleScrollAnimation: PropTypes.func
};
