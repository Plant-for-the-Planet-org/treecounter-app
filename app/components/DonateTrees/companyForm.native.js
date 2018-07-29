import CardLayout from '../Common/Card/CardLayout';
import t from 'tcomb-form-native';
import React, { Component } from 'react';
import {
  receiptCompanyFormSchema,
  companySchemaOptions
} from '../../server/parsedSchemas/donateTrees';

let Form = t.form.Form;

export default class CompanyForm extends Component {
  render() {
    return (
      <CardLayout>
        <Form
          ref={'donorDetailsForm'}
          type={receiptCompanyFormSchema}
          options={companySchemaOptions}
        />
      </CardLayout>
    );
  }
}
