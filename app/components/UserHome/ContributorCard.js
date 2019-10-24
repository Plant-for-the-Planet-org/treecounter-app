import React from 'react';
import PropTypes from 'prop-types';
import CardLayout from '../Common/Card';
import UserProfileImage from '../Common/UserProfileImage';
import SupportButton from '../PublicTreeCounter/SupportButton';
import i18n from '../../locales/i18n.js';

export default class ContributorCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { contributor } = this.props;
    let { avatar, fullname, treeCount } = contributor;
    console.log('vaatar', avatar, fullname, treeCount);
    return (
      <div className="challenge_card">
        <CardLayout>
          <div className="flex-row">
            <div className="limit-width">
              <div className="flex-row">
                <UserProfileImage profileImage={avatar} />
                <div className="challenge_details">
                  <div className="flex-row">
                    <span className="text-style text-padding">{fullname}</span>
                  </div>
                  <div>{treeCount}</div>
                </div>
              </div>
            </div>
            <div className="button_align">
              <div className="support-button-container ">
                <SupportButton
                  buttonLabel={i18n.t('label.support')}
                  onSupport={() => this.onSupport()}
                />
              </div>
            </div>
          </div>
        </CardLayout>
      </div>
    );
  }
}

ContributorCard.propTypes = {
  contributor: PropTypes.object.isRequired,
  onSupport: PropTypes.func
};
