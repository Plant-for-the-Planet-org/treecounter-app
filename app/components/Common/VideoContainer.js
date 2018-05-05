import React from 'react'
import PropTypes from 'prop-types'

const VideoContainer = ({url}) => {
  return (<div>
    {url}
  </div>)
}

VideoContainer.propTypes = {
  url: PropTypes.string
}

export default VideoContainer
