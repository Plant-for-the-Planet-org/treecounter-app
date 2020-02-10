import React, { Component } from 'react';
import { View } from 'react-native';
import { updateRoute } from '../../helpers/routerHelper';

export default class RedirectLogin extends Component {
  componentDidMount() {
    updateRoute('app_login', this.props.navigation);
  }
  render() {
    return <View />;
  }
}
