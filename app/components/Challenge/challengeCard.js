import React, { lazy } from 'react';
import PropTypes from 'prop-types';

const CardLayout = lazy(() => import('../Common/Card'));
const UserProfileImage = lazy(() => import('../Common/UserProfileImage'));
const PrimaryButton = lazy(() => import('../Common/Button/PrimaryButton'));
const SecondaryButton = lazy(() => import('../Common/Button/SecondaryButton'));

import { formatDate, delimitNumbers } from '../../utils/utils';
import { upwardArrow, downwardArrow } from '../../assets/index.js';
import i18n from '../../locales/i18n.js';

export default class ChallengeCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { challenge } = this.props;
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
                {delimitNumbers(goal) +
                  ' ' +
                  i18n.t('label.trees') +
                  ' ' +
                  (end_date !== null
                    ? ' ' + i18n.t('label.by') + ' ' + end_date
                    : '')}
              </span>
              <div className="flex-row">
                <UserProfileImage profileImage={avatar} />
                <div className="challenge_details">
                  <div className="flex-row">
                    <span className="text-style text-padding">
                      {direction === 'target'
                        ? i18n.t('label.from') + ' '
                        : i18n.t('label.to') + ' '}
                    </span>
                    <span className="text-style text-padding">{fullname}</span>
                  </div>
                  <span className="flex-row">
                    <img
                      className="arrow_image"
                      src={direction === 'target' ? downwardArrow : upwardArrow}
                    />
                    <span className="text-style text-padding">
                      {formatDate(created)}
                    </span>
                  </span>
                </div>
              </div>
            </div>
            {direction === 'target' && status === 'pending' ? (
              <div className="button_align">
                <PrimaryButton
                  onClick={() =>
                    this.props.challengeStatus({ status: 'active' }, token)
                  }
                  className="button-width"
                >
                  {i18n.t('label.accept')}
                </PrimaryButton>
                <SecondaryButton
                  onClick={() =>
                    this.props.challengeStatus({ status: 'declined' }, token)
                  }
                  className="button-width"
                >
                  {i18n.t('label.reject')}
                </SecondaryButton>
              </div>
            ) : (
              <span className="status-label">
                {status === 'pending'
                  ? i18n.t('label.sent')
                  : status === 'active'
                    ? i18n.t('label.accepted')
                    : i18n.t('label.declined')}
              </span>
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
