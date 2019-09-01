import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Picker
} from 'react-native';
import styles from './../../../styles/pledgeevents/pledgeevents.native';
import i18n from '../../../locales/i18n';
import { TextField } from 'react-native-material-textfield';

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
      <View style={{ padding: 20 }}>
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
              label={i18n.t('FIRST NAME')}
              value={firstname}
              tintColor={'#89b53a'}
              titleFontSize={12}
              returnKeyType="next"
              lineWidth={1}
              blurOnSubmit={false}
              onChangeText={firstname => this.setState({ firstname })}
              containerStyle={{ marginTop: 5 }}
            />
          </View>

          <View style={{ width: '45%' }}>
            <TextField
              label={i18n.t('LAST NAME')}
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
            label={i18n.t('ADDRESS LINE 1')}
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
              label={i18n.t('CITY')}
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
              label={i18n.t('ZIP CODE')}
              value={zipcode}
              tintColor={'#89b53a'}
              titleFontSize={12}
              returnKeyType="next"
              lineWidth={1}
              onChangeText={zipcode => this.setState({ zipcode })}
            />
          </View>
        </View>

        <View
          style={{
            borderBottomWidth: 2,
            borderBottomColor: '#d5d5d5',
            marginTop: 20
          }}
        >
          <Picker
            selectedValue={this.state.country}
            style={{ height: 50, width: '100%', padding: 0 }}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({ country: itemValue })
            }
          >
            <Picker.Item label="Germany" value="germany" />
            <Picker.Item label="India" value="India" />
            <Picker.Item label="China" value="China" />
            <Picker.Item label="USA" value="USA" />
            <Picker.Item label="France" value="France" />
            <Picker.Item label="Sweden" value="Sweden" />
          </Picker>
        </View>

        <View>
          <TextField
            label={i18n.t('EMAIL ADDRESS')}
            value={email}
            tintColor={'#89b53a'}
            titleFontSize={12}
            lineWidth={1}
            returnKeyType="next"
            onChangeText={email => this.setState({ email })}
          />
        </View>
      </View>
    );

    const company = (
      <View style={styles.tabViewTitleContainer}>
        <View style={{ width: '45%' }}>
          <TextField
            label={i18n.t('label.pledgeFormFName')}
            value={firstname}
            tintColor={'#89b53a'}
            titleFontSize={12}
            returnKeyType="next"
            lineWidth={1}
            blurOnSubmit={false}
            onSubmitEditing={() => {
              this.lastnameTextInput.focus();
            }}
            onChangeText={firstname => this.setState({ firstname })}
          />
        </View>

        <View style={{ width: '45%' }}>
          <TextField
            label={i18n.t('label.pledgeFormLName')}
            value={lastname}
            tintColor={'#89b53a'}
            titleFontSize={12}
            returnKeyType="next"
            lineWidth={1}
            ref={input => {
              this.lastnameTextInput = input;
            }}
            // onSubmitEditing={() => {
            //     this.emailTextInput.focus();
            // }}
            onChangeText={lastname => this.setState({ lastname })}
          />
        </View>
      </View>
    );

    return (
      <ScrollView>
        <View style={styles.tabViewButtonContainer}>
          <TouchableOpacity
            style={[
              { padding: 16 },
              this.state.tabselected === 'individual'
                ? styles.selectedTabButtonView
                : null
            ]}
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
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              { padding: 16 },
              this.state.tabselected === 'company'
                ? styles.selectedTabButtonView
                : null
            ]}
            onPress={this.onTabChangeToCompany}
          >
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
