import React, { Component } from 'react';
import { ScrollView, View, TextInput, Text } from 'react-native';
import SearchUser from './SearchUser.native';
import PrimaryButton from '../../Common/Button/PrimaryButton';
import { delimitNumbers } from '../../../utils/utils';
import ChallengeList from '../challengeList';
import CardLayout from '../../Common/Card';
import { Dropdown } from 'react-native-material-dropdown';
import CheckBox from 'react-native-check-box';
import challengeStyles from '../../../styles/challenge';
import TabContainer from '../../../containers/Menu/TabContainer';

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
    let endYear = currentYear + 10;

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
      treeCount: treeCount ? parseInt(treeCount.replace(/,/, '')) : 0
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
      <View style={{ flex: 1, paddingBottom: 50 }}>
        <ScrollView
          style={{
            flex: 1,
            flexDirection: 'column',
            width: '100%',
            height: '100%'
          }}
        >
          <CardLayout style={[challengeStyles.challengeContainer]}>
            <View style={challengeStyles.challengeColumnContainer}>
              <SearchUser
                onSearchResultClick={this.onSearchResultClick}
                currentUserProfile={this.props.currentUserProfile}
                alreadyInvited={[]}
              />
              <View style={challengeStyles.flexContainerStyle}>
                <Text>Challenge to plant </Text>
                <TextInput
                  keyboardType="numeric"
                  underlineColorAndroid={'transparent'}
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
                    top: 10,
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
        </ScrollView>
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
