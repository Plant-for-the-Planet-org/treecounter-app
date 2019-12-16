import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { globe, rocket, tree_outline, outline_email } from '../../../assets';
import styles from './../../../styles/donation/donation.native';
import i18n from './../../../locales/i18n';

export default class Accordion extends Component {
  state = {
    showInfo: true,
    showPay: true,
    allValid: false
  };

  togglePaypalInfo = () => {
    this.setState({
      showInfo: !this.state.showInfo
    });
  };

  render() {
    const {
      slug,
      updateStaticRoute,
      navigation,
      url,
      _goToURL,
      address,
      email
    } = this.props;
    return (
      <View style={styles.paymentCardView}>
        <TouchableOpacity
          style={styles.paymentModeView}
          onPress={() => {
            this.togglePaypalInfo();
          }}
        >
          <Text style={styles.paymentModeTitle}>
            {i18n.t('label.contact_details')}
          </Text>

          {this.state.showInfo ? (
            <Icon
              name="chevron-up"
              size={14}
              color="rgba(0, 0, 0, 0.38)"
              style={{ marginLeft: 10 }}
            />
          ) : (
            <Icon
              name="chevron-down"
              size={14}
              color="rgba(0, 0, 0, 0.38)"
              style={{ marginLeft: 10 }}
            />
          )}
        </TouchableOpacity>

        {/* Hidden until expanded by User */}
        {this.state.showInfo ? (
          <View
            style={[
              styles.expandedPaymentModePaypal,
              { alignItems: 'flex-start' }
            ]}
          >
            {slug ? (
              <View style={{ flexDirection: 'row' }}>
                <Image
                  source={tree_outline}
                  style={{
                    width: 17,
                    height: 17,
                    marginRight: 10
                  }}
                />
                <TouchableOpacity
                  onPress={() => {
                    updateStaticRoute(`/t/${slug}`, navigation);
                  }}
                >
                  <Text style={styles.viewProfileText}>
                    {i18n.t('label.view_profile')}
                  </Text>
                </TouchableOpacity>
              </View>
            ) : null}

            {url ? (
              <View style={{ flexDirection: 'row', marginTop: 10 }}>
                <Image
                  source={globe}
                  style={{
                    width: 17,
                    height: 17,
                    marginRight: 10
                  }}
                />
                <TouchableOpacity onPress={() => _goToURL(url)}>
                  <Text
                    style={styles.viewProfileText}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    {url}
                  </Text>
                </TouchableOpacity>
              </View>
            ) : null}

            {address ? (
              <View style={{ flexDirection: 'row', marginTop: 10 }}>
                <Image
                  source={rocket}
                  style={{
                    width: 17,
                    height: 17,
                    marginRight: 10
                  }}
                />
                <Text style={styles.viewProfileText}>{address}</Text>
              </View>
            ) : null}
            {email ? (
              <View style={{ flexDirection: 'row', marginTop: 10 }}>
                <Image
                  source={outline_email}
                  style={{
                    width: 17,
                    height: 17,
                    marginRight: 10
                  }}
                />
                <Text style={styles.viewProfileText}>{email}</Text>
              </View>
            ) : null}
          </View>
        ) : null}
        {/* Hidden until expanded by User */}
      </View>
    );
  }
}
