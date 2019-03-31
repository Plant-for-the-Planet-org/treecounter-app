import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import i18n from '../../locales/i18n.js';

import CardLayout from '../Common/Card';
import UserProfileImage from '../Common/UserProfileImage';
import PrimaryButton from '../Common/Button/PrimaryButton';
import SecondaryButton from '../Common/Button/SecondaryButton';

export default class ChallengeCard extends React.Component {
  render() {
    let { challenge } = this.props;
    console.log(challenge);
    let {
      direction,
      goal,
      avatar,
      end_date,
      status,
      created,
      fullname,
      token
    } = challenge;
    return (
      <div className="challenge_card">
        <CardLayout>
          <div className="flex-row">
            <div className="limit-width">
              <span className="goal-style">
                {goal.toLocaleString() +
                  ' Trees' +
                  (end_date !== null ? ' by ' + end_date : '')}
              </span>
              <div className="flex-row">
                <UserProfileImage profileImage={avatar} />
                <div>
                  <div className="flex-row">
                    <span className="text-style text-padding">
                      {direction === 'target' ? 'from ' : 'to '}
                    </span>
                    <span className="text-style text-padding">{fullname}</span>
                  </div>
                  <span className="flex-row text-style text-padding">
                    {moment(created).format('D MMM, YYYY')}
                  </span>
                </div>
              </div>
            </div>
            {direction === 'target' && status === 'pending' ? (
              <div>
                <PrimaryButton
                  onClick={() =>
                    this.props.challengeStatus({ status: 'active' }, token)
                  }
                  className="button-width"
                >
                  Accept
                </PrimaryButton>
                <SecondaryButton
                  onClick={() =>
                    this.props.challengeStatus({ status: 'declined' }, token)
                  }
                  className="button-width"
                >
                  Reject
                </SecondaryButton>
              </div>
            ) : (
              <span className="status-label">{status}</span>
            )}
          </div>
        </CardLayout>
      </div>
    );
  }
}

ChallengeCard.propTypes = {
  challenge: PropTypes.object.isRequired,
  challengeStatus: PropTypes.func
};
