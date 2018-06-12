import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import SuccessfullyActivatedAccount from '../../components/Authentication/SuccessfullyActivated';
import NotificationManager from '../../notification/PopupNotificaiton/notificationManager';

export default class SuccessfullyActivatedContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: null
    };
  }

  componentWillMount() {
    // this.token = this.props.match.params.token;
    this.setState({ token: this.props.match.params.token });
    axios
      .get('/auth/en/accountActivate', {
        token: this.state.token
      })
      .then(success => console.log(success))
      .catch(err =>
        NotificationManager.error(err.message, 'Some error occured', 5000)
      );
  }
  render() {
    return <SuccessfullyActivatedAccount />;
  }
}

SuccessfullyActivatedContainer.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      token: PropTypes.string
    })
  }).isRequired
};
