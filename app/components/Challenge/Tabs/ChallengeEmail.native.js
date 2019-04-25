import React, { Component } from 'react';
import {
  challengeFormSchema,
  challengeFormSchemaOptions
} from '../../../server/parsedSchemas/challenge';
import t from 'tcomb-form-native';
import CardLayout from '../../Common/Card';
import PrimaryButton from '../../Common/Button/PrimaryButton';
import { TextInput, View, Text } from 'react-native';
import ChallengeList from '../challengeList';
import { delimitNumbers } from '../../../utils/utils';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Dropdown } from 'react-native-material-dropdown';
import CheckBox from 'react-native-check-box';
import TabContainer from '../../../containers/Menu/TabContainer';

import challengeStyles from '../../../styles/challenge';
let TCombForm = t.form.Form;

export default class ChallengeEmail extends Component {
  constructor(props) {
    super(props);
    this.setChallengeInvitation = element => {
      this.challengeInvitation = element;
    };
    this.state = {
      treeCount: 1000,
      isChecked: false,
      byYear: '',
      tempForm: {}
    };
    let currentYear = new Date().getFullYear(),
      years = [];
    let endYear = currentYear + 10;

    while (currentYear <= endYear) {
      years.push(currentYear++);
    }
    this.years = years.map(item => {
      return { value: item };
    });
    this.onNextClick = this.onNextClick.bind(this);
  }

  onNextClick() {
    if (this.challengeInvitation.getValue()) {
      let value = this.challengeInvitation.getValue();
      requestData = {
        invitee: { ...value }
      };
      if (this.state.isChecked) {
        requestData.endDate = this.state.byYear;
      }
      requestData.challengeMethod = 'invitation';
      requestData.goal = this.state.treeCount;
      this.props.challengeUser(requestData);
    } else {
      this.challengeInvitation.validate();
    }
  }

  onFormChange = value => {
    this.setState({ tempForm: value });
  };

  handleTreeCountChange(treeCount) {
    if (treeCount === '') {
      treeCount = 0;
    }
    this.setState({
      treeCount: treeCount ? parseInt(treeCount.replace(/,/, '')) : 0
    });
  }

  render() {
    return (
      <View style={{ flex: 1, paddingBottom: 50 }}>
        <KeyboardAwareScrollView enableOnAndroid={true}>
          <CardLayout style={[challengeStyles.challengeContainer]}>
            <View style={challengeStyles.challengeColumnContainer}>
              <TCombForm
                ref={this.setChallengeInvitation}
                type={challengeFormSchema}
                options={challengeFormSchemaOptions}
                value={this.state.tempForm}
                onChange={this.onFormChange}
              />
              <View style={challengeStyles.flexContainerStyle}>
                <Text>Challenge to plant </Text>
                <TextInput
                  keyboardType="numeric"
                  style={challengeStyles.treecount_input}
                  onChangeText={evt => this.handleTreeCountChange(evt)}
                  value={delimitNumbers(this.state.treeCount)}
                  autoCapitalize={'sentences'}
                />
                <Text>Trees</Text>
              </View>
              <View style={challengeStyles.flexContainerStyle}>
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
                    top: 0,
                    left: 0
                  }}
                  onChangeText={item =>
                    this.setState({
                      byYear: item
                    })
                  }
                  label="Year"
                  data={this.years}
                />
              </View>
              <PrimaryButton onClick={this.onNextClick}>
                Challenge
              </PrimaryButton>
            </View>
          </CardLayout>
          <ChallengeList
            challenges={this.props.challenges}
            navigation={this.props.navigation}
            challengeStatus={this.props.challengeStatus}
          />
        </KeyboardAwareScrollView>
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            flex: 1,
            width: '100%'
          }}
        >
          <TabContainer {...this.props} />
        </View>
      </View>
    );
  }
}
