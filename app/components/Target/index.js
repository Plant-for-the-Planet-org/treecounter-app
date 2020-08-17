import React, { Component } from 'react';
import PropTypes from 'prop-types';
import t from 'tcomb-form';

import {
  targetFormSchema,
  schemaOptions
} from '../../server/parsedSchemas/target';

import PrimaryButton from '../Common/Button/PrimaryButton';
import TextHeading from '../Common/Heading/TextHeading';
import CardLayout from '../Common/Card';
import i18n from '../../locales/i18n.js';

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
      label: countTarget !== 0 ? i18n.t('label.update') : i18n.t('label.save'),
      initialValues: { countTarget, targetYear, targetComment }
    };
    this.formRef=React.createRef();
  }
  shouldComponentUpdate(nextProps) {
    return JSON.stringify(nextProps) !== JSON.stringify(this.props);
  }

  render() {
    return (
      <div className="app-container__content--center sidenav-wrapper target_container">
        <TextHeading>{i18n.t('label.set_target')}</TextHeading>
        <CardLayout>
          <TCombForm
            ref={this.formRef}
            type={targetFormSchema}
            options={allSchemaOptions}
            value={this.state.initialValues}
          />
          <PrimaryButton onClick={()=>this.props.onSubmitTarget(this.formRef.current)}>
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
