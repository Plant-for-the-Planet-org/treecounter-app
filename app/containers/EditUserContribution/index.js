import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { editTree } from '../../actions/EditMyTree';
import EditUserContribution from '../../components/EditUserContribution';
import { mergeContributionImages } from '../../helpers/utils';
// Actions
import { sortedUserContributionsSelector } from '../../selectors/index';

class EditUserContributionsContainer extends React.Component {
  _userContribution = null;
  onSubmit = (mode, registerTreeForm) => {
    registerTreeForm =
      registerTreeForm || this.refs.editTrees.refs.editTreeForm;
    let value = registerTreeForm.getValue();
    const { props } = this;
    if (value) {
      value = mergeContributionImages(value);
      let plantContribution = { plant_contribution: value };
      props.editTree(
        plantContribution,
        (props.match && props.match.params.selectedTreeId) ||
          (props.navigation && props.navigation.getParam('selectedTreeId')),
        this.props.navigation
      );
    }
  };

  render() {
    let { props } = this;

    if (props.match) {
      this._userContribution = props.userContributions.filter(
        contribution =>
          contribution.id == parseInt(props.match.params.selectedTreeId)
      )[0];
    } else if (props.navigation) {
      this._userContribution = props.navigation.getParam(
        'contribution',
        this._userContribution
      );
    }
    return (
      <EditUserContribution
        ref={'editTrees'}
        userContribution={this._userContribution}
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
  navigation: PropTypes.any,
  match: PropTypes.shape({
    params: PropTypes.shape({
      selectedTreeId: PropTypes.string
    })
  })
};
