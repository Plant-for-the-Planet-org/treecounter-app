import React, { lazy } from 'react';
import PropTypes from 'prop-types';

const UserSynopsis = lazy(() => import('../Common/UserSynopsis'));
const UserHomepageLink = lazy(() => import('../Common/UserHomepageLink'));
const ArcGISContributionsMap = lazy(() =>
  import('../Map/ArcGISContributionsMap')
);

/**
 * MapIds:
 *   - d601683709dc415b99ddc1bc66a6d8eb
 *   - 534da741b327459eb117f4cc93acd98e
 */
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
      <ArcGISContributionsMap
        webMapId={'d601683709dc415b99ddc1bc66a6d8eb'}
        userId={userProfile.id}
      />
      {/*<UserBarChart contributions={userProfile.contributions} />*/}
    </div>
  );
};

UserFootprint.propTypes = {
  userProfile: PropTypes.object.isRequired
};

export default UserFootprint;
