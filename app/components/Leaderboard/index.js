import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextHeading from '../Common/Heading/TextHeading';
import CardLayout from '../Common/Card/CardLayout';
import Tabs from '../Common/Tabs';
import i18n from '../../locales/i18n';
import {
  leaderboards_countries_grey,
  leaderboards_countries_green,
  leaderboards_education_green,
  leaderboards_education_grey,
  leaderboards_indiv_green,
  leaderboards_indiv_grey,
  leaderboards_organisations_green,
  leaderboards_organisations_grey,
  leaderboards_tpo_green,
  leaderboards_tpo_grey
} from '../../assets';
import { Link } from 'react-router-dom';
import { updateRoute } from '../../helpers/routerHelper';

import LoadingIndicator from '../../components/Common/LoadingIndicator';

const data = {
  tabs: [
    {
      name: i18n.t('label.treecount_map'),
      id: 'app_explore'
    },
    {
      name: i18n.t('label.treecount_leaderboard'),
      id: 'app_leaderboard'
    }
  ]
};
const categoryIcons = {
  country: {
    normal: leaderboards_countries_grey,
    selected: leaderboards_countries_green
  },
  tpo: { normal: leaderboards_tpo_grey, selected: leaderboards_tpo_green },
  organization: {
    normal: leaderboards_organisations_grey,
    selected: leaderboards_organisations_green
  },
  education: {
    normal: leaderboards_education_grey,
    selected: leaderboards_education_green
  },
  company: {
    normal: leaderboards_indiv_grey,
    selected: leaderboards_indiv_green
  },
  individual: {
    normal: leaderboards_indiv_grey,
    selected: leaderboards_indiv_green
  }
};

export default class Leaderboard extends Component {
  constructor(props) {
    super(props);
    this.handleTabChange = this.handleTabChange.bind(this);
    const activeTab = props.match.path.includes('explore')
      ? 'app_explore'
      : 'app_leaderboard';
    this.state = {
      selectedSection: props.match.params.section,
      selectedSubSection: props.match.params.subSection,
      queryResult: null,
      activeTab
    };
    console.log('constructor leaderBoard');
  }

  queryTableData(section, subSection) {
    if (this.state.activeTab == 'app_leaderboard') {
      this.props.sendSearchQuery({ section, subSection }).then(queryResult => {
        if (queryResult instanceof Array) {
          this.setState({ queryResult });
        }
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    const activeTab = nextProps.match.path.includes('explore')
      ? 'app_explore'
      : 'app_leaderboard';
    this.setState({
      selectedSection: nextProps.match.params.section,
      selectedSubSection: nextProps.match.params.subSection,
      tableDataLoading: true,
      activeTab,
      queryResult: null
    });
    console.log('props_recievd', nextProps);
    if (nextProps.categoryInfo) {
      this.queryTableData(
        nextProps.match.params.section,
        nextProps.match.params.subSection
      );
    }
  }

  handleTabChange(tab) {
    console.log('Tab change' + tab);
    if (tab != this.state.activeTab) {
      tab == 'app_leaderboard'
        ? updateRoute(tab, null, null, {
            section: this.props.categoryInfo.categoryKeys[0]
          })
        : updateRoute(tab);
    }
  }

  handleSlectionChange = () => {
    this.handleCategoryChange(this.state.selectedSection);
  };

  handleCategoryChange = section => {
    console.log('clicked' + section);
    // let orderByRef = this.refs.orderBy;
    // let orderBy = orderByRef.options[orderByRef.selectedIndex].value;

    // let timePeriodRef = this.refs.timePeriod;
    // let period = timePeriodRef.options[timePeriodRef.selectedIndex].value;
    // let params = { category, orderBy, period };
    // this.props.sendSearchQuery(params);
    updateRoute(this.state.activeTab, null, null, { section });
  };

  getCategoryView = () => {
    let categoryUI = null;
    if (this.props.categoryInfo && this.props.categoryInfo.categoryKeys) {
      categoryUI = this.props.categoryInfo.categoryKeys.map(
        (category, index) => {
          let isSelected = this.state.selectedSection == category;
          return (
            <React.Fragment key={index}>
              <div
                select={isSelected ? 'true' : 'false'}
                className="leaderboard_image__container"
                onClick={() => {
                  this.handleCategoryChange(category);
                }}
              >
                <div className="imageContainer">
                  <img
                    src={
                      categoryIcons[category][
                        isSelected ? 'selected' : 'normal'
                      ]
                    }
                  />
                </div>
                <div>{this.props.categoryInfo.categories[category]}</div>
              </div>
            </React.Fragment>
          );
        }
      );
    }
    return categoryUI;
  };

  getTableView = () => {
    let listItemsUI = <LoadingIndicator />;
    if (this.state.queryResult)
      listItemsUI = (
        <table className="projects-list">
          <thead>
            <tr>
              <th>Country</th>
              <th>Planted</th>
              <th>Target</th>
            </tr>
          </thead>
          <tbody>
            {this.state.queryResult.map((d, index) => (
              <tr key={'tr' + index}>
                <td className="align-left">
                  {index + 1 + ' '}
                  <Link className="rightBtn" to={d.uri}>
                    {d.caption}
                  </Link>
                </td>
                <td className="align-left">{d.planted}</td>
                <td className="align-right">{d.target}</td>
              </tr>
            ))}
          </tbody>
        </table>
      );

    return listItemsUI;
  };

  render() {
    if (!this.props.categoryInfo) {
      return <LoadingIndicator />;
    }

    return (
      <div className="app-container__content--center sidenav-wrapper">
        <TextHeading>{'Explore'}</TextHeading>
        <CardLayout className="leader-board__container">
          <Tabs
            data={data.tabs}
            activeTab={this.state.activeTab}
            onTabChange={this.handleTabChange}
          >
            {this.state.activeTab === data.tabs[1].id ? (
              <div className="leader-board__sub-container">
                <div className="leaderboard_images__container">
                  {this.getCategoryView()}
                </div>
                <div className="leaderboard-list__sort">
                  <div className="sort-container">
                    <span>Sort By: </span>
                    <div className="pftp-selectfield">
                      <select
                        ref="orderBy"
                        className="pftp-selectfield__select"
                        onChange={this.handleSlectionChange}
                      >
                        {this.props.orderByOptionsInfo.orderByOptionsKeys.map(
                          option => (
                            <option
                              key={option}
                              className="pftp-selectfield__option"
                              value={option}
                            >
                              {i18n.t(
                                this.props.orderByOptionsInfo.orderByOptions[
                                  option
                                ]
                              )}
                            </option>
                          )
                        )}
                      </select>
                    </div>
                  </div>
                  <div className="sort-container">
                    <span>Time Period: </span>
                    <div className="pftp-selectfield">
                      <select
                        ref="timePeriod"
                        className="pftp-selectfield__select"
                        onChange={this.handleSlectionChange}
                      >
                        {this.props.timePeriodsInfo.timePeriodsKeys.map(
                          option => (
                            <option
                              key={option}
                              className="pftp-selectfield__option"
                              value={option}
                            >
                              {i18n.t(
                                this.props.timePeriodsInfo.timePeriods[option]
                              )}
                            </option>
                          )
                        )}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="leaderboard-list__table">
                  {this.getTableView()}
                </div>
              </div>
            ) : (
              <CardLayout>Leaderboard Selected</CardLayout>
            )}
          </Tabs>
        </CardLayout>
      </div>
    );
  }
}

Leaderboard.propTypes = {
  categoryInfo: PropTypes.object,
  orderByOptionsInfo: PropTypes.object,
  timePeriodsInfo: PropTypes.object,
  sendSearchQuery: PropTypes.func.isRequired,
  match: PropTypes.object
};
