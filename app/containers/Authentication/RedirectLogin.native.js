import React, { Component } from 'react';
import { View, TouchableOpacity, Text, Image } from 'react-native';
import { updateRoute } from '../../helpers/routerHelper';
import { treelogo } from './../../assets';
export default class RedirectLogin extends Component {
  componentDidMount() {
    updateRoute('app_login', this.props.navigation);
  }
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Image source={treelogo} style={{ height: 120, width: 120 }} />
          <Text style={{ marginTop: 24, fontFamily: 'OpenSans-Regular' }}>
            Please login to visit this page
          </Text>
          <TouchableOpacity
            style={{
              backgroundColor: '#89ba43',
              paddingHorizontal: 36,
              marginTop: 24,
              paddingVertical: 12,
              borderRadius: 24
            }}
            onPress={() => updateRoute('app_login', this.props.navigation)}
          >
            <Text style={{ color: '#fff', fontFamily: 'OpenSans-SemiBold' }}>
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
