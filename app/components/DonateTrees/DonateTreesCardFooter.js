import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectPlantProjectIdAction } from '../../actions/selectPlantProjectIdAction';
import { Link } from 'react-router-dom';
import * as constants from '../../SupportedLanguages/en';

const DonateTreesCardFooter = props => {
  const { selectPlantProjectIdAction, value } = props;
  let route = `/payment/project/${value.id}`;

  const handleDonateTreesButton = (event, id) => {
    selectPlantProjectIdAction(id);
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
  return bindActionCreators({ selectPlantProjectIdAction }, dispatch);
};

export default connect(null, mapDispatchToProps)(DonateTreesCardFooter);
