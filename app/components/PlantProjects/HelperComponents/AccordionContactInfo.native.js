import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { globe, rocket, tree_outline, outline_email } from '../../../assets';
import styles from '../../../styles/selectplantproject/plant-details.native';
import i18n from '../../../locales/i18n';
import { getLocalRoute } from '../../../actions/apiRouting';
import { getISOToCountryName } from '../../../helpers/utils';
export default class AccordionContactInfo extends Component {
  state = {
    showInfo: false
  };

  toggleInfo = () => {
    this.setState({
      showInfo: !this.state.showInfo
    });
  };
  getAddress(address) {
    let str = [];
    Object.keys(address).forEach((item, value) => {
      try {
        if (item == 'countryCode') {
          value = getISOToCountryName(address[item]).country;
        } else {
          value = address[item];
        }
      } catch (error) {
        console.log(error);
      }
      str.push(value);
    });
    return str.join(', ');
  }

  getMapUrl = address => {
    let fullAdress = this.getAddress(address);
    fullAdress = encodeURIComponent(fullAdress);
    return `https://www.google.com/maps/search/?api=1&query=${fullAdress}`;
  };
  render() {
    const {
      slug,
      updateStaticRoute,
      navigation,
      url,
      _goToURL,
      address,
      email,
      name
    } = this.props;
    let iconName = this.state.showInfo ? 'chevron-up' : 'chevron-down';
    const textColor = '#4d5153';
    return (
      <View style={styles.accordionCardView}>
        <TouchableOpacity
          style={styles.accordionView}
          onPress={() => {
            this.toggleInfo();
          }}
        >
          <Text style={[styles.accordionTitle, { color: textColor }]}>
            {i18n.t('label.contact_details')}
          </Text>
          <Icon
            name={iconName}
            size={14}
            color="#4d5153"
            style={{ marginLeft: 10 }}
          />
        </TouchableOpacity>

        {/* Hidden until expanded by User */}
        {this.state.showInfo ? (
          <View
            style={[
              styles.expandedPaymentModePaypal,
              { alignItems: 'flex-start', paddingRight: 20 }
            ]}
          >
            {slug ? (
              <View style={styles.iconTextRow}>
                <Image source={tree_outline} style={styles.iconImage} />
                <TouchableOpacity
                  onPress={() => {
                    updateStaticRoute(
                      getLocalRoute('app_treecounter'),
                      navigation,
                      { treeCounterId: slug, titleParam: name }
                    );
                  }}
                >
                  <Text style={styles.viewProfileText}>
                    {i18n.t('label.view_profile')}
                  </Text>
                </TouchableOpacity>
              </View>
            ) : null}

            {url ? (
              <View style={styles.iconTextRow}>
                <Image source={globe} style={styles.iconImage} />
                <TouchableOpacity onPress={() => _goToURL(url)}>
                  <Text
                    style={styles.viewProfileText}
                    numberOfLines={2}
                    ellipsizeMode="tail"
                  >
                    {
                      url
                        .replace(/^(?:https?:\/\/)?(?:www\.)?/i, '')
                        .split('/')[0]
                    }
                  </Text>
                </TouchableOpacity>
              </View>
            ) : null}

            {address ? (
              <View style={styles.iconTextRow}>
                <Image source={rocket} style={styles.iconImage} />
                <TouchableOpacity
                  onPress={() => _goToURL(this.getMapUrl(address))}
                >
                  <Text style={styles.viewProfileText}>{address.address},</Text>
                  <Text style={styles.viewProfileText}>{address.city},</Text>
                  <Text style={styles.viewProfileText}>
                    {address.zipCode},{' '}
                    {getISOToCountryName(address.countryCode).country}
                  </Text>
                </TouchableOpacity>
              </View>
            ) : null}
            {email ? (
              <TouchableOpacity
                onPress={() =>
                  Linking.openURL(
                    `mailto:${email}?subject=Re:${name} at Plant-for-the-Planet App`
                  )
                }
                style={styles.iconTextRow}
              >
                <Image source={outline_email} style={styles.iconImage} />
                <Text
                  style={styles.viewProfileText}
                  ellipsizeMode="tail"
                  numberOfLines={2}
                >
                  {email}
                </Text>
              </TouchableOpacity>
            ) : null}
          </View>
        ) : null}
        {/* Hidden until expanded by User */}
      </View>
    );
  }
}
