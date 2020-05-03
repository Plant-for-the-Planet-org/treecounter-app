import React from 'react';
import PropTypes from 'prop-types';
import UserSynopsis from '../Common/UserSynopsis';
import UserHomepageLink from '../Common/UserHomepageLink';
import ArcGISContributionsMap from '../Map/ArcGISContributionsMap';

const UserFootprint = ({ userProfile }) => {
  return (
    <div className="full_width">
      <UserSynopsis
        synopsis1={userProfile.synopsis1}
        synopsis2={userProfile.synopsis2}
      />
      <UserHomepageLink
        homepageUrl={userProfile.url}
        caption={userProfile.linkText}
      />
      <ArcGISContributionsMap userId={userProfile.id} />
      {/*<UserBarChart contributions={userProfile.contributions} />*/}
    </div>
  );
};

UserFootprint.propTypes = {
  userProfile: PropTypes.object.isRequired
};

export default UserFootprint;
