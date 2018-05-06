import React from 'react';
import PropTypes from 'prop-types';

import * as constants from '../../SupportedLanguages/en';

const TpoCardText = props => {
  const { name, tponame, cardtext } = props;

  return (
    <div className={name}>
      <span className="tpo_box_span">{tponame}</span>
      <img
        src="http://azoom-sites.rockthemes.net/abboxed/wp-content/uploads/sites/14/2015/05/abboxed-restaurant-portfolio2.jpg"
        alt="First Slide"
      />
      <p className="name_tag">{cardtext.region}</p>
      <div className="middle_tag">
        <span className="col-md-8 text-left">
          {constants.formStrings.planted}:{' '}
        </span>{' '}
        <span className="col-md-4 text-right">{cardtext.count_planted}</span>
      </div>
      <div className="middle_tag">
        <span className="col-md-8 text-left">
          {constants.formStrings.target}:
        </span>{' '}
        <span className="text-right col-md-4">{cardtext.count_target}</span>
      </div>
      <div className="middle_tag">
        <span className="col-md-8 text-left">
          {constants.formStrings.survival_rate}:
        </span>{' '}
        <span className="text-right col-md-4">{cardtext.survival_rate}</span>
      </div>
      <div className="middle_tag">
        <span className="col-md-8 text-left">
          {constants.formStrings.certified}:
        </span>{' '}
        <span className="text-right col-md-4">
          {cardtext.is_certified ? 'Certified' : 'Not-Certified'}
        </span>
      </div>
      <div className="middle_tag1">
        <span className="col-md-8 text-left">
          {constants.formStrings.Cost}:
        </span>{' '}
        <span className="text-right col-md-4">{cardtext.tree_cost}</span>
      </div>
    </div>
  );
};

TpoCardText.propTypes = {
  name: PropTypes.any.isRequired,
  cardtext: PropTypes.any.isRequired,
  tponame: PropTypes.string.isRequired
};

export default TpoCardText;
