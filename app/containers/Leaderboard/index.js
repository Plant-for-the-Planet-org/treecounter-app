import React from 'react';
import Leaderboard from '../../components/Leaderboard';
import {
  ExploreDataAction,
  LeaderBoardDataAction
} from '../../actions/exploreAction';
import PropTypes from 'prop-types';
import { updateRoute } from '../../helpers/routerHelper';
import i18n from '../../locales/i18n';

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
      exploreData: {},
      sectionInfo: {
        section: match.params.section,
        subSection: match.params.subSection
      },
      tabInfo: {
        tabs: tabs,
        activeTab: match.path.includes('explore')
          ? 'app_explore'
          : 'app_leaderboard'
      },
      mapInfo: {}
    };
  }

  sendSearchQuery(
    section = this.state.sectionInfo.section,
    subSection = this.state.sectionInfo.subSection,
    orderBy = this.state.orderByOptionsInfo.orderByOptionsKeys[0],
    period = this.state.timePeriodsInfo.timePeriodsKeys[0]
  ) {
    LeaderBoardDataAction({ section, orderBy, period, subSection }).then(
      success => {
        if (
          success.data &&
          success.data instanceof Object &&
          success.data.data
        ) {
          this.setState({ queryResult: success.data.data });
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  handleSectionChange = section => {
    updateRoute(this.state.tabInfo.activeTab, null, null, { section });
    this.setState({ sectionInfo: { section }, queryResult: null });
    this.sendSearchQuery(section, this.state.sectionInfo.subSection);
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

  componentWillMount() {
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
        }

        this.setState({
          exploreData,
          categoryInfo,
          orderByOptionsInfo,
          timePeriodsInfo,
          mapInfo
        });
        this.sendSearchQuery();
      },
      error => console.log(error)
    );
  }

  render() {
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
      />
    );
  }
}
export default LeaderBoardContainer;

LeaderBoardContainer.propTypes = {
  match: PropTypes.object
};
