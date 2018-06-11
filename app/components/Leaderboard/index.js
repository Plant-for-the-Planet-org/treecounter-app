import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextHeading from '../Common/Heading/TextHeading';
import CardLayout from '../Common/Card/CardLayout';
import Tabs from '../Common/Tabs';
import i18n from '../../locales/i18n';
import UserProfileImage from '../Common/UserProfileImage';
import { SignupOrganization } from '../../assets';
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
    return (
      <div className="app-container__content--center sidenav-wrapper">
        <TextHeading>{'Explore'}</TextHeading>
        <CardLayout className="leader-board--container">
          <Tabs data={Leaderboard.data.tabs} onTabChange={this.handleTabChange}>
            {this.state.modeMap === Leaderboard.data.tabs[0].id ? (
              <div>
                <div className="leaderboard_flex__container">
                  <div className="leaderboard_flex--item__container">
                    <UserProfileImage iconUrl={SignupOrganization} />
                    Demo Text
                  </div>
                  <div className="leaderboard_flex--item__container">
                    <UserProfileImage iconUrl={SignupOrganization} />
                    Demo Text
                  </div>
                  <div className="leaderboard_flex--item__container">
                    <UserProfileImage iconUrl={SignupOrganization} />
                    Demo Text
                  </div>
                  <div className="leaderboard_flex--item__container">
                    <UserProfileImage iconUrl={SignupOrganization} />
                    Demo Text
                  </div>
                  <div className="leaderboard_flex--item__container">
                    <UserProfileImage iconUrl={SignupOrganization} />
                    Demo Text
                  </div>

                  <div className="leaderboard_flex--item__container">
                    <UserProfileImage iconUrl={SignupOrganization} />
                    Demo Text
                  </div>
                </div>
                <CardLayout className="leaderboard-list--container">
                  <div className="leaderboard-list--header">
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
                </CardLayout>
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
  exploreData: PropTypes.object.isRequired
};
