import React from 'react'
import PropTypes from 'prop-types'

const style = {
  position: 'absolute',
  backgroundColor: '#FFFFFF',
  zIndex: 99999,
  width: '400px',
  height: '500px',
  border: '1px solid #999999',
  top: '50%',
  left: '50%',
  marginTop: '-250px',
  marginLeft: '-200px'
}

const ContentBox = (props) => {
  return (<div style={style}>
    {props.children}
  </div>)
}

ContentBox.propTypes = {
  children: PropTypes.any
}

export default ContentBox
