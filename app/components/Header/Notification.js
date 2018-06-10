import React, { Component } from 'react';
import { NotificationAction } from '../../actions/notificationAction';
import renderHTML from 'react-render-html';

export default class Notification extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      schema: {}
    };
  }

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

  componentWillMount() {
    NotificationAction().then(
      success => this.setState({ loading: false, schema: success.data }),
      error => console.log(error)
    );
  }

  render() {
    return this.state.loading ? (
      <ul style={widthStyle} />
    ) : (
      <ul className="notification-popover">
        {this.NotificationDisplay(this.state.schema)}
      </ul>
    );
  }
}

const widthStyle = { width: '244px' };
