import React from 'react'
import PropTypes from 'prop-types'

import PageTitle from './PageTitle'
import PageSeparator from './PageSeparator'

const PageHeader = (caption, intro) => {

  return (<div>
    <PageTitle caption={caption}/>
    {intro && <div>{intro}</div>}
    <PageSeparator/>
  </div>)
}

PageHeader.propTypes = {
  caption: PropTypes.string.isRequired,
  intro: PropTypes.string
}

export default PageHeader
