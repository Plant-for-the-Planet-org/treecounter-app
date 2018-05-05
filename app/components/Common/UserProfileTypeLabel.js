import React from 'react'
import PropTypes from 'prop-types'

const UserProfileTypeLabel = ({profileType}) => {
  return <span>{`label.user_profile.${profileType}`}</span>
}

UserProfileTypeLabel.propTypes = {
  profileType: PropTypes.string
}

export default UserProfileTypeLabel
