import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectPlantProjectAction } from '../../actions/selectPlantProjectAction';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import i18n from '../../locales/i18n.js';
let lng = 'en';

const DonateTreesCardFooter = props => {
  const { selectPlantProjectAction, value } = props;
  let route = `/payment/project/${value.id}`;

  const handleDonateTreesButton = (event, id) => {
    selectPlantProjectAction(id);
  };
  return (
    <div className="card-footer">
      <a className="leftBtn" href="#">
        {i18n.t('label.donateTreeslabels.seeMore', { lng })}
      </a>
      <Link
        className="rightBtn"
        to={route}
        onClick={e => handleDonateTreesButton(e, value.id)}
      >
        {i18n.t('label.donateTreeslabels.donateTrees', { lng })}
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
