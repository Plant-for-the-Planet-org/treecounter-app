import React from 'react';
import PropTypes from 'prop-types';

import { updateRoute } from '../../helpers/routerHelper';

const InlineLink = props => (
  <div className="link" onClick={updateRoute.bind(this, props.uri)}>
    {props.caption}
  </div>
);

InlineLink.propTypes = {
  caption: PropTypes.string.isRequired,
  uri: PropTypes.string.isRequired
};

export default InlineLink;
