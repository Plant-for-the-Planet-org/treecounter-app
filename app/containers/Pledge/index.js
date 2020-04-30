import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { debug } from '../../debug';
import { loadUserProfile } from '../../actions/loadUserProfileAction';
import {
  fetchPledgesAction,
  postPledge,
  clearTimeoutAction,
  updatePledge
} from '../../actions/pledgeAction';
import { fetchPublicPledgesAction } from '../../actions/pledgeEventsAction';
import { fetchItem } from '../../stores/localStorage';
import {
  pledgesSelector,
  pledgeEventSelector,
  currentUserProfileSelector,
  entitiesSelector
} from '../../selectors';
import Pledge from '../../components/Pledge';

class PledgeContainer extends Component {
  state = {
    myPledge: {},
    slug: null
  };
  componentDidMount() {
    this.setState({
      slug: this.props.match.params.eventSlug
    });
    this.props.fetchPledgesAction(this.props.match.params.eventSlug, true);
    if (!this.props.currentUserProfile) {
      fetchItem('pledgedEvent')
        .then(data => {
          if (typeof data !== 'undefined' && data.length > 0) {
            let stringPledges = JSON.parse(data);
            stringPledges = stringPledges.toString();
            this.props.fetchPublicPledgesAction(stringPledges);
          }
        })
        .catch(() => debug('Trying to get user pledges'));
    }
    this.getMyPledge();
  }

  componentDidUpdate(prevProps) {
    if (
      JSON.stringify(prevProps.pledges) !== JSON.stringify(this.props.pledges)
    ) {
      this.setState({
        slug: this.props.match.params.eventSlug
      });
      if (!this.props.currentUserProfile) {
        fetchItem('pledgedEvent')
          .then(data => {
            if (typeof data !== 'undefined' && data.length > 0) {
              let stringPledges = JSON.parse(data);
              stringPledges = stringPledges.toString();
              this.props.fetchPublicPledgesAction(stringPledges);
            }
            this.getMyPledge();
          })
          .catch(() => debug('No pledges made by user'));
      }
      this.getMyPledge();
    }
    if (
      prevProps.pledges &&
      this.props.pledges &&
      prevProps.pledges.name !== this.props.pledges.name
    ) {
      this.props.fetchPledgesAction(this.props.match.params.eventSlug);
    }
  }

  getMyPledge = () => {
    let userPledges =
      this.props.entities && this.props.entities.eventPledge
        ? this.props.pledges &&
          this.props.pledges.allEventPledges &&
          this.props.pledges.allEventPledges.length > 0
          ? typeof this.props.entities.eventPledge !== 'undefined'
            ? ((userPledges = Object.values(this.props.entities.eventPledge)),
              userPledges.filter(pledge => {
                return this.props.pledges.allEventPledges.some(f => {
                  return f.token === pledge.token && f.email === pledge.email;
                });
              }))
            : null
          : null
        : null;
    this.setState({
      myPledge: userPledges
    });
  };

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
      this.props.currentUserProfile ? true : false
    );
  }
  updatePledge(data, token) {
    this.props.updatePledge(
      data,
      {
        token: token,
        version: 'v1.3'
      },
      this.props.currentUserProfile ? true : false
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
        updatePledge={(data, token) => this.updatePledge(data, token)}
        myPledge={this.state.myPledge}
        fetchPledgesAction={this.props.fetchPledgesAction}
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
      fetchPublicPledgesAction,
      updatePledge
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
  updatePledge: PropTypes.func,
  match: PropTypes.shape({
    params: PropTypes.shape({
      eventSlug: PropTypes.string
    })
  }).isRequired
};
