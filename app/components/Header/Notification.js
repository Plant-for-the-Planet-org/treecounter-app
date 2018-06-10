import React, { Component } from 'react';
import PropTypes from 'prop-types';

import renderHTML from 'react-render-html';

export default class Notification extends Component {
  NotificationDisplay(notifications) {
    return notifications.userFeeds.map(notification => (
      <li className="notification-group" key={notification.id}>
        <div className="notification-tab">
          <i className="fas fa-user" />
          {renderHTML(notification.message)}
        </div>
      </li>
    ));
  }

  render() {
    return this.props.userFeeds ? (
      <ul className="notification-popover">
        {this.NotificationDisplay(this.props.userFeeds)}
      </ul>
    ) : (
      <ul style={widthStyle} />
    );
  }
}

Notification.propTypes = {
  userFeeds: PropTypes.object
};

const widthStyle = { width: '244px' };
