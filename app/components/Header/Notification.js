import React, { Component } from 'react';
import PropTypes from 'prop-types';

import renderHTML from 'react-render-html';
import { getImageUrl } from '../../actions/apiRouting';

export default class Notification extends Component {
  NotificationDisplay(notifications) {
    return notifications.userFeeds.map(notification => (
      <div>
        <li className="popover__list-item" key={notification.id}>
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
