import React from 'react';
import PropTypes from 'prop-types';
import { link } from '../../assets';
import i18n from '../../locales/i18n.js';

const UserHomepageLink = ({ caption, homepageUrl }) => {
  return homepageUrl ? (
    <div className="tree-counter-home-page-link">
      <img src={link} className="material-icons" />
      <a href={homepageUrl} target="_blank">
        {caption || i18n.t('label.read_more')}
      </a>
    </div>
  ) : null;
};

UserHomepageLink.propTypes = {
  caption: PropTypes.string,
  homepageUrl: PropTypes.string
};

export default UserHomepageLink;
