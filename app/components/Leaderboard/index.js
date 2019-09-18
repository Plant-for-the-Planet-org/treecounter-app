import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextHeading from '../Common/Heading/TextHeading';
import CardLayout from '../Common/Card';
import MapTab from './MapTab';
import Tabs from '../Common/Tabs';
import { Link } from 'react-router-dom';
import DescriptionHeading from '../../components/Common/Heading/DescriptionHeading';

import LoadingIndicator from '../../components/Common/LoadingIndicator';
import i18n from '../../locales/i18n';
import { categoryIcons } from '../../helpers/utils';
import { delimitNumbers } from '../../utils/utils';
import BackButton from '../Common/Button/BackButton';
export default class Leaderboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      queryResult: null
    };
  }

  handleSelectionChange = () => {
    this.handleCategoryChange();
  };

  handleCategoryChange = section => {
    let orderByRef = this.refs.orderBy;
    let orderBy = orderByRef.options[orderByRef.selectedIndex].value;

    let timePeriodRef = this.refs.timePeriod;
    let period = timePeriodRef.options[timePeriodRef.selectedIndex].value;

    this.props.handleSectionChange(section, orderBy, period);
  };

  getCategoryView = () => {
    const { categoryInfo, sectionInfo } = this.props;
    let categoryUI = null;
    if (categoryInfo && categoryInfo.categoryKeys) {
      categoryUI = categoryInfo.categoryKeys.map((category, index) => {
        let isSelected = sectionInfo.section == category;
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
                    categoryIcons[category][isSelected ? 'selected' : 'normal']
                  }
                />
              </div>
              <div>{categoryInfo.categories[category]}</div>
            </div>
          </React.Fragment>
        );
      });
    }
    return categoryUI;
  };

  getTableView = hasSubSection => {
    let listItemsUI = <LoadingIndicator />;
    const { categoryInfo, sectionInfo, queryResultSelfData } = this.props;
    if (this.props.queryResult)
      listItemsUI = (
        <div className="leaderboard-table">
          <div className="table-header">
            <div className="table-header-item country">
              {hasSubSection && queryResultSelfData
                ? queryResultSelfData.caption
                : '   ' + categoryInfo.categoryHeader[sectionInfo.section]}
            </div>
            <div className="table-header-item planted">
              {i18n.t('label.planted')}
            </div>
            <div className="table-header-item other">
              {i18n.t('label.target')}
            </div>
          </div>
          <div className="table-body">
            {this.props.queryResult.map((d, index) => {
              const isPrivate = d.hasOwnProperty('mayPublish') && !d.mayPublish;
              return (
                <div className="table-row" key={'tr' + index}>
                  <div className="table-col country">
                    <span className="countryIndex">{index + 1 + '.  '}</span>
                    <Link to={isPrivate ? '#' : d.uri}>
                      {isPrivate ? i18n.t('label.tree_planter') : d.caption}
                    </Link>
                  </div>
                  <div className="table-col other">
                    <div className="table-col-phone-header">
                      {i18n.t('label.planted')}
                    </div>
                    <span>{delimitNumbers(parseInt(d.planted))}</span>
                  </div>
                  <div className="table-col other">
                    <div className="table-col-phone-header">
                      {i18n.t('label.target')}
                    </div>
                    <span>{delimitNumbers(parseInt(d.target))}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );

    return listItemsUI;
  };

  render() {
    const {
      tabInfo,
      categoryInfo,
      orderByOptionsInfo,
      timePeriodsInfo,
      sortingQuery,
      sectionInfo,
      handleBackButton
    } = this.props;
    if (!categoryInfo) {
      return (
        <div className="app-container__content--center sidenav-wrapper">
          <LoadingIndicator />
        </div>
      );
    }
    let isMapTab = tabInfo.activeTab === tabInfo.tabs[0].id;
    return (
      <div className="app-container__content--center sidenav-wrapper">
        {!isMapTab && sectionInfo.subSection ? (
          <BackButton
            onClick={() => {
              // this.handleCategoryChange(sectionInfo.section);
              this.props.handleBackButton();
            }}
          >
            {categoryInfo.categoryHeader[sectionInfo.section]}
          </BackButton>
        ) : null}
        <TextHeading>
          {i18n.t('label.explore')}
          {isMapTab ? (
            <DescriptionHeading>
              {i18n.t('label.map_description')}
            </DescriptionHeading>
          ) : null}
        </TextHeading>
        <CardLayout className="leader-board__container">
          <Tabs
            data={tabInfo.tabs}
            activeTab={tabInfo.activeTab}
            onTabChange={this.props.handleTabChange}
          >
            {!isMapTab ? (
              <div className="leader-board__sub-container">
                <div className="leaderboard_images__container">
                  {this.getCategoryView()}
                </div>
                <div className="leaderboard-list__sort">
                  <div className="sort-container">
                    <span>{i18n.t('label.sortBy')}</span>
                    <div className="pftp-selectfield">
                      <select
                        defaultValue={sortingQuery && sortingQuery.orderBy}
                        ref="orderBy"
                        className="pftp-selectfield__select"
                        onChange={this.handleSelectionChange}
                      >
                        {orderByOptionsInfo.orderByOptionsKeys.map(option => (
                          <option
                            key={option}
                            className="pftp-selectfield__option"
                            value={option}
                          >
                            {i18n.t(orderByOptionsInfo.orderByOptions[option])}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="sort-container">
                    <span>{i18n.t('label.timePeriod')}</span>
                    <div className="pftp-selectfield">
                      <select
                        defaultValue={sortingQuery && sortingQuery.period}
                        ref="timePeriod"
                        className="pftp-selectfield__select"
                        onChange={this.handleSelectionChange}
                      >
                        {timePeriodsInfo.timePeriodsKeys.map(option => (
                          <option
                            key={option}
                            className="pftp-selectfield__option"
                            value={option}
                          >
                            {i18n.t(timePeriodsInfo.timePeriods[option])}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="leaderboard-list__table">
                  {this.getTableView(!!sectionInfo.subSection)}
                </div>
              </div>
            ) : (
              <MapTab mapInfo={this.props.mapInfo} />
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
  sectionInfo: PropTypes.object,
  tabInfo: PropTypes.object,
  handleSectionChange: PropTypes.func,
  handleTabChange: PropTypes.func,
  queryResult: PropTypes.array,
  mapInfo: PropTypes.object,
  sortingQuery: PropTypes.object,
  handleBackButton: PropTypes.func,
  queryResultSelfData: PropTypes.any
};
