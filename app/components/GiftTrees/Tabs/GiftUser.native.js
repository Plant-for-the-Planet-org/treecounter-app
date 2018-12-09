import React, { Component } from 'react';
import { View, Text } from 'react-native';
import SearchLayout from '../../Header/SearchLayout.native';

export default class GiftUser extends Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {}

  _handleChangeQuery = q => {
    getSuggestions(q).then(suggestions => {
      this.setState({ q: suggestions });
      //console.log('suggestions', suggestions);
    });
  };
  _handleSubmit = q => {
    this.props.onSubmit && this.props.onSubmit(q);
  };
  render() {
    return <SearchLayout searchInputUnderlineColorAndroid="#fff" />;
  }
}
