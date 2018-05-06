import React from 'react';
import PropTypes from 'prop-types';

const InlineLink = props => <a href={props.uri}>{props.caption}</a>;

InlineLink.propTypes = {
  caption: PropTypes.string.isRequired,
  uri: PropTypes.string.isRequired
};

export default InlineLink;
