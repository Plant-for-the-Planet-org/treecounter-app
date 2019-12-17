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
    console.log('Description:', descriptionText);
    let iconName = this.state.showInfo ? 'chevron-up' : 'chevron-down';
    return (
      <View style={{ marginTop: 15 }}>
        {!this.state.showInfo ? (
          <TouchableOpacity
            style={{ flexDirection: 'row' }}
            onPress={() => {
              this.toggleInfo();
            }}
          >
            <Icon
              name={iconName}
              size={14}
              color="rgba(0, 0, 0, 0.38)"
              style={{ marginRight: 10 }}
            />
            <Text style={styles.paymentModeTitle}>
              {i18n.t('label.read_more')}
            </Text>
          </TouchableOpacity>
        ) : null}

        {this.state.showInfo ? (
          descriptionText ? (
            <Text style={style}>{descriptionText}</Text>
          ) : null
        ) : null}
      </View>
    );
  }
}
