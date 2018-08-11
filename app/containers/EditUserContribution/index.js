import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { editTree } from '../../actions/EditMyTree';
import EditUserContribution from '../../components/EditUserContribution';

// Actions
import { sortedUserContributionsSelector } from '../../selectors/index';

class EditUserContributionsContainer extends React.Component {
  onSubmit = (mode, registerTreeForm) => {
    registerTreeForm =
      registerTreeForm || this.refs.editTrees.refs.editTreeForm;
    const value = registerTreeForm.getValue();
    const { props } = this;
    if (value) {
      let plantContribution = { plant_contribution: value };
      const treeID = props.editTree(
        plantContribution,
        (props.match && props.match.params.selectedTreeId) ||
          (props.navigation && props.navigation.getParam('selectedTreeId')),
        this.props.navigation
      );
    }
  };

  render() {
    let { props } = this;
    let userContribution = null;
    if (props.match) {
      userContribution = props.userContributions.filter(
        contribution =>
          contribution.id == parseInt(props.match.params.selectedTreeId)
      )[0];
    } else if (props.navigation) {
      userContribution = props.navigation.getParam(
        'contribution',
        userContribution
      );
    }
    return (
      <EditUserContribution
        ref={'editTrees'}
        userContribution={userContribution}
        onSubmit={this.onSubmit}
      />
    );
  }
}

const mapStateToProps = state => ({
  userContributions: sortedUserContributionsSelector(state)
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ editTree }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(
  EditUserContributionsContainer
);

EditUserContributionsContainer.propTypes = {
  userContributions: PropTypes.array.isRequired,
  editTree: PropTypes.func,
  match: PropTypes.shape({
    params: PropTypes.shape({
      selectedTreeId: PropTypes.string
    })
  })
};
