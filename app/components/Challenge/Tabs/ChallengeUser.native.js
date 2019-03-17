import React, { Component } from 'react';
import { View, TextInput, Image, Text } from 'react-native';
import SearchUser from './SearchUser.native';
import PrimaryButton from '../../Common/Button/PrimaryButton';
import ChallengeList from '../challengeList';
import CardLayout from '../../Common/Card';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Dropdown } from 'react-native-material-dropdown';
import CheckBox from 'react-native-check-box';

export default class ChallengeUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedSuggestion: null,
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
    this.onSearchResultClick = this.onSearchResultClick.bind(this);
  }

  onSearchResultClick(suggestion) {
    this.setState({ selectedSuggestion: suggestion });
  }

  handleTreeCountChange(treeCount) {
    if (treeCount === '') {
      treeCount = 0;
    }
    this.setState({
      treeCount: parseInt(treeCount)
    });
  }

  onNextClick() {
    if (this.state.selectedSuggestion) {
      let requestData;
      requestData = {
        challenged: this.state.selectedSuggestion.id
      };
      if (this.state.isChecked) {
        requestData.endDate = this.state.byYear;
      }
      requestData.challengeMethod = 'direct';
      requestData.goal = this.state.treeCount;
      this.props.challengeUser(requestData);
    }
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          width: '100%',
          height: '100%'
        }}
      >
        <CardLayout>
          <SearchUser
            onSearchResultClick={this.onSearchResultClick}
            currentUserProfile={this.props.currentUserProfile}
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
        <ChallengeList
          challenges={this.props.challenges}
          navigation={this.props.navigation}
          challengeStatus={this.props.challengeStatus}
        />
      </View>
    );
  }
}
