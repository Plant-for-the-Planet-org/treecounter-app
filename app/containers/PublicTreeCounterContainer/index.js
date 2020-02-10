import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { debug } from '../../debug';
import { updateRoute } from '../../helpers/routerHelper';
import PublicTreecounter from '../../components/PublicTreeCounter/PublicTreecounter';
import { currentUserProfileSelector } from '../../selectors';
import { selectPlantProjectAction } from '../../actions/selectPlantProjectAction';
import { supportTreecounterAction } from '../../actions/supportTreecounterAction';
import { followUser, unfollowUser } from '../../actions/followActions';
import { treecounterLookupAction } from '../../actions/treecounterLookupAction';

class PublicTreecounterContainer extends Component {
  static navigationOptions = {
    header: null
  };
  constructor() {
    super();
    this.state = {
      id: '',
      treecounter: null,
      displayName: '',
      isTpo: false
    };
  }

  getTreeCounterId(props) {
    let treeCounterId = null;
    if (props.match) {
      treeCounterId = props.match.params.treecounterId;
    } else if (props.navigation) {
      treeCounterId = props.navigation.getParam('treeCounterId', treeCounterId);
    }
    return treeCounterId;
  }

  fetchAndSetSearchResult(props) {
    const { treecounterLookupAction } = props;
    debug('fetchAndSetSearchResult');
    treecounterLookupAction(this.getTreeCounterId(props), this.props.navigation)
      .then(treecounter => {
        this.setState({
          treecounter,
          isTpo: treecounter.userProfile && treecounter.userProfile === 'tpo',
          id: treecounter.id
        });
      })
      .catch(error => debug(error));
  }
  componentWillMount() {
    this.fetchAndSetSearchResult(this.props);
  }
  componentWillReceiveProps(nextProps) {
    debug('test, props', nextProps);
    if (this.getTreeCounterId(this.props) === this.getTreeCounterId(nextProps))
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
        navigation={this.props.navigation}
        route={(routeName, id, params) =>
          this.props.route(routeName, id, params, this.props.navigation)
        }
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
      route: (routeName, id, params, navigation) => dispatch =>
        updateRoute(routeName, navigation || dispatch, id, params)
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
  }),
  navigation: PropTypes.any
};
