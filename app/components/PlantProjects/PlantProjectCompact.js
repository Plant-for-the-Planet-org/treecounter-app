import React from 'react'
import PropTypes from 'prop-types'

import PlantProjectTeaser from "./PlantProjectTeaser"
import PlantProjectSpecs from "./PlantProjectSpecs"

const PlantProjectCompact = ({plantProject, tpoName}) => {

  const {projectName, isCertified, projectImage, location, countPlanted, countTarget, treeCost, currency, survivalRate} = plantProject
  const teaserProps = {tpoName: this.props.tpoName, projectName, isCertified, projectImage}
  const specsProps = {location, countPlanted, countTarget, treeCost, currency, survivalRate}

  return <div>
    <PlantProjectTeaser {...teaserProps} />
    <PlantProjectSpecs {...specsProps} />
  </div>
}

PlantProjectCompact.propTypes = {
  plantProject: PropTypes.object.isRequired,
  tpoName: PropTypes.string
}

export default PlantProjectCompact
