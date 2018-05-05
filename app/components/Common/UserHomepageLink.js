import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

const UserHomepageLink = ({caption, homepageUrl}) => {
  return homepageUrl ? <div>
      <Link to={homepageUrl}>{caption}</Link>
    </div>
    :
    null
}

UserHomepageLink.propTypes = {
  caption: PropTypes.string,
  homepageUrl: PropTypes.string
}

export default UserHomepageLink
