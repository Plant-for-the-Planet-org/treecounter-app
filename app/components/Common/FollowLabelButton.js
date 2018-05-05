import React from 'react'
import PropTypes from 'prop-types'

/**
 * TODO: add translations
 */
const FollowLabelButton = ({isLoggedIn, isSubscribed, onClick}) => {

  const label = isSubscribed ? 'label.follow.un_subscribe' : 'label.follow.subscribe'

  return isLoggedIn ?
    <span onClick={onClick}>{label}</span>
    :
    <span>label.follow.must_login</span>
}

FollowLabelButton.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  isSubscribed: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
}

export default FollowLabelButton
