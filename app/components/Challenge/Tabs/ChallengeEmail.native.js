import React, { Component } from 'react';
import {
  giftInvitationFormSchema,
  giftInvitationSchemaOptions
} from '../../../server/parsedSchemas/giftTrees';
import t from 'tcomb-form-native';
import CardLayout from '../../Common/Card';
import PrimaryButton from '../../Common/Button/PrimaryButton';
import { TextInput, View, Text } from 'react-native';
import ChallengeListContainer from '../../../containers/Challenge/challengeList';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Dropdown } from 'react-native-material-dropdown';
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
      byYear: ''
    };
    let currentYear = new Date().getFullYear(),
      years = [];
    let endYear = currentYear + 20;

    while (currentYear <= endYear) {
      years.push(currentYear++);
    }
    this.years = years.map(item => {
      return { value: item };
    });
    this.onNextClick = this.onNextClick.bind(this);
  }

  onNextClick() {
    if (this.giftInvitation.getValue()) {
      let value = this.giftInvitation.getValue();
      requestData = {
        ...this.state.form,
        ...value
      };
      if (!this.state.isChecked) {
        requestData.endDate = 'indefinite';
      } else {
        requestData.endDate = this.state.byYear;
      }
      console.log(requestData);

      this.props.challengeUser(requestData);
    } else {
      this.giftInvitation.validate();
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
              value={this.state.treeCount.toLocaleString()}
            />
            <Text>Trees</Text>
          </View>
          <View style={challengeStyles.flexStyle}>
            <CheckBox
              onClick={() => {
                this.setState({
                  isChecked: !this.state.isChecked
                });
              }}
              style={{
                width: 70
              }}
              isChecked={this.state.isChecked}
              rightText={'by'}
            />
            <Dropdown
              containerStyle={{
                width: 70
              }}
              dropdownOffset={{
                top: 0
              }}
              selectedItem={item =>
                this.setState({
                  byYear: item
                })
              }
              label="Year"
              data={this.years}
            />
          </View>
          <PrimaryButton onClick={this.onNextClick}>Challenge</PrimaryButton>
        </CardLayout>
        <ChallengeListContainer />
      </KeyboardAwareScrollView>
    );
  }
}
