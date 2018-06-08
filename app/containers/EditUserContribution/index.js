import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { editTree } from '../../actions/EditMyTree';
import EditUserContribution from '../../components/EditUserContribution';

// Actions
import { sortedUserContributionsSelector } from '../../selectors/index';

class EditUserContributionsContainer extends React.Component {
  onSubmit = () => {
    let value = this.refs.editTrees.refs.editTreeForm.getValue();
    if (value) {
      let plantContribution = { plant_contribution: value };
      this.props.editTree(
        plantContribution,
        this.props.match.params.selectedTreeId
      );
    }
  };

  render() {
    let { props } = this;
    let userContribution = props.userContributions.filter(
      contribution =>
        contribution.id == parseInt(props.match.params.selectedTreeId)
    )[0];
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
  }).isRequired
};
