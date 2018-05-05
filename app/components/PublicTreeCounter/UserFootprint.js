import React from 'react'
import PropTypes from 'prop-types'

import UserSynopsis from '../Common/UserSynopsis'
import UserHomepageLink from '../Common/UserHomepageLink'
import ArcGISContributionsMap from '../ArcGISMaps/ArcGISContributionsMap'

const UserFootprint = ({userProfile}) => {

  console.log('UserFootprint userProfile: ', userProfile)
  return (<div>
    <UserSynopsis synopsis1={userProfile.synopsis1} synopsis2={userProfile.synopsis2}/>
    <UserHomepageLink url={userProfile.url} caption={userProfile.homepageCaption} />
    <ArcGISContributionsMap contributions={userProfile.contributions} />
    {/*<UserBarChart contributions={userProfile.contributions} />*/}
  </div>)
}

UserFootprint.propTypes = {
  userProfile: PropTypes.object.isRequired
};

export default UserFootprint
