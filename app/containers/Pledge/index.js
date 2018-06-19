import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { fetchPledgesAction } from '../../actions/pledgeAction';
import { pledgesSelector } from '../../selectors';

import Pledge from '../../components/Pledge';

class PledgeContainer extends Component {
  componentDidMount() {
    this.props.fetchPledgesAction();
  }
  render() {
    return <Pledge />;
  }
}

const mapStateToProps = state => ({
  pledges: pledgesSelector(state)
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ fetchPledgesAction }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(PledgeContainer);

PledgeContainer.propTypes = {
  pledges: PropTypes.object,
  fetchPledgesAction: PropTypes.func
};
