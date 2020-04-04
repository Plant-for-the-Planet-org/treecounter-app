import React, { useEffect, useState } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
  Text,
  View,
  Keyboard,
  Animated,
  Switch,
  TouchableOpacity,
  Image
} from 'react-native';
import { TextField } from 'react-native-material-textfield';
import { Dropdown } from 'react-native-material-dropdown';
import styles from '../../styles/donations/donorDetails';
import i18n from '../../locales/i18n.js';
import buttonStyles from './../../styles/common/button.native';
import { forward } from '../../assets';

export default function DonorDetails(props) {
  const [scrollY, setScrollY] = useState(new Animated.Value(0));
  const [buttonType, setButtonType] = useState('donate');
  const [isCompanySwitch, setisCompanySwitch] = React.useState(false); // for Switching whether the user wants receipt or not

  const keyboardDidShow = () => {
    setButtonType('>');
  };

  const keyboardDidHide = () => {
    setButtonType('donate');
  };

  // Function for Switching the state of isCompany
  const toggleIsCompany = value => {
    setisCompanySwitch(value);
  };

  const [tempDonorDetails, setTempDonorDetails] = React.useState({
    firstName: '',
    lastName: '',
    country: '',
    email: '',
    companyName: ''
  })

  const handleChange = (value, name) => {
    setTempDonorDetails({
      ...tempDonorDetails,
      [name]: value
    });
  };

  const handleSave = () => {
    props.setDonorDetails({
      ...tempDonorDetails
    })
    props.snapBottomSheet() // Due to a bug in the library this has to be done twice
    props.snapBottomSheet()
  }

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      keyboardDidShow
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      keyboardDidHide
    );
    // clean up
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <View style={{ backgroundColor: 'white' }}>
      {/* <HeaderAnimated
        scrollY={scrollY}
        navigation={props.navigation}
        title={'Contact Details'}
      /> */}

      <KeyboardAwareScrollView
        contentContainerStyle={styles.scrollView}
        keyboardDismissMode="on-drag"
        resetScrollToCoords={{ x: 0, y: 0 }}
        scrollEnabled={true}
        extraScrollHeight={32}
        extraHeight={32}
        enableOnAndroid
        scrollEventThrottle={16}
        onScroll={Animated.event([
          { nativeEvent: { contentOffset: { y: scrollY } } }
        ])}
      >
        <View>
          <Text style={{
            fontFamily: 'OpenSans-Bold',
            fontSize: 27,
            lineHeight: 40,
            letterSpacing: 0,
            textAlign: 'left',
            color: '#4d5153'
          }}>Contact Details</Text>
          <View style={styles.formView}>
            <View style={styles.formHalfTextField}>
              <TextField
                label={i18n.t('label.pledgeFormFName')}
                value={tempDonorDetails.firstname}
                tintColor={'#89b53a'}
                titleFontSize={12}
                returnKeyType="next"
                lineWidth={1}
                labelTextStyle={{ fontFamily: 'OpenSans-Regular' }}
                titleTextStyle={{ fontFamily: 'OpenSans-SemiBold' }}
                affixTextStyle={{ fontFamily: 'OpenSans-Regular' }}
                blurOnSubmit={false}
                onChangeText={(value) => handleChange(value, 'firstName')}
              />
            </View>

            <View style={styles.formHalfTextField}>
              <TextField
                label={i18n.t('label.pledgeFormLName')}
                value={tempDonorDetails.lastname}
                tintColor={'#89b53a'}
                titleFontSize={12}
                returnKeyType="next"
                lineWidth={1}
                labelTextStyle={{ fontFamily: 'OpenSans-Regular' }}
                titleTextStyle={{ fontFamily: 'OpenSans-SemiBold' }}
                affixTextStyle={{ fontFamily: 'OpenSans-Regular' }}
                onChangeText={(value) => handleChange(value, 'lastName')}
              />
            </View>
          </View>

          <View>
            <TextField
              label={i18n.t('label.pledgeFormEmail')}
              value={tempDonorDetails.email}
              tintColor={'#89b53a'}
              titleFontSize={12}
              lineWidth={1}
              keyboardType="email-address"
              labelTextStyle={{ fontFamily: 'OpenSans-Regular' }}
              titleTextStyle={{ fontFamily: 'OpenSans-SemiBold' }}
              affixTextStyle={{ fontFamily: 'OpenSans-Regular' }}
              returnKeyType="next"
              onChangeText={(value) => handleChange(value, 'email')}
            />
          </View>

          <CountryPicker
            values={tempDonorDetails}
            handleChange={handleChange}
          // setFieldValue={props.setFieldValue}
          />

          <View style={styles.coverCommissionView}>
            <Text style={styles.coverCommissionText}>
              This is a Company Donation
                  </Text>
            <Switch
              style={styles.coverCommissionSwitch}
              onValueChange={(value) => toggleIsCompany(value)}
              value={isCompanySwitch}
            />
          </View>

          {isCompanySwitch ? (
            <View>
              <TextField
                label={'Company Name'}
                value={tempDonorDetails.companyName}
                tintColor={'#89b53a'}
                titleFontSize={12}
                lineWidth={1}
                labelTextStyle={{ fontFamily: 'OpenSans-Regular' }}
                titleTextStyle={{ fontFamily: 'OpenSans-SemiBold' }}
                affixTextStyle={{ fontFamily: 'OpenSans-Regular' }}
                returnKeyType="next"
                onChangeText={() => handleChange()}
              />
            </View>
          ) : null}
        </View>
        {buttonType === 'donate' ? (
          <>
            <TouchableOpacity
              style={[
                buttonStyles.dualActionButtonTouchable,
                { marginTop: 24 }
              ]}
              onPress={() => handleSave()}
            >
              <View
                style={[
                  buttonStyles.dualActionButtonView2
                ]}
              >
                <Text style={buttonStyles.dualActionButtonText2}>
                  {i18n.t('label.save')}
                </Text>
              </View>
            </TouchableOpacity>
          </>
        ) : null}

        {buttonType === '>' ? (
          <TouchableOpacity
            style={[
              buttonStyles.actionButtonSmallTouchable,
              { top: undefined, bottom: '16%' },
              // !props.isValid ? { backgroundColor: backgroundColor } : {}
            ]}
          // onPress={props.isValid ? props.handleSubmit : null}
          >
            <Image
              source={forward}
              resizeMode="cover"
              style={buttonStyles.actionButtonSmallImage}
            />
          </TouchableOpacity>
        ) : null}

      </KeyboardAwareScrollView>



      {/* <PaymentOption
        treeCount={treeCount}
        treeCost={treeCost}
        selectedCurrency={selectedCurrency}
        commissionSwitch={commissionSwitch}
        navigation={props.navigation}
      /> */}
    </View>
  );
}

DonorDetails.navigationOptions = {
  header: null
};

export function CountryPicker(props) {
  let data = [
    {
      label: 'Germany',
      value: 'germany'
    },
    {
      label: 'India',
      value: 'india'
    },
    {
      label: 'USA',
      value: 'usa'
    }
  ];

  const refContainer = React.useRef('dropdown');

  return (
    <View>
      <Dropdown
        ref={refContainer}
        label={'Country'}
        data={data}
        onChangeText={(value) => props.handleChange(value, 'country')}
        lineWidth={1}
        itemTextStyle={{ fontFamily: 'OpenSans-Regular' }}
        labelTextStyle={{ fontFamily: 'OpenSans-Regular' }}
      />
    </View>
  );
}