import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import RegisterTrees from '../../components/RegisterTrees';
import { registerTree } from '../../actions/registerTree';
import { userTreecounterSelector } from '../../selectors/index';
import { mergeContributionImages } from '../../helpers/utils';
import { currentUserProfileSelector } from '../../selectors/index';

class RegisterTreesContainer extends Component {
  constructor() {
    super();
  }

  onSubmit = (mode, registerTreeForm) => {
    registerTreeForm =
      registerTreeForm || this.refs.registerTrees.refs.registerTreeForm;
    // console.log(registerTreeForm.validate());
    let value = registerTreeForm.getValue();
    value = mergeContributionImages(value);
    if (value) {
      this.props.registerTree(
        value,
        this.props.treecounter.id,
        mode,
        this.props.navigation
      );
    }
    return false;
  };

  render() {
    return (
      <RegisterTrees
        ref="registerTrees"
        onSubmit={this.onSubmit}
        currentUserProfile={this.props.currentUserProfile}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    treecounter: userTreecounterSelector(state),
    currentUserProfile: currentUserProfileSelector(state)
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ registerTree }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(
  RegisterTreesContainer
);

RegisterTreesContainer.propTypes = {
  registerTree: PropTypes.func.isRequired,
  treecounter: PropTypes.object,
  navigation: PropTypes.any,
  currentUserProfile: PropTypes.object
};
