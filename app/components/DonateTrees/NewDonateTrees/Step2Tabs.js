import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Picker,
  Platform
} from 'react-native';
import styles from './../../../styles/donation/donation.native';
import i18n from '../../../locales/i18n';
import { TextField } from 'react-native-material-textfield';
import RNPickerSelect from 'react-native-picker-select';
import CheckBox from 'react-native-check-box';

export default class Step2Tabs extends Component {
  state = {
    index: 0,
    tabselected: 'individual',
    firstname: '',
    lastname: '',
    address1: '',
    city: '',
    zipcode: '',
    email: '',
    country: ''
  };

  onTabChangeToIndividual = () => {
    this.setState({
      tabselected: 'individual'
    });
  };

  onTabChangeToCompany = () => {
    this.setState({
      tabselected: 'company'
    });
  };
  render() {
    let { firstname, lastname, address1, city, zipcode, email } = this.state;

    const individual = (
      <View style={{ padding: 20, paddingTop: 0 }}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <View style={{ width: '45%' }}>
            <TextField
              label={i18n.t('First Name')}
              value={firstname}
              tintColor={'#89b53a'}
              titleFontSize={12}
              returnKeyType="next"
              lineWidth={1}
              blurOnSubmit={false}
              onChangeText={firstname => this.setState({ firstname })}
            />
          </View>

          <View style={{ width: '45%' }}>
            <TextField
              label={i18n.t('Last Name')}
              value={lastname}
              tintColor={'#89b53a'}
              titleFontSize={12}
              returnKeyType="next"
              lineWidth={1}
              onChangeText={lastname => this.setState({ lastname })}
            />
          </View>
        </View>

        <View>
          <TextField
            label={i18n.t('Address Line 1')}
            value={address1}
            tintColor={'#89b53a'}
            titleFontSize={12}
            lineWidth={1}
            returnKeyType="next"
            onChangeText={address1 => this.setState({ address1 })}
          />
        </View>

        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <View style={{ width: '45%' }}>
            <TextField
              label={i18n.t('City')}
              value={city}
              tintColor={'#89b53a'}
              titleFontSize={12}
              returnKeyType="next"
              lineWidth={1}
              blurOnSubmit={false}
              onChangeText={city => this.setState({ city })}
            />
          </View>

          <View style={{ width: '45%' }}>
            <TextField
              label={i18n.t('Zip Code')}
              value={zipcode}
              tintColor={'#89b53a'}
              titleFontSize={12}
              returnKeyType="next"
              lineWidth={1}
              keyboardType={'number-pad'}
              onChangeText={zipcode => this.setState({ zipcode })}
            />
          </View>
        </View>

        <View
          style={{
            borderBottomWidth: 2,
            borderBottomColor: '#d5d5d5',
            marginTop: 18,
            paddingBottom: Platform.OS === 'ios' ? 8 : 0
          }}
        >
          <RNPickerSelect
            onValueChange={value => console.log(value)}
            items={[
              { label: 'Germany', value: '1' },
              { label: 'India', value: '2' },
              { label: 'China', value: '3' },
              { label: 'USA', value: '4' },
              { label: 'Pakistan', value: '5' },
              { label: 'France', value: '6' },
              { label: 'Sweden', value: '7' }
            ]}
            placeholder={{}}
          />
        </View>

        <View>
          <TextField
            label={i18n.t('Email Address')}
            value={email}
            tintColor={'#89b53a'}
            titleFontSize={12}
            lineWidth={1}
            returnKeyType="next"
            onChangeText={email => this.setState({ email })}
          />
        </View>
        <CheckBox
          style={{ flex: 1, marginTop: 20 }}
          onClick={() => {
            this.setState({
              isChecked: !this.state.isChecked
            });
          }}
          rightText={'Share my details with Project name by TPO Name.'}
          rightTextStyle={styles.checkBoxText}
          isChecked={this.state.isChecked}
          checkBoxColor={'#89b53a'}
        />
      </View>
    );

    const company = (
      <View>
        <View style={{ padding: 20, paddingBottom: 0 }}>
          <TextField
            label={i18n.t('Name of Company or Organization')}
            value={email}
            tintColor={'#89b53a'}
            titleFontSize={12}
            lineWidth={1}
            returnKeyType="next"
            onChangeText={email => this.setState({ email })}
          />
        </View>
        {individual}
      </View>
    );

    return (
      <ScrollView>
        <View style={styles.tabViewButtonContainer}>
          <TouchableOpacity
            style={{ marginRight: 24 }}
            onPress={this.onTabChangeToIndividual}
          >
            <Text
              style={[
                styles.tabViewButtonText,
                this.state.tabselected === 'individual'
                  ? styles.selectedTabButtonText
                  : null
              ]}
            >
              Individual
            </Text>
            <View
              style={
                this.state.tabselected === 'individual'
                  ? styles.selectedTabButtonView
                  : null
              }
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={this.onTabChangeToCompany}>
            <Text
              style={[
                styles.tabViewButtonText,
                this.state.tabselected === 'company'
                  ? styles.selectedTabButtonText
                  : null
              ]}
            >
              Company
            </Text>
            <View
              style={
                this.state.tabselected === 'company'
                  ? styles.selectedTabButtonView
                  : null
              }
            />
          </TouchableOpacity>
        </View>

        {/* Biggest Pledges */}
        <View>
          {this.state.tabselected === 'company' ? company : individual}
        </View>
      </ScrollView>
    );
  }
}
