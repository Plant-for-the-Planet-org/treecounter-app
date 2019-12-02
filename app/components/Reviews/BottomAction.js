import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { updateStaticRoute } from './../../helpers/routerHelper';
import i18n from '../../locales/i18n.js';
export default class BottomAction extends Component {
  constructor(props) {
    super(props);
    console.log('in con', props);
  }
  render() {
    console.log('got props review:', this.props.review, this.props.close);
    return (
      <View>
        <TouchableOpacity
          onPress={() => {
            this.props.close();
            console.log(
              'got review props in bottom action:',
              this.props.review,
              this.props.navigation
            );
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
                fontSize: 14,
                fontWeight: 'normal',
                fontStyle: 'normal',
                lineHeight: 19,
                letterSpacing: 0
              }}
            >
              {i18n.t('label.edit_review')}
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={async () => {
            console.log('deleting', this.props.review.id);
            this.props.close();
            await this.props.delete(this.props.review.id);
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
                fontSize: 14,
                fontWeight: 'normal',
                fontStyle: 'normal',
                lineHeight: 19,
                letterSpacing: 0
              }}
            >
              {i18n.t('label.delete_review')}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
