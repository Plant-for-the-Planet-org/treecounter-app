import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import RegisterTrees from '../../components/RegisterTrees/index';
import { registerTree } from '../../actions/registerTree';
import { userTreecounterSelector } from '../../selectors/index';

class RegisterTreesContainer extends Component {
  constructor() {
    super();
  }

  onSubmit = mode => {
    console.log(this.refs.registerTrees.refs.registerTreeForm.validate());
    let value = this.refs.registerTrees.refs.registerTreeForm.getValue();
    if (value) {
      this.props.registerTree(value, this.props.treecounter.id, mode);
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
  treecounter: PropTypes.object
};
