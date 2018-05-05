import React from 'react'
import PropTypes from 'prop-types'

/**
 * TODO: add translations, add caption and callback to props
 */
const SupportButton = ({active, isUserLoggedIn}) => {

  return isUserLoggedIn ?
    <span>support-button {active? 'active':'inactive'}</span>
    :
    <span>label.support.must_login</span>
}

SupportButton.propTypes = {
  active: PropTypes.bool.isRequired,
  isUserLoggedIn: PropTypes.bool.isRequired,
  onRegisterSupporter: PropTypes.func.isRequired
}
export default SupportButton

