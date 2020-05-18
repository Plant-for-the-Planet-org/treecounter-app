import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { debug } from '../../debug';
import { fetchPublicPledgesAction } from '../../actions/pledgeEventsAction';
import { loadUserProfile } from '../../actions/loadUserProfileAction';
import { selectPlantProjectAction } from '../../actions/selectPlantProjectAction';
import { fetchItem } from '../../stores/localStorage';
import {
  fetchPledgesAction,
  postPledge,
  clearTimeoutAction
} from '../../actions/pledgeAction';
import {
  pledgesSelector,
  pledgeEventSelector,
  entitiesSelector,
  currentUserProfileSelector
} from '../../selectors';
import PledgeEvents from './../../components/PledgeEvents/PledgeEvents';
import {
  setDonorDetails,
  setPledgeDetails,
  setSelectedProjectDetails,
  setDonationContext
} from './../../components/DonateTrees/redux/action';

const PledgeEventsContainer = props => {
  const [loading, setLoading] = React.useState(true);
  const [myPledge, setMyPledge] = React.useState('');
  const [login, setLogin] = React.useState(false);

  React.useEffect(() => {
    if (!props.pledges) {
      props.fetchPledgesAction(props.navigation.getParam('slug'), true);
    }
    if (!myPledge) {
      getMyPledge();
    }
    if (props.currentUserProfile) {
      setLogin(true);
    } else {
      fetchItem('pledgedEvent') // Fetching pledges which are stored in user's device
        .then(data => {
          if (typeof data !== 'undefined' && data.length > 0) {
            let stringPledges = JSON.parse(data);
            stringPledges = stringPledges.toString();
            props.fetchPublicPledgesAction(stringPledges);
          }
        })
        .catch(error => debug(error));
    }

    if (props.pledges && props.pledges.image && loading) {
      setLoading(false);
    }
  }, [
    props.pledges,
    props.navigation.getParam('slug'),
    props.entities.eventPledge
  ]);

  const getMyPledge = () => {
    let userPledges = props.entities.eventPledge
      ? props.pledges &&
        props.pledges.allEventPledges &&
        props.pledges.allEventPledges.length > 0 // Checking if we have all the pledges
        ? typeof props.entities.eventPledge !== 'undefined'
          ? ((userPledges = Object.values(props.entities.eventPledge)), // convert object to array
            userPledges.filter(pledge => {
              return props.pledges.allEventPledges.some(f => {
                return f.token === pledge.token;
              });
            }))
          : null
        : null
      : null;
    setMyPledge(userPledges);
  };

  let pledges =
    props.pledges && props.pledges.total !== undefined ? props.pledges : null;
  return (
    <PledgeEvents
      pledges={pledges}
      myPledge={myPledge}
      navigation={props.navigation}
      login={login}
      loading={loading}
      treeCount={props.navigation.getParam('treeCount').toLocaleString()}
      fetchPledgesAction={fetchPledgesAction}
      showRBSheet={props.navigation.getParam('showRBSheet')}
      selectPlantProjectAction={props.selectPlantProjectAction}
      fetchPledgesAction={props.fetchPledgesAction}
      slug={props.navigation.getParam('slug')}
      contextActions={{
        setPledgeDetails: props.setPledgeDetails,
        setDonorDetails: props.setDonorDetails,
        setSelectedProjectDetails: props.setSelectedProjectDetails,
        setDonationContext: props.setDonationContext
      }}
    />
  );
};

PledgeEventsContainer.navigationOptions = {
  header: null
};

const mapStateToProps = state => ({
  pledges: pledgesSelector(state),
  pledgeEvents: pledgeEventSelector(state),
  entities: entitiesSelector(state),
  currentUserProfile: currentUserProfileSelector(state)
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      fetchPledgesAction,
      postPledge,
      clearTimeoutAction,
      fetchPublicPledgesAction,
      loadUserProfile,
      selectPlantProjectAction,
      setDonorDetails,
      setPledgeDetails,
      setSelectedProjectDetails,
      setDonationContext
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PledgeEventsContainer);
