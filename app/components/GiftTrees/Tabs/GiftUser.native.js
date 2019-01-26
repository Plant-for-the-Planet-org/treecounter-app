import React, { Component } from 'react';
import { View, TextInput, Image, Text } from 'react-native';
import SearchUser from './SearchUser.native';
import PrimaryButton from '../../Common/Button/PrimaryButton';
import CardLayout from '../../Common/Card';
import { iosInformation } from '../../../assets';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default class GiftUser extends Component {
  constructor(props) {
    super(props);
    this.state = { selectedSuggestion: null };
    this.onNextClick = this.onNextClick.bind(this);
    this.onSearchResultClick = this.onSearchResultClick.bind(this);
  }
  componentWillMount() {}
  onSearchResultClick(suggestion) {
    // console.log('suggestion clicked', suggestion);
    this.setState({ selectedSuggestion: suggestion, giftMessage: '' });
  }
  onNextClick() {
    if (this.state.selectedSuggestion) {
      this.props.openProjects(
        this.state.selectedSuggestion,
        'direct',
        this.state.giftMessage
      );
    }
  }
  onChangeText(val) {
    this.setState({ giftMessage: val });
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
          <View style={{ flexDirection: 'row' }}>
            <View style={{ width: 40, height: 40, alignSelf: 'center' }}>
              <Image
                style={{ width: undefined, height: undefined, flex: 1 }}
                source={iosInformation}
              />
            </View>

            <Text
              style={{
                padding: 5,
                color: '#c4bfbf',
                marginRight: 10,
                width: '90%',
                color: '#686060'
              }}
            >
              Select a person for whom you want to donate trees.Trees you then
              donate will appear in recipeint tree-counter as well as your
              own.If Recipeint does not have a tree-counter then s(he) will get
              email notification.
            </Text>
          </View>
        </CardLayout>
        <CardLayout style={{ flex: 0.8 }}>
          <SearchUser
            onSearchResultClick={this.onSearchResultClick}
            currentUserProfile={this.props.currentUserProfile}
          />

          <TextInput
            multiline={true}
            style={{
              height: 100,
              margin: 10,
              padding: 5
            }}
            underlineColorAndroid={'transparent'}
            onChangeText={val => this.onChangeText(val)}
            placeholder={'Gift Message'}
          />
        </CardLayout>

        <View style={{ flex: 0.2 }}>
          <PrimaryButton onClick={this.onNextClick}>Next</PrimaryButton>
        </View>
      </View>
    );
  }
}
