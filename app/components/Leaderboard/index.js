import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextHeading from '../Common/Heading/TextHeading';
import CardLayout from '../Common/Card/CardLayout';

export default class Leaderboard extends Component {
  render() {
    return (
      <div className="app-container__content--center sidenav-wrapper">
        <TextHeading>{'Explore'}</TextHeading>
        <CardLayout className="user-profile__form-group">
          Leader Board DATA
        </CardLayout>
      </div>
    );
  }
}

Leaderboard.propTypes = {
  exploreData: PropTypes.object.isRequired
};
