import React from 'react';
import PropTypes from 'prop-types';
import { getDocumentTitle } from '../../../helpers/utils';

const TextHeading = ({ children }) => {
  {
    try {
      if (
        children instanceof Array &&
        children.length &&
        typeof children[0] === 'string'
      ) {
        document.title = getDocumentTitle(children[0]);
      } else if (typeof children === 'string') {
        document.title = getDocumentTitle(children);
      }
    } catch (err) {
      console.log(err);
    }
  }
  return <h2 className="pftp-text-heading">{children}</h2>;
};

TextHeading.propTypes = {
  children: PropTypes.node
};

export default TextHeading;
