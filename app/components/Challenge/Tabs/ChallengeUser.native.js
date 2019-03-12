import React, { Component } from 'react';
import { View, TextInput, Image, Text } from 'react-native';
import SearchUser from './SearchUser.native';
import PrimaryButton from '../../Common/Button/PrimaryButton';
import ChallengeListContainer from '../../../containers/Challenge/challengeList';
import CardLayout from '../../Common/Card';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default class ChallengeUser extends Component {
  constructor(props) {
    super(props);
    this.state = { selectedSuggestion: null };
    this.onNextClick = this.onNextClick.bind(this);
    this.onSearchResultClick = this.onSearchResultClick.bind(this);
  }

  onSearchResultClick(suggestion) {
    // console.log('suggestion clicked', suggestion);
    this.setState({ selectedSuggestion: suggestion });
  }

  onNextClick() {
    if (this.state.selectedSuggestion) {
      console.log('hello');
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
          <PrimaryButton onClick={this.onNextClick}>Challenge</PrimaryButton>
        </CardLayout>
        <ChallengeListContainer />
      </View>
    );
  }
}
