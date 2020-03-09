import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { debug } from '../../debug';
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

class RegisterTreesContainer extends PureComponent {
  constructor() {
    super();
    this.state = {
      schemaOptionsSingleTree: schemaOptionsSingleTree,
      schemaOptionsMultipleTrees: schemaOptionsMultipleTrees,
      loadSvg: true
    };
  }

  onSubmit = (mode, value, plantProject) => {
    /* registerTreeForm =
      registerTreeForm || this.refs.registerTrees.refs.registerTreeForm;
    let value = registerTreeForm.getValue() || registerTreeForm;*/
    debug('got the form value:register form:', value);

    if (value) {
      value = mergeContributionImages(value);

      if (plantProject) {
        // needs to change an immutable struct
        value = {
          ...value,
          plantProject
        };
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
          console.error(err);
        });
    }
  };

  render() {
    return [
      this.props.navigation ? (
        <NavigationEvents
          onWillFocus={
            (/* payload */) => {
              this.setState({ loadSvg: true });
            }
          }
          onWillBlur={
            (/* payload */) => {
              this.setState({ loadSvg: false });
            }
          }
          key="navigation-events"
        />
      ) : null,
      this.state.loadSvg ? (
        <RegisterTrees
          key="register-tree"
          ref="registerTrees"
          navigation={this.props.navigation}
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterTreesContainer);

RegisterTreesContainer.propTypes = {
  registerTree: PropTypes.func.isRequired,
  treecounter: PropTypes.object,
  navigation: PropTypes.any,
  currentUserProfile: PropTypes.object
};
