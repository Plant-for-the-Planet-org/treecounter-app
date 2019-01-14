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
  singleTreeRegisterFormSchema,
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

  updateTemplateSingle(template, plantProjects) {
    this.state.schemaOptionsSingleTree.fields.plantProject.template = getSelectTemplate(
      plantProjects
    );
    this.setState({
      schemaOptionsSingleTree: {
        template,
        ...schemaOptionsSingleTree
      }
    });
  }

  updateTemplateMultiple(template, plantProjects) {
    this.state.schemaOptionsMultipleTrees.fields.plantProject.template = getSelectTemplate(
      plantProjects
    );
    this.setState({
      schemaOptionsMultipleTrees: {
        template,
        ...schemaOptionsMultipleTrees
      }
    });
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
                this.refs.registerTrees.refs.registerTreeForm.validate();
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
                this.refs.registerTrees.refs.registerTreeForm.validate();
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
        updateTemplateSingle={this.updateTemplateSingle}
        updateTemplateMultiple={this.updateTemplateMultiple}
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
