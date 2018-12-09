import React, { Component } from 'react';
import { View, TextInput } from 'react-native';
import SearchUser from './SearchUser.native';
import PrimaryButton from '../../Common/Button/PrimaryButton';

export default class GiftUser extends Component {
  constructor(props) {
    super(props);
    this.state = { selectedSuggestion: null };
    this.onNextClick = this.onNextClick.bind(this);
    this.onSearchResultClick = this.onSearchResultClick.bind(this);
  }
  componentWillMount() {}
  onSearchResultClick(suggestion) {
    console.log('suggestion clicked', suggestion);
    this.setState({ selectedSuggestion: suggestion });
  }
  onNextClick() {
    if (this.state.selectedSuggestion) {
      this.props.openProjects(this.state.selectedSuggestion, 'userType');
    }
  }
  render() {
    return (
      <View style={{ flex: 1, flexDirection: 'column' }}>
        <View style={{ flex: 0.8 }}>
          <SearchUser onSearchResultClick={this.onSearchResultClick} />
        </View>

        <View style={{ flex: 0.2 }}>
          <PrimaryButton onClick={this.onNextClick}>Next</PrimaryButton>
        </View>
      </View>
    );
  }
}
