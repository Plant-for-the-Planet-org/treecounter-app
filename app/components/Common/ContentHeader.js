import React from 'react'
import PropTypes from 'prop-types'

const ContentHeader = ({caption}) => {
  return (<div style={{color: '#FFFFFF', backgroundColor: '#B7D480', padding: '4px 8px'}}>
    {caption}
  </div>)
}

ContentHeader.propTypes = {
  caption: PropTypes.string.isRequired
};

export default ContentHeader
