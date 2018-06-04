import React from 'react';
import PropTypes from 'prop-types';
import { link } from '../../assets';

const UserHomepageLink = ({ caption, homepageUrl }) => {
  return homepageUrl ? (
    <div className="tree-counter-home-page-link">
      <img src={link} className="material-icons" />
      <a href={homepageUrl} target="_blank">
        {caption}
      </a>
    </div>
  ) : null;
};

UserHomepageLink.propTypes = {
  caption: PropTypes.string,
  homepageUrl: PropTypes.string
};

export default UserHomepageLink;
