import React from 'react';
import PropTypes from 'prop-types';

const PageHeader = props => <h3 className="cs-heading">{props.caption}</h3>;

PageHeader.propTypes = {
  caption: PropTypes.string.isRequired
};

export default PageHeader;
