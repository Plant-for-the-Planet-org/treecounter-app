import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import styles from '../../../styles/donation/donation.native';
import i18n from '../../../locales/i18n';
export default class ReadMore extends Component {
  state = {
    showInfo: false
  };

  toggleInfo = () => {
    this.setState({
      showInfo: !this.state.showInfo
    });
  };

  render() {
    const { descriptionText, style } = this.props;
    let iconName = this.state.showInfo ? 'chevron-up' : 'chevron-down';
    return (
      <View style={{ marginTop: 10, paddingLeft: 10 }}>
        {
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              paddingBottom: this.state.showInfo ? 10 : 0
            }}
            onPress={() => {
              this.toggleInfo();
            }}
          >
            <Icon
              name={iconName}
              size={16}
              color="#4d5153"
              style={{ marginRight: 10, paddingTop: 2 }}
            />
            <Text style={[styles.paymentModeTitle, { color: '#4d5153' }]}>
              {!this.state.showInfo
                ? i18n.t('label.read_more')
                : i18n.t('label.read_less')}
            </Text>
          </TouchableOpacity>
        }

        {this.state.showInfo ? (
          descriptionText ? (
            <Text style={[style, { marginTop: -5 }]}>{descriptionText}</Text>
          ) : null
        ) : null}
      </View>
    );
  }
}
