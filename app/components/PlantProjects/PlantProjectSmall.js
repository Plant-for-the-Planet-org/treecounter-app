import React from 'react'
import PropTypes from 'prop-types'

import PlantProjectTeaser from './PlantProjectTeaser'

const PlantProjectSmall = ({plantProject}) => {
  const {tpoName, showTpoName, projectName, isCertified, projectImage} = plantProject
  const teaserProps = {tpoName, showTpoName, projectName, isCertified, projectImage}

  return (<div>
    <PlantProjectTeaser {...teaserProps}/>
  </div>)
}

/**
 * see: https://github.com/Plant-for-the-Planet-org/treecounter-platform/wiki/Component-PlantProjectSmall
 */
PlantProjectSmall.propTypes = {
  plantProject: PropTypes.object.isRequired
}

export default PlantProjectSmall
