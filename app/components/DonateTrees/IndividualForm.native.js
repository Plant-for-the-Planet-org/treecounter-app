import CardLayout from '../Common/Card/CardLayout';
import t from 'tcomb-form-native';
import React, { Component } from 'react';

import {
  receiptIndividualFormSchema,
  individualSchemaOptions
} from '../../server/parsedSchemas/donateTrees';

let Form = t.form.Form;

export default class IndividualForm extends Component {
  render() {
    return (
      <CardLayout style={{ padding: 10 }}>
        <Form
          ref={'donorDetailsForm'}
          type={receiptIndividualFormSchema}
          options={individualSchemaOptions}
        />
      </CardLayout>
    );
  }
}
