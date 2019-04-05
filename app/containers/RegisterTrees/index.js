import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import RegisterTrees from '../../components/RegisterTrees';
import { registerTree } from '../../actions/registerTree';
import { userTreecounterSelector } from '../../selectors/index';
import { mergeContributionImages } from '../../helpers/utils';
import { currentUserProfileSelector } from '../../selectors/index';
import {
  schemaOptionsSingleTree,
  schemaOptionsMultipleTrees
} from '../../server/parsedSchemas/registerTrees';
import { handleServerResponseError } from '../../helpers/utils';

class RegisterTreesContainer extends Component {
  constructor() {
    super();
    this.state = {
      schemaOptionsSingleTree: schemaOptionsSingleTree,
      schemaOptionsMultipleTrees: schemaOptionsMultipleTrees
    };
  }
  onSubmit = (mode, registerTreeForm) => {
    registerTreeForm =
      registerTreeForm || this.refs.registerTrees.refs.registerTreeForm;
    // console.log(registerTreeForm.validate());
    let value = registerTreeForm.getValue();
    value = mergeContributionImages(value);
    if (value) {
      this.props
        .registerTree(
          value,
          this.props.treecounter.id,
          mode,
          this.props.navigation
        )
        .then(val => val)
        .catch(err => {
          if (mode === 'single-tree') {
            let newSchemaOptions = handleServerResponseError(
              err,
              this.state.schemaOptionsSingleTree
            );
            this.setState(
              {
                schemaOptionsSingleTree: {
                  ...newSchemaOptions
                }
              },
              () => {
                if (registerTreeForm) {
                  registerTreeForm.validate();
                } else {
                  this.refs.registerTrees.refs.registerTreeForm.validate();
                }
              }
            );
          }
          if (mode === 'multiple-trees') {
            let newSchemaOptions = handleServerResponseError(
              err,
              this.state.schemaOptionsMultipleTrees
            );
            this.setState(
              {
                schemaOptionsMultipleTrees: {
                  ...newSchemaOptions
                }
              },
              () => {
                if (registerTreeForm) {
                  registerTreeForm.validate();
                } else {
                  this.refs.registerTrees.refs.registerTreeForm.validate();
                }
              }
            );
          }
        });
    }
  };

  render() {
    return (
      <RegisterTrees
        ref="registerTrees"
        onSubmit={this.onSubmit}
        schemaOptionsSingleTree={this.state.schemaOptionsSingleTree}
        schemaOptionsMultipleTrees={this.state.schemaOptionsMultipleTrees}
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
