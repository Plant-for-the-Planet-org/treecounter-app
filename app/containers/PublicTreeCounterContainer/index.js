import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import updateRoute from '../../helpers/routerHelper';
import PublicTreecounter from '../../components/PublicTreeCounter/PublicTreecounter';
import { currentUserProfileSelector } from '../../selectors';
import { selectPlantProjectAction } from '../../actions/selectPlantProjectAction';
import { supportTreecounterAction } from '../../actions/supportTreecounterAction';
import { followUser, unfollowUser } from '../../actions/followActions';

import { treecounterLookupAction } from '../../actions/treecounterLookupAction';

class PublicTreecounterContainer extends Component {
  constructor() {
    super();
    this.state = {
      id: '',
      treecounter: null,
      displayName: '',
      isTpo: false
    };
  }

  fetchAndSetSearchResult(props) {
    const {
      match: { params },
      treecounterLookupAction
    } = props;

    treecounterLookupAction(params.treecounterId)
      .then(treecounter => {
        this.setState({
          treecounter,
          isTpo: treecounter.userProfile && treecounter.userProfile === 'tpo',
          id: treecounter.id
        });
      })
      .catch(error => console.log(error));
  }
  componentWillMount() {
    this.fetchAndSetSearchResult(this.props);
  }
  componentWillReceiveProps(nextProps) {
    if (
      this.props.match.params.treecounterId ===
      nextProps.match.params.treecounterId
    )
      return;
    this.fetchAndSetSearchResult(nextProps);
  }

  render() {
    return (
      <PublicTreecounter
        treecounter={this.state.treecounter}
        currentUserProfile={this.props.currentUserProfile}
        followSubscribeAction={this.props.followSubscribeAction}
        unfollowSubscribeAction={this.props.unfollowSubscribeAction}
        selectPlantProjectIdAction={this.props.selectPlantProjectIdAction}
        supportTreecounterAction={this.props.supportTreecounterAction}
        route={this.props.route}
      />
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      selectPlantProjectIdAction: selectPlantProjectAction,
      supportTreecounterAction: supportTreecounterAction,
      followSubscribeAction: followUser,
      unfollowSubscribeAction: unfollowUser,
      treecounterLookupAction: treecounterLookupAction,
      route: (routeName, id, params) => dispatch =>
        updateRoute(routeName, dispatch, id, params)
    },
    dispatch
  );
};

const mapStateToProps = state => ({
  userTpos: state.entities.tpo,
  currentUserProfile: currentUserProfileSelector(state)
});

export default connect(mapStateToProps, mapDispatchToProps)(
  PublicTreecounterContainer
);

import PropTypes from 'prop-types';
PublicTreecounterContainer.propTypes = {
  userTpos: PropTypes.object.isRequired,
  treecounterData: PropTypes.object,
  currentUserProfile: PropTypes.object,
  followSubscribeAction: PropTypes.func,
  unfollowSubscribeAction: PropTypes.func,
  selectPlantProjectIdAction: PropTypes.func,
  supportTreecounterAction: PropTypes.func,
  treecounterLookupAction: PropTypes.func,
  route: PropTypes.func,
  match: PropTypes.shape({
    params: PropTypes.shape({
      treecounterId: PropTypes.string
    })
  }).isRequired
};
