import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import {
  openSideNavAction,
  closeSideNavAction,
  toggleSideNavAction
} from '../../actions/setSideNavAction';

class BurgerMenu extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <i
        onClick={this.props.toggleSideNavAction}
        className="material-icons burger-icon"
      >
        {'menu'}
      </i>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    { openSideNavAction, closeSideNavAction, toggleSideNavAction },
    dispatch
  );
};

export default connect(null, mapDispatchToProps)(BurgerMenu);

BurgerMenu.propTypes = {
  toggleSideNavAction: PropTypes.func.isRequired
};
