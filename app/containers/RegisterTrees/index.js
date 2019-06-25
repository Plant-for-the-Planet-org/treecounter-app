import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import RegisterTrees from '../../components/RegisterTrees';
import { registerTree } from '../../actions/registerTree';
import { userTreecounterSelector } from '../../selectors/index';
import { mergeContributionImages } from '../../helpers/utils';
import { currentUserProfileSelector } from '../../selectors/index';
import NavigationEvents from './importNavigationEvents';

import {
  schemaOptionsSingleTree,
  schemaOptionsMultipleTrees
} from '../../server/parsedSchemas/registerTrees';
import { handleServerResponseError } from '../../helpers/utils';

class RegisterTreesContainer extends PureComponent {
  constructor() {
    super();
    this.state = {
      schemaOptionsSingleTree: schemaOptionsSingleTree,
      schemaOptionsMultipleTrees: schemaOptionsMultipleTrees,
      loadSvg: true
    };
  }

  onSubmit = (mode, registerTreeForm, plantProject) => {
    registerTreeForm =
      registerTreeForm || this.refs.registerTrees.refs.registerTreeForm;
    // console.log(registerTreeForm.validate());
    let value = registerTreeForm.getValue();

    if (value) {
      value = Object.assign({}, value);
      value = mergeContributionImages(value);
      if (plantProject) {
        value.plantProject = plantProject;
      }
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
    return [
      this.props.navigation ? (
        <NavigationEvents
          onWillFocus={payload => {
            this.setState({ loadSvg: true });
          }}
          onWillBlur={payload => {
            this.setState({ loadSvg: false });
          }}
          key="navigation-events"
        />
      ) : null,
      this.state.loadSvg ? (
        <RegisterTrees
          key="register-tree"
          ref="registerTrees"
          onSubmit={this.onSubmit}
          schemaOptionsSingleTree={this.state.schemaOptionsSingleTree}
          schemaOptionsMultipleTrees={this.state.schemaOptionsMultipleTrees}
          currentUserProfile={this.props.currentUserProfile}
        />
      ) : null
    ];
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
