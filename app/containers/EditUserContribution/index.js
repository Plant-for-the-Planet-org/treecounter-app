/* eslint-disable no-underscore-dangle */
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { editTree } from '../../actions/EditMyTree';
import EditUserContribution from '../../components/EditUserContribution';
import {
  mergeContributionImages,
  isTpo
} from '../../helpers/utils';
// Actions
import {
  currentUserProfileSelector,
  sortedUserContributionsSelector
} from '../../selectors/index';

class EditUserContributionsContainer extends React.Component {
  _userContribution = null;

  onSubmit = (mode, value, plantProject) => {
    //debug('OnSubmit====>', registerTreeForm);
    /*registerTreeForm =
      registerTreeForm || this.refs.editTrees.refs.editTreeForm;
    let value = registerTreeForm.getValue();*/
    const { props } = this;
    if (value) {
      value = mergeContributionImages(value);

      if (isTpo(this.props.currentUserProfile)) {
        if (plantProject) {
          // needs to change an immutable struct
          value = {
            ...value,
            plantProject
          };
        }
      }

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
        currentUserProfile={this.props.currentUserProfile}
        isEdit
        onSubmit={this.onSubmit}
      />
    );
  }
}

const mapStateToProps = state => ({
  userContributions: sortedUserContributionsSelector(state),
  currentUserProfile: currentUserProfileSelector(state)
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ editTree }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditUserContributionsContainer);

EditUserContributionsContainer.propTypes = {
  userContributions: PropTypes.array.isRequired,
  currentUserProfile: PropTypes.object,
  editTree: PropTypes.func,
  navigation: PropTypes.any,
  match: PropTypes.shape({
    params: PropTypes.shape({
      selectedTreeId: PropTypes.string
    })
  })
};
