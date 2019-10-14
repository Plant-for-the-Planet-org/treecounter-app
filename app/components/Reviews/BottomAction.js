import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { updateStaticRoute } from './../../helpers/routerHelper';
export default class BottomAction extends Component {
  constructor(props) {
    super(props);
    console.log('in con', props);
  }
  render() {
    console.log(this.props.navigation, this.props.review, this.props.close);
    return (
      <View>
        <TouchableOpacity
          onPress={() => {
            this.props.close && this.props.close();
            console.log(this.props.review, this.props.navigation);
            updateStaticRoute('app_add_review', this.props.navigation, {
              review: this.props.review
            });
          }}
        >
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              height: 64,
              paddingLeft: 25
            }}
          >
            <Icon
              name="pen"
              solid
              size={18}
              style={{ color: '#4d5153', marginRight: 20 }}
            />
            <Text
              style={{
                fontFamily: 'OpenSans',
                fontSize: 14,
                fontWeight: 'normal',
                fontStyle: 'normal',
                lineHeight: 19,
                letterSpacing: 0
              }}
            >
              Edit Review
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            this.props.delete();
          }}
        >
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              height: 64,
              paddingLeft: 25
            }}
          >
            <Icon
              name="trash"
              solid
              size={18}
              style={{ color: '#4d5153', marginRight: 20 }}
            />
            <Text
              style={{
                fontFamily: 'OpenSans',
                fontSize: 14,
                fontWeight: 'normal',
                fontStyle: 'normal',
                lineHeight: 19,
                letterSpacing: 0
              }}
            >
              Delete Review
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
