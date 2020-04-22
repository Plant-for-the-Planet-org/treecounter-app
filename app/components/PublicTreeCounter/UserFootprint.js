import React from 'react';
import PropTypes from 'prop-types';
import { getWebMapId } from '../../actions/apiRouting';
import UserSynopsis from '../Common/UserSynopsis';
import UserHomepageLink from '../Common/UserHomepageLink';
import ArcGISContributionsMap from '../Map/ArcGISContributionsMap';

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
        webMapId={getWebMapId('inventory')}
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
