import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectPlantProjectAction } from '../../actions/selectPlantProjectAction';
import { Link } from 'react-router-dom';
import * as constants from '../../SupportedLanguages/en';
import PropTypes from 'prop-types';

const DonateTreesCardFooter = props => {
  const { selectPlantProjectAction, value } = props;
  let route = `/payment/project/${value.id}`;

  const handleDonateTreesButton = (event, id) => {
    selectPlantProjectAction(id);
  };
  return (
    <div className="card-footer">
      <a className="leftBtn" href="#">
        {constants.formStrings.seeMore}
      </a>
      <Link
        className="rightBtn"
        to={route}
        onClick={e => handleDonateTreesButton(e, value.id)}
      >
        {constants.formStrings.donateTrees}
      </Link>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ selectPlantProjectAction }, dispatch);
};

export default connect(null, mapDispatchToProps)(DonateTreesCardFooter);

DonateTreesCardFooter.propTypes = {
  selectPlantProjectIdAction: PropTypes.func,
  value: PropTypes.object
};
