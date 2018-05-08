import React from 'react'
import PropTypes from 'prop-types'

const PageTitle = props => <h3 className="cs-heading">{props.caption}</h3>

PageTitle.propTypes = {
  caption: PropTypes.string.isRequired
}

export default PageTitle
