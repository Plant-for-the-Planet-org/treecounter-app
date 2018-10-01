import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  fetchPledgesAction,
  postPledge,
  clearTimeoutAction
} from '../../actions/pledgeAction';
import { pledgesSelector, pledgeEventSelector } from '../../selectors';

import Pledge from '../../components/Pledge';

class PledgeContainer extends Component {
  componentDidMount() {
    this.props.fetchPledgesAction(this.props.match.params.eventSlug);
  }

  componentWillUnmount() {
    this.props.clearTimeoutAction(this.props.pledges.timeoutID);
  }

  postPledgeRequest(data) {
    this.props.postPledge(data, {
      pledgeEventSlug: this.props.match.params.eventSlug
    });
  }
  render() {
    return (
      <Pledge
        pledges={this.props.pledges}
        postPledge={data => this.postPledgeRequest(data)}
        pledgeEvents={this.props.pledgeEvents}
        eventSlug={this.props.match.params.eventSlug}
      />
    );
  }
}

const mapStateToProps = state => ({
  pledges: pledgesSelector(state),
  pledgeEvents: pledgeEventSelector(state)
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    { fetchPledgesAction, postPledge, clearTimeoutAction },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(PledgeContainer);

PledgeContainer.propTypes = {
  pledges: PropTypes.object,
  pledgeEvents: PropTypes.object,
  fetchPledgesAction: PropTypes.func,
  postPledge: PropTypes.func,
  clearTimeoutAction: PropTypes.func,
  match: PropTypes.shape({
    params: PropTypes.shape({
      eventSlug: PropTypes.string
    })
  }).isRequired
};
