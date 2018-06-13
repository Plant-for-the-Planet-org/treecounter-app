import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextHeading from '../Common/Heading/TextHeading';
import CardLayout from '../Common/Card/CardLayout';
import Tabs from '../Common/Tabs';
import i18n from '../../locales/i18n';
import UserProfileImage from '../Common/UserProfileImage';
import {
  country,
  education,
  company,
  tree_outline,
  organization
} from '../../assets';
export default class Leaderboard extends Component {
  static data = {
    tabs: [
      {
        name: i18n.t('label.treecount_map'),
        id: 'direct'
      },
      {
        name: i18n.t('label.treecount_leaderboard'),
        id: 'invitation'
      }
    ]
  };
  constructor() {
    super();
    this.handleTabChange = this.handleTabChange.bind(this);
    this.state = {
      modeMap: '',
      sortValue: ''
    };
  }

  handleTabChange(tab) {
    console.log('Tab change' + tab);
    this.setState({
      modeMap: tab
    });
  }
  render() {
    let listItemsUI;
    if (this.props.mapData)
      listItemsUI = this.props.mapData.map((d, index) => {
        return (
          <React.Fragment key={index}>
            <div className="row-container">
              <div key={d.countryCode} className="col-container country">
                {d.country}
              </div>
              <div key={d.planted} className="col-container target">
                {d.planted}
              </div>
              <div key={d.target} className="col-container planted">
                {d.target}
              </div>
            </div>
          </React.Fragment>
        );
      });
    return (
      <div className="app-container__content--center sidenav-wrapper">
        <TextHeading>{'Explore'}</TextHeading>
        <CardLayout className="leader-board--container">
          <Tabs data={Leaderboard.data.tabs} onTabChange={this.handleTabChange}>
            {this.state.modeMap === Leaderboard.data.tabs[0].id ? (
              <div>
                <div className="leaderboard_images__container">
                  <div className="leaderboard_image__container">
                    <UserProfileImage iconUrl={country} />
                    Countries
                  </div>
                  <div className="leaderboard_image__container">
                    <UserProfileImage iconUrl={organization} />
                    Demo Text
                  </div>
                  <div className="leaderboard_image__container">
                    <UserProfileImage iconUrl={company} />
                    Companies
                  </div>
                  <div className="leaderboard_image__container">
                    <UserProfileImage iconUrl={tree_outline} />
                    Tree-Planting
                  </div>
                  <div className="leaderboard_image__container">
                    <UserProfileImage iconUrl={education} />
                    Education
                  </div>
                </div>
                <div className="leaderboard-list--sort">
                  <div className="sort-container">
                    <span>Sort By: </span>
                    <span>
                      <select value={this.state.sortValue}>
                        <option value="1">planted</option>
                        <option value="0">Desc</option>
                      </select>
                    </span>
                  </div>
                  <div className="time-container">
                    <span>Time Period: </span>
                    <span>
                      <select value={this.state.sortValue}>
                        <option value="1">all time</option>
                        <option value="0">Desc</option>
                      </select>
                    </span>
                  </div>
                </div>

                <div className="leaderboard-list--table">
                  <div className="row-header-container">
                    <div className="col-header">Country</div>
                    <div className="col-header">Planted</div>
                    <div className="col-header">Target</div>
                  </div>
                  {listItemsUI}
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
  exploreData: PropTypes.object.isRequired,
  mapData: PropTypes.array
};
