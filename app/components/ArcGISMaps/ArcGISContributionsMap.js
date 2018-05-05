import React from 'react'
import PropTypes from 'prop-types'

/**
 * This component will be developed by ESRI Inc. and requires further analysis.
 */
const ArcGISContributionsMap = ({mapData}) => {
  console.log(mapData)
  return (<div>
    some map data
  </div>)
}

ArcGISContributionsMap.propTypes = {
  mapData: PropTypes.object
}

export default ArcGISContributionsMap
