import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loadUserProfile } from './../../actions/loadUserProfileAction';
import {
  fetchPledgesAction,
  postPledge,
  clearTimeoutAction
} from '../../actions/pledgeAction';
import { fetchPublicPledgesAction } from '../../actions/pledgeEventsAction';
import {
  pledgesSelector,
  pledgeEventSelector,
  currentUserProfileSelector,
  entitiesSelector
} from '../../selectors';

import Pledge from '../../components/Pledge';

class PledgeContainer extends Component {
  state = {
    loggedIn: false
  };
  componentDidMount() {
    this.props.fetchPledgesAction(this.props.match.params.eventSlug);
    if (this.props.currentUserProfile) {
      this.setState({
        loggedIn: true
      });
    }
  }

  componentWillUnmount() {
    this.props.clearTimeoutAction(this.props.pledges.timeoutID);
  }

  postPledgeRequest(data) {
    this.props.postPledge(
      data,
      {
        pledgeEventSlug: this.props.match.params.eventSlug,
        version: 'v1.3'
      },
      this.state.loggedIn
    );
  }
  render() {
    return (
      <Pledge
        pledges={this.props.pledges}
        postPledge={data => this.postPledgeRequest(data)}
        pledgeEvents={this.props.pledgeEvents}
        eventSlug={this.props.match.params.eventSlug}
        currentUserProfile={this.props.currentUserProfile}
        fetchPublicPledgesAction={this.props.fetchPublicPledgesAction}
        entities={this.props.entities}
      />
    );
  }
}

const mapStateToProps = state => ({
  pledges: pledgesSelector(state),
  pledgeEvents: pledgeEventSelector(state),
  currentUserProfile: currentUserProfileSelector(state),
  entities: entitiesSelector(state)
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      fetchPledgesAction,
      postPledge,
      clearTimeoutAction,
      loadUserProfile,
      fetchPublicPledgesAction
    },
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
  currentUserProfile: PropTypes.any,
  fetchPublicPledgesAction: PropTypes.func,
  match: PropTypes.shape({
    params: PropTypes.shape({
      eventSlug: PropTypes.string
    })
  }).isRequired
};
