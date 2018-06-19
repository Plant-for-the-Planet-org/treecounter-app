import React, { Component } from 'react';
import t from 'tcomb-form';
import CardLayout from '../Common/Card/CardLayout';
import ContentHeader from '../Common/ContentHeader';
import PrimaryButton from '../Common/Button/PrimaryButton';
import TextSpan from '../Common/Text/TextBlock';

import {
  pledgeFormSchema,
  pledgeSchemaOptions
} from '../../server/parsedSchemas/pledge';

let TCombForm = t.form.Form;

const formLayout = locals => {
  return (
    <div className="pledge-form-layout">
      <div className="row">
        <div className="half">{locals.inputs.firstname}</div>
        <div className="half">{locals.inputs.lastname}</div>
      </div>
      <div>{locals.inputs.email}</div>
      <div className="tree-count">{locals.inputs.treeCount}</div>
    </div>
  );
};

const allSchemaOptions = {
  template: formLayout,
  ...pledgeSchemaOptions
};

export default class Pledge extends Component {
  render() {
    return (
      <div className="sidenav-wrapper app-container__content--center">
        <CardLayout>Hello</CardLayout>
        <CardLayout className="pledge-form">
          <ContentHeader caption={'Pledge Trees'} />
          <TCombForm
            ref="pledgeForm"
            type={pledgeFormSchema}
            options={allSchemaOptions}
          />
          <PrimaryButton>Pledge</PrimaryButton>
          <TextSpan>
            After pledging, you will receive an email that tells you how to
            donate the trees pledged. One tree costs € 1.
          </TextSpan>
        </CardLayout>
      </div>
    );
  }
}
