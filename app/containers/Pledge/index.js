import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { fetchPledgesAction, postPledge } from '../../actions/pledgeAction';
import { pledgesSelector } from '../../selectors';

import Pledge from '../../components/Pledge';

class PledgeContainer extends Component {
  componentDidMount() {
    this.props.fetchPledgesAction();
  }

  postPledgeRequest(data) {
    this.props.postPledge(data, { pledgeEventSlug: 'esri-user-conference' });
  }
  render() {
    return (
      <Pledge
        pledges={this.props.pledges}
        postPledge={data => this.postPledgeRequest(data)}
      />
    );
  }
}

const mapStateToProps = state => ({
  pledges: pledgesSelector(state)
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ fetchPledgesAction, postPledge }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(PledgeContainer);

PledgeContainer.propTypes = {
  pledges: PropTypes.object,
  fetchPledgesAction: PropTypes.func,
  postPledge: PropTypes.func
};
