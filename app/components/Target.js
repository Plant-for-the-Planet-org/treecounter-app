import React, { Component } from 'react';
import LiForm from 'liform-react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import targetFormSchema from '../server/formSchemas/target';
import CustomForm from './Common/CustomForm';
import { SubmitTarget } from '../actions/targetAction';
import { userTreecounterSelector } from '../selectors/index';

class TargetPage extends Component {
  constructor(props) {
    super(props);

    let { treecounter } = this.props;
    let { count_target, target_year, target_comment } = treecounter;
    this.state = {
      label: treecounter.countTarget !== 0 ? 'Update' : 'Set',
      initialValues: { count_target, target_year, target_comment }
    };
  }

  render() {
    const { treecounter } = this.props;
    return (
      <div>
        <LiForm
          schema={targetFormSchema}
          initialValues={this.state.initialValues}
          onSubmit={treecounterData =>
            this.props.SubmitTarget(treecounterData, treecounter.id)
          }
          baseForm={CustomForm}
          headline=""
          buttonText={this.state.label}
          buttonWidth="240"
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  treecounter: userTreecounterSelector(state)
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ SubmitTarget }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(TargetPage);

TargetPage.propTypes = {
  treecounter: PropTypes.object.isRequired,
  dispatch: PropTypes.func,
  SubmitTarget: PropTypes.func.isRequired
};
