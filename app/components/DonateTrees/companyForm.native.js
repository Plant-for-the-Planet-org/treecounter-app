import CardLayout from '../Common/Card/CardLayout';
import t from 'tcomb-form-native';
import React, { Component } from 'react';
import {
  receiptCompanyFormSchema,
  companySchemaOptions
} from '../../server/parsedSchemas/donateTrees';
import { ScrollView } from 'react-native';

let Form = t.form.Form;

import PrimaryButton from '../../components/Common/Button/PrimaryButton';
import i18n from '../../locales/i18n.js';

export default class CompanyForm extends Component {
  onNextClick() {
    let value = this.refs.donateReceipt.getValue();
    if (value) {
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
            type={receiptCompanyFormSchema}
            options={companySchemaOptions}
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
