import React from 'react';
import PropTypes from 'prop-types';
import ContributorCard from './ContributorCard';

// import classnames from 'classnames';
// import { Link } from 'react-router-dom';
// import * as images from '../../assets';
// import { getImageUrl, getLocalRoute } from '../../actions/apiRouting';
// import { getLocalRoute } from '../../actions/apiRouting';
// import TextSpan from '../Common/Text/TextSpan';
import { updateRoute } from '../../helpers/routerHelper';
// import { formatDate, delimitNumbers } from '../../utils/utils';
// import i18n from '../../locales/i18n.js';

const ContributorsList = props => {
  const getContributors = () => {
    let contribution = {};
    props.contributions.map(contributor => {
      if (contributor.giver) {
        if (!contribution[contributor.giverSlug])
          contribution[contributor.giverSlug] = contributor;
        contribution[contributor.giverSlug].treeCount += contributor.treeCount;
      }
    });
    return contribution;
  };
  const onSupport = treecounter => {
    console.log('rops', props, treecounter);
    props.supportTreeCounterAction(treecounter);
    updateRoute('app_donateTrees');
  };

  // let { contributions } = this.props;

  const contributors = getContributors();
  console.log('contributors:...', contributors);
  return Object.values(contributors).map(contributor => (
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
