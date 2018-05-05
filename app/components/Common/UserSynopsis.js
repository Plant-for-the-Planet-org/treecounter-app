import React from 'react'
import PropTypes from 'prop-types'

const UserSynopsis = ({synopsis1, synopsis2}) => {
  // TODO: render nothing if both props are empty, 1 column if synopsis1 is not empty and columns if none is empty
  // display component only if one of both properties is not empty
  // show 1 column if synopsis2 is empty
  // display 2 columns if both are not empty
  return (<div>
    {synopsis1}|{synopsis2}
    synopsis1: {synopsis1}, synopsis2: {synopsis2}
  </div>)
}

UserSynopsis.propTypes = {
  synopsis1: PropTypes.string,
  synopsis2: PropTypes.string
}

export default UserSynopsis
