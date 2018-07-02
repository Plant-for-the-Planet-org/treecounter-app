import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextHeading from '../Common/Heading/TextHeading';
import CardLayout from '../Common/Card/CardLayout';
import MapTab from './MapTab';
import Tabs from '../Common/Tabs';
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
  leaderboards_tpo_grey,
  leaderboards_company_grey,
  leaderboards_company_green
} from '../../assets';
import { Link } from 'react-router-dom';
import DescriptionHeading from '../../components/Common/Heading/DescriptionHeading';

import LoadingIndicator from '../../components/Common/LoadingIndicator';
import propTypes from 'redux-form/lib/propTypes';
import i18n from '../../locales/i18n';

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
    normal: leaderboards_company_grey,
    selected: leaderboards_company_green
  },
  individual: {
    normal: leaderboards_indiv_grey,
    selected: leaderboards_indiv_green
  }
};

export default class Leaderboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      queryResult: null
    };
  }

  handleSlectionChange = () => {
    // this.handleCategoryChange(this.state.selectedSection);
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

  getTableView = () => {
    console.log(this.props.queryResult);
    let listItemsUI = <LoadingIndicator />;
    const { categoryInfo, sectionInfo } = this.props;
    if (this.props.queryResult)
      listItemsUI = (
        <div className="leaderboard-table">
          <div className="table-header">
            <div className="table-header-item country">
              {'   ' + categoryInfo.categoryHeader[sectionInfo.section]}
            </div>
            <div className="table-header-item planted">Planted</div>
            <div className="table-header-item other">Target</div>
          </div>
          <div className="table-body">
            {this.props.queryResult.map((d, index) => (
              <div className="table-row" key={'tr' + index}>
                <div className="table-col country">
                  <span className="countryIndex">{index + 1 + '.  '}</span>
                  <Link to={d.uri}>{d.caption}</Link>
                </div>
                <div className="table-col other">
                  <div className="table-col-phone-header">Planted</div>
                  {d.planted}
                </div>
                <div className="table-col other">
                  <div className="table-col-phone-header">Target</div>
                  {d.target}
                </div>
              </div>
            ))}
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
      timePeriodsInfo
    } = this.props;
    if (!categoryInfo) {
      return <LoadingIndicator />;
    }
    let isMapTab = tabInfo.activeTab === tabInfo.tabs[0].id;
    return (
      <div className="app-container__content--center sidenav-wrapper">
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
                    <span>{i18n.t('label.sortBy')} </span>
                    <div className="pftp-selectfield">
                      <select
                        ref="orderBy"
                        className="pftp-selectfield__select"
                        onChange={this.handleSlectionChange}
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
                    <span>{i18n.t('label.timePeriod')} </span>
                    <div className="pftp-selectfield">
                      <select
                        ref="timePeriod"
                        className="pftp-selectfield__select"
                        onChange={this.handleSlectionChange}
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
                  {this.getTableView()}
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
  handleSectionChange: propTypes.func,
  handleTabChange: PropTypes.func,
  queryResult: PropTypes.array,
  mapInfo: PropTypes.object
};
