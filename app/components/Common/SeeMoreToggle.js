import React from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'

const SeeMoreToggle = ({seeMore, onToggle}) => {
  return <Link to="#" onClick={() => onToggle()}>{seeMore ? 'link.label.see_more' : 'link.label.see_less'}</Link>
}

SeeMoreToggle.propTypes = {
  seeMore: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired
}

export default SeeMoreToggle
