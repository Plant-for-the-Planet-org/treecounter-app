import React, {Component} from 'react'
import PropTypes from 'prop-types'

import EsriMarkerMap from "../Common/EsriMarkerMap"

const ContributionsMap = props => {

  const calculateCenter = (contributions) => {
    // TODO: here the geo location of the first contribution is taken as it is not clear
    //       whether the map can auto center and zoom. the whole function might be obsolete
    return {
      x: contributions[0].geoLongitude,
      y: contributions[0].geoLatitude
    }
  }

  const buildPopupHtml = (contribution, updateContribution) => {
    return `${contribution.tree_count} ${contribution.tree_type} ...`
  }


  const {contributions, updateContribution} = props

  const markers = contributions.map(contribution => {
    return {
      center: calculateCenter(contributions),
      zoom: 6,
      icon: contribution.contribution_type,
      geoLongitude: contribution.geo_longitude,
      geoLatitude: contribution.geo_latitude,
      popup: buildPopupHtml(contribution)
    }
  })

  return (
    <EsriMarkerMap markers={markers} zoom={6} center={{x:0,y:0}}/>
  )
}

ContributionsMap.propTypes = {
  contributions: PropTypes.array.isRequired,
  updateContribution: PropTypes.func.isRequired
}

export default ContributionsMap
