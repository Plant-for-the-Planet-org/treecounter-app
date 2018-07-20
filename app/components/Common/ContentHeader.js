import React from 'react';
import PropTypes from 'prop-types';

const ContentHeader = ({ caption }) => {
  return <div className="content-header_container">{caption}</div>;
};

ContentHeader.propTypes = {
  caption: PropTypes.string.isRequired
};

export default ContentHeader;
