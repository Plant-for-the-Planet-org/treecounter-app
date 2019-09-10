import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { getImageUrl } from '../../actions/apiRouting';
import { SignupJustMe } from '../../assets';
import i18n from '../../locales/i18n';

export default class Notification extends Component {
  NotificationDisplay(notifications) {
    return notifications.userFeeds.map(notification => (
      <div key={notification.id}>
        <li className="popover__list-item">
          <div className="list-item__wrapper">
            <img
              src={
                notification.image
                  ? getImageUrl('profile', 'thumb', notification.image)
                  : SignupJustMe
              }
            />
            <div className="item-html__wrapper" dangerouslySetInnerHTML={{
              __html: notification.message
            }} />
          </div>
        </li>
        <hr className="divider__light" />
      </div>
    ));
  }

  render() {
    let { userFeeds } = this.props;
    return userFeeds && userFeeds.userFeeds.length ? (
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
            <span>{i18n.t('label.all_notifications')}</span>
          </div>
        ) : null}
      </div>
    ) : (
      <div className="popover__no_notification">
        {i18n.t('label.no_notifications')}
      </div>
    );
  }
}

Notification.propTypes = {
  userFeeds: PropTypes.object,
  fetchMoreNotifications: PropTypes.func
};
