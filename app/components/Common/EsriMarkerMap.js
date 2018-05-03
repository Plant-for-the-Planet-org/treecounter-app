import React, {Component} from 'react'
import PropTypes from 'prop-types'

const EsriMarkerMap = () => <div className="text-center">EsriMarkerMap</div>;

EsriMarkerMap.propTypes = {
  markers: PropTypes.array,
  zoom: PropTypes.number,
  center: PropTypes.object
}

export default EsriMarkerMap
