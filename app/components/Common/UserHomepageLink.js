import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const UserHomepageLink = ({ caption, homepageUrl }) => {
  return homepageUrl ? (
    <div className="tree-counter-home-page-link">
      <i className="material-icons">link</i>
      <Link to={homepageUrl}>{caption}</Link>
    </div>
  ) : null;
};

UserHomepageLink.propTypes = {
  caption: PropTypes.string,
  homepageUrl: PropTypes.string
};

export default UserHomepageLink;
