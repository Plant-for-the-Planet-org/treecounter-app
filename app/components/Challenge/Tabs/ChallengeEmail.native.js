import React, { Component } from 'react';
import {
  giftInvitationFormSchema,
  giftInvitationSchemaOptions
} from '../../../server/parsedSchemas/giftTrees';
import t from 'tcomb-form-native';
import CardLayout from '../../Common/Card';
import PrimaryButton from '../../Common/Button/PrimaryButton';
import { TextInput, View, Picker, Text } from 'react-native';
import ChallengeListContainer from '../../../containers/Challenge/challengeList';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CheckBox from 'react-native-check-box';

import challengeStyles from '../../../styles/challenge';
let TCombForm = t.form.Form;

export default class ChallengeEmail extends Component {
  constructor(props) {
    super(props);
    this.setGiftInvitation = element => {
      this.giftInvitation = element;
    };
    this.state = {
      formValue: null,
      treeCount: 1000,
      isChecked: false,
      byYear: 'Year'
    };
    this.onNextClick = this.onNextClick.bind(this);
  }

  componentWillMount() {}

  onNextClick() {
    if (this.giftInvitation.getValue()) {
      console.log('hello');
    }
  }

  handleTreeCountChange(treeCount) {
    if (treeCount === '') {
      treeCount = 0;
    }
    this.setState({
      treeCount: parseInt(treeCount)
    });
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
          <View style={challengeStyles.flexStyle}>
            <Text>Challenge to plant </Text>
            <TextInput
              keyboardType="numeric"
              style={challengeStyles.treecount_input}
              onChangeText={evt => this.handleTreeCountChange(evt)}
              value={String(this.state.treeCount)}
            />
            <Text>Trees</Text>
          </View>
          <CheckBox
            style={{ flex: 1 }}
            onClick={() => {
              this.setState({
                isChecked: !this.state.isChecked
              });
            }}
            isChecked={this.state.isChecked}
            rightText={'by'}
          />
          <Picker
            selectedValue={this.state.byYear}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({
                language: itemValue
              })
            }
          >
            <Picker.Item label="2019" value="2019" />
          </Picker>
          <PrimaryButton onClick={this.onNextClick}>Challenge</PrimaryButton>
        </CardLayout>
        <ChallengeListContainer />
      </KeyboardAwareScrollView>
    );
  }
}
