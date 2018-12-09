import React, { Component } from 'react';
import {
  giftInvitationFormSchema,
  giftInvitationSchemaOptions
} from '../../../server/parsedSchemas/giftTrees';
import t from 'tcomb-form-native';
import CardLayout from '../../Common/Card';
import PrimaryButton from '../../Common/Button/PrimaryButton';
let TCombForm = t.form.Form;

export default class GiftEmail extends Component {
  constructor(props) {
    super(props);
    this.setGiftInvitation = element => {
      this.giftInvitation = element;
    };
    this.state = { formValue: null };
    this.onNextClick = this.onNextClick.bind(this);
  }

  componentWillMount() {}

  onNextClick() {
    if (this.giftInvitation.getValue()) {
      this.setState({ formValue: this.giftInvitation.getValue() });
      this.props.openProjects(this.giftInvitation.getValue(), 'invitation');
    }
  }

  render() {
    return (
      <CardLayout>
        <TCombForm
          ref={this.setGiftInvitation}
          type={giftInvitationFormSchema}
          options={giftInvitationSchemaOptions}
          value={this.props.formValue}
        />
        <PrimaryButton onClick={this.onNextClick}>Next</PrimaryButton>
      </CardLayout>
    );
  }
  componentWillUnmount() {
    // console.log('Gift Email Unmounted');
  }
}
