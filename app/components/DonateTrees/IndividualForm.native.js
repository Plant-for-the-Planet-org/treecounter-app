import CardLayout from '../Common/Card';
import t from 'tcomb-form-native';
import React, { Component } from 'react';
import { ScrollView } from 'react-native';

import {
  receiptIndividualFormSchema,
  individualSchemaOptions
} from '../../server/parsedSchemas/donateTrees';

import PrimaryButton from '../../components/Common/Button/PrimaryButton';
import i18n from '../../locales/i18n.js';

let Form = t.form.Form;

export default class IndividualForm extends Component {
  onNextClick() {
    let value = this.refs.donateReceipt.getValue();
    let receipt = {};
    if (value) {
      receipt['receiptIndividual'] = value;
      this.props.goToNextTab(value);
    } else {
      this.props.goToNextTab(null);
    }
  }
  render() {
    return (
      <ScrollView>
        <CardLayout style={{ padding: 10 }}>
          <Form
            ref="donateReceipt"
            type={receiptIndividualFormSchema}
            options={individualSchemaOptions}
          />
          {this.props.showNextButton ? (
            <PrimaryButton onClick={() => this.onNextClick()}>
              {i18n.t('label.next')}
            </PrimaryButton>
          ) : null}
        </CardLayout>
      </ScrollView>
    );
  }
}
