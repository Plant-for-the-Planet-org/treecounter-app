import React, { Component } from 'react';
import {
  giftInvitationFormSchema,
  giftInvitationSchemaOptions
} from '../../../server/parsedSchemas/giftTrees';
import t from 'tcomb-form-native';
import CardLayout from '../../Common/Card';
import PrimaryButton from '../../Common/Button/PrimaryButton';
import { TextInput, View, Image, Text } from 'react-native';
import ChallengeListContainer from '../../../containers/Challenge/challengeList';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
let TCombForm = t.form.Form;

export default class ChallengeEmail extends Component {
  constructor(props) {
    super(props);
    this.setGiftInvitation = element => {
      this.giftInvitation = element;
    };
    this.state = { formValue: null, giftMessage: '' };
    this.onNextClick = this.onNextClick.bind(this);
  }

  componentWillMount() {}

  onNextClick() {
    if (this.giftInvitation.getValue()) {
      console.log('hello');
    }
  }

  render() {
    console.log('Render of email called');
    return (
      <KeyboardAwareScrollView enableOnAndroid={true}>
        <CardLayout>
          <TCombForm
            ref={this.setGiftInvitation}
            type={giftInvitationFormSchema}
            options={giftInvitationSchemaOptions}
            value={this.state.formValue}
          />
          <PrimaryButton onClick={this.onNextClick}>Challenge</PrimaryButton>
        </CardLayout>
        <ChallengeListContainer />
      </KeyboardAwareScrollView>
    );
  }
}
