import React from 'react';
import PropTypes from 'prop-types';
import ContributorCard from './ContributorCard';

// import classnames from 'classnames';
// import { Link } from 'react-router-dom';
// import * as images from '../../assets';
// import { getImageUrl, getLocalRoute } from '../../actions/apiRouting';
// import { getLocalRoute } from '../../actions/apiRouting';
// import TextSpan from '../Common/Text/TextSpan';
// import { updateRoute } from '../../helpers/routerHelper';
// import { formatDate, delimitNumbers } from '../../utils/utils';
// import i18n from '../../locales/i18n.js';

const ContributorsList = props => {
  const getContributors = () => {
    return props.contributions.filter(contribution => {
      return contribution.giver;
    });
  };
  const onSupport = () => {
    // this.props.supportTreecounterAction(treecounter);
    // this.props.route('app_donateTrees');
  };

  // let { contributions } = this.props;

  const contributors = getContributors();
  console.log('contributors:...', contributors);
  return contributors.map(contributor => (
    <ContributorCard
      key={contributor.id}
      contributor={contributor}
      onSupport={onSupport}
    />
  ));
};

ContributorsList.propTypes = {
  contributions: PropTypes.any
};

export default ContributorsList;
