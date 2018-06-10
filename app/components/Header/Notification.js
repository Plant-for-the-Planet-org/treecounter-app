import React, { Component } from 'react';
import PropTypes from 'prop-types';

import renderHTML from 'react-render-html';
import { getImageUrl } from '../../actions/apiRouting';

export default class Notification extends Component {
  NotificationDisplay(notifications) {
    return notifications.userFeeds.map(notification => (
      <div key={notification.id}>
        <li className="popover__list-item">
          <div className="list-item__wrapper">
            <img src={getImageUrl('profile', 'thumb', notification.image)} />
            <div className="item-html__wrapper">
              {renderHTML(notification.message)}
            </div>
          </div>
        </li>
        <hr className="divider__light" />
      </div>
    ));
  }

  render() {
    let { userFeeds } = this.props;
    return userFeeds ? (
      <div>
        <ul className="notification-popover">
          {this.NotificationDisplay(userFeeds)}
        </ul>
        {userFeeds.more > 0 ? (
          <div
            onClick={() =>
              this.props.fetchMoreNotifications(
                userFeeds.userFeeds[userFeeds.userFeeds.length - 1].id
              )
            }
            className="list-item__wrapper"
          >
            <span>See all notifications</span>
          </div>
        ) : null}
      </div>
    ) : (
      <ul style={widthStyle} />
    );
  }
}

Notification.propTypes = {
  userFeeds: PropTypes.object,
  fetchMoreNotifications: PropTypes.func
};

const widthStyle = { width: '244px' };
