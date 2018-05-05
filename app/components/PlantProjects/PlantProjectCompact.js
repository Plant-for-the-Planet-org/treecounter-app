import React from 'react'
import PropTypes from 'prop-types'

import PlantProjectTeaser from "./PlantProjectTeaser"
import PlantProjectSpecs from "./PlantProjectSpecs"

const PlantProjectCompact = ({plantProject, showTpoName}) => {

  const {tpoName, projectName, isCertified, projectImage, location, countPlanted, countTarget, treeCost, currency, survivalRate} = plantProject
  const teaserProps = {tpoName, projectName, isCertified, projectImage, showTpoName}
  const specsProps = {location, countPlanted, countTarget, treeCost, currency, survivalRate}

  return <div>
    <PlantProjectTeaser {...teaserProps} />
    <PlantProjectSpecs {...specsProps} />
  </div>
}

PlantProjectCompact.propTypes = {
  plantProject: PropTypes.object.isRequired,
  showTpoName: PropTypes.bool.isRequired
}

export default PlantProjectCompact
