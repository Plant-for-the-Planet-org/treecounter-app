import React from 'react'
import PropTypes from 'prop-types'

/**
 * see: https://github.com/Plant-for-the-Planet-org/treecounter-platform/wiki/Component-PlantProjectSpecs
 */
const PlantProjectSpecs = ({location, countPlanted, countTarget, treeCost, currency, survivalRate}) => {
  return (<div>
    <div>location: {location}</div>
    <div>countPlanted: {countPlanted}</div>
    <div>countTarget: {countTarget}</div>
    <div>treeCost: {treeCost}</div>
    <div>currency: {currency}</div>
    <div>survivalRate: {survivalRate}</div>
  </div>)
}

PlantProjectSpecs.propTypes = {
  location: PropTypes.string,
  countPlanted: PropTypes.number.isRequired,
  countTarget: PropTypes.number.isRequired,
  treeCost: PropTypes.number.isRequired,
  currency: PropTypes.string.isRequired,
  survivalRate: PropTypes.number.isRequired
}

export default PlantProjectSpecs
