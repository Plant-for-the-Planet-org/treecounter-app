import React, { lazy } from 'react';
import PropTypes from 'prop-types';

import { updateRoute } from '../../helpers/routerHelper';

const PrimaryButton = lazy(() => import('./Button/PrimaryButton'));

import { withNavigation } from 'react-navigation';

const InlineLink = props => (
  <PrimaryButton onClick={updateRoute.bind(this, props.uri, props.navigation)}>
    {props.caption}
  </PrimaryButton>
);

InlineLink.propTypes = {
  caption: PropTypes.string.isRequired,
  uri: PropTypes.string.isRequired,
  navigation: PropTypes.any
};

export default withNavigation(InlineLink);
