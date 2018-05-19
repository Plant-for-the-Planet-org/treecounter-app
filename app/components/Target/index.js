import React, { Component } from 'react';
import LiForm from 'liform-react';
import PropTypes from 'prop-types';

import targetFormSchema from '../../server/formSchemas/target';
import CustomForm from '../Common/CustomForm';

export default class Target extends Component {
  constructor(props) {
    super(props);

    let {
      count_target: countTarget,
      target_year: targetYear,
      target_comment: targetComment
    } = this.props.treecounter;

    this.state = {
      label: countTarget !== 0 ? 'Update' : 'Set',
      initialValues: { countTarget, targetYear, targetComment }
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
            this.props.onSubmitTarget(treecounterData, treecounter.id)
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

Target.propTypes = {
  treecounter: PropTypes.object.isRequired,
  onSubmitTarget: PropTypes.func.isRequired
};
