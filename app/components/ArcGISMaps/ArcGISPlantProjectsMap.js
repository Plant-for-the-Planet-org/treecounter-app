import React from 'react'
import PropTypes from 'prop-types'

/**
 * This component will be developed by ESRI Inc. and requires further analysis.
 */
const ArcGISPlantProjectsMap = ({mapData}) => {
  console.log(mapData)
  return (<div>
    some map data
  </div>)
}

ArcGISPlantProjectsMap.propTypes = {
  mapData: PropTypes.object
}

export default ArcGISPlantProjectsMap
