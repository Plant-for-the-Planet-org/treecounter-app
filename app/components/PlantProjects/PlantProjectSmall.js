import React from 'react'
import PropTypes from 'prop-types'

import PlantProjectTeaser from './PlantProjectTeaser'

const PlantProjectSmall = ({plantProject, tpoName}) => {
  const {projectName, isCertified, projectImage} = plantProject
  const teaserProps = {tpoName: this.props.tpoName, showTpoName, projectName, isCertified, projectImage}

  return (<div>
    <PlantProjectTeaser {...teaserProps}/>
  </div>)
}

/**
 * see: https://github.com/Plant-for-the-Planet-org/treecounter-platform/wiki/Component-PlantProjectSmall
 */
PlantProjectSmall.propTypes = {
  plantProject: PropTypes.object.isRequired,
  tpoName: PropTypes.string
}

export default PlantProjectSmall
