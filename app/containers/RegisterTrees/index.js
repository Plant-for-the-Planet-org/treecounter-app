import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import RegisterTrees from '../../components/RegisterTrees';
import { registerTree } from '../../actions/registerTree';
import { userTreecounterSelector } from '../../selectors/index';

class RegisterTreesContainer extends Component {
  _mergeContributionImages(updatedTreeContribution) {
    if (
      !updatedTreeContribution.contributionImages ||
      updatedTreeContribution.contributionImages.length == 0
    ) {
      return updatedTreeContribution;
    }
    const newContributionImages = updatedTreeContribution.contributionImages;
    let contributionImages = [];
    contributionImages = newContributionImages.map(newContributionImage => {
      if (newContributionImage.image.includes('base64')) {
        let { image: imageFile } = newContributionImage;

        return newContributionImage.id
          ? { imageFile, id: newContributionImage.id }
          : { imageFile };
      }
      return newContributionImage;
    });
    return {
      ...updatedTreeContribution,
      contributionImages
    };
  }

  constructor() {
    super();
  }

  onSubmit = (mode, registerTreeForm) => {
    registerTreeForm =
      registerTreeForm || this.refs.registerTrees.refs.registerTreeForm;
    console.log(registerTreeForm.validate());
    let value = registerTreeForm.getValue();
    value = this._mergeContributionImages(value);
    if (value) {
      this.props.registerTree(
        value,
        this.props.treecounter.id,
        mode,
        this.props.navigation
      );
    }
  };

  render() {
    return <RegisterTrees ref="registerTrees" onSubmit={this.onSubmit} />;
  }
}

const mapStateToProps = state => {
  return {
    treecounter: userTreecounterSelector(state)
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
  navigation: PropTypes.object
};
