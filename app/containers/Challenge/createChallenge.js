import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { challenge } from '../../actions/challengeActions';

import { updateRoute } from '../../helpers/routerHelper';
import { setProgressModelState } from '../../reducers/modelDialogReducer';

import Challenge from '../../components/Challenge/createChallenge';

class ChallengeContainer extends Component {
  onTabChange(title) {
    this.props.navigation.setParams({ titleParam: title });
  }
  render() {
    return (
      <Challenge
        onTabChange={title => this.onTabChange(title)}
        setProgressModelState={this.props.setProgressModelState}
        updateRoute={(routeName, id) =>
          this.props.route(routeName, id, this.props.navigation)
        }
        challengeUser={this.props.challenge}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    state
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      setProgressModelState,
      challenge,
      route: (routeName, id, navigation) => dispatch =>
        updateRoute(routeName, navigation || dispatch, id)
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ChallengeContainer);

ChallengeContainer.propTypes = {
  navigation: PropTypes.any,
  setProgressModelState: PropTypes.func,
  challenge: PropTypes.func,
  route: PropTypes.func
};
