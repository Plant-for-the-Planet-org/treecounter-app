import React, { Component } from 'react';
import PropTypes from 'prop-types';
import t from 'tcomb-form';

import {
  targetFormSchema,
  schemaOptions
} from '../../server/parsedSchemas/target';

import PrimaryButton from '../Common/Button/PrimaryButton';
import TextHeading from '../Common/Text/TextHeading';
import CardLayout from '../Common/Card/CardLayout';

let TCombForm = t.form.Form;

const formLayout = locals => {
  return (
    <div className="target-form">
      <div className="row">
        <div className="half">{locals.inputs.countTarget}</div>
        <div className="half">{locals.inputs.targetYear}</div>
      </div>
      <div className="textarea">{locals.inputs.targetComment}</div>
    </div>
  );
};

const allSchemaOptions = {
  template: formLayout,
  ...schemaOptions
};

export default class Target extends Component {
  constructor(props) {
    super(props);

    let { countTarget, targetYear, targetComment } = this.props.treecounter;

    this.state = {
      label: countTarget !== 0 ? 'Update' : 'Set',
      initialValues: { countTarget, targetYear, targetComment }
    };
  }

  render() {
    return (
      <div className="app-container__content--center">
        <TextHeading>Set Target</TextHeading>
        <CardLayout>
          <TCombForm
            ref="setTargetForm"
            type={targetFormSchema}
            options={allSchemaOptions}
            value={this.state.initialValues}
          />
          <PrimaryButton onClick={this.props.onSubmitTarget}>
            {this.state.label}
          </PrimaryButton>
        </CardLayout>
      </div>
    );
  }
}

Target.propTypes = {
  treecounter: PropTypes.object.isRequired,
  onSubmitTarget: PropTypes.func.isRequired
};
