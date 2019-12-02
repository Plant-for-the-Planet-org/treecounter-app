import React from 'react';
import PropTypes from 'prop-types';
import UserProfileImage from '../Common/UserProfileImage';
import SecondaryButton from '../Common/Button/SecondaryButton';
import i18n from '../../locales/i18n.js';

export default class ContributorCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { contributor } = this.props;
    let {
      giverAvatar,
      treeCount,
      giverTreecounterId,
      giverSlug,
      giverName
    } = contributor;
    console.log(
      'avatar:',
      giverAvatar,
      treeCount,
      giverTreecounterId,
      giverSlug
    );
    // remove this line
    giverTreecounterId = giverSlug;
    return (
      <div className="challenge_card p-t-10">
        <div className="flex-row">
          <div className="limit-width">
            <div className="flex-row">
              <UserProfileImage profileImage={giverAvatar} />
              <div className="challenge_details">
                <div>{giverName}</div>
                <div className="light">
                  {treeCount} {i18n.t('label.trees')}
                </div>
              </div>
            </div>
          </div>
          <div className="button_align">
            <SecondaryButton
              className="default-btn"
              onClick={() => {
                this.props.onSupport({
                  id: giverTreecounterId,
                  displayName: giverName
                });
              }}
            >
              {i18n.t('label.support')}
            </SecondaryButton>
          </div>
        </div>
      </div>
    );
  }
}

ContributorCard.propTypes = {
  contributor: PropTypes.object.isRequired,
  onSupport: PropTypes.func
};
