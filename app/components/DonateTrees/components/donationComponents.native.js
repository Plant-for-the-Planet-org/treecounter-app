import React, { useState } from 'react';
import {
  FlatList,
  Image,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import Modal from 'react-native-modalbox';
import Icon from 'react-native-vector-icons/FontAwesome5';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {
  getCountryFlagImageUrl,
  getImageUrl
} from '../../../actions/apiRouting';
import { infoHint, nextArrowWhite, nextArrow } from '../../../assets';
import countryData from '../../../assets/countryCodes.json';
import styles from '../../../styles/donations/donationDetails';
import { formatNumber } from '../../../utils/utils';
import CurrencySelectorList from '../../Common/CurrencySelectorList.native';
import UserProfileImage from '../../Common/UserProfileImage.native';
import { handleApplePayPress } from './paymentMethods/applePay';
import { handleAndroidPayPress } from './paymentMethods/googlePay';
import { SvgXml } from 'react-native-svg';
import google_pay from '../../../assets/svgAssets/donations/google_pay';
import apple_pay from '../../../assets/svgAssets/donations/apple_pay';

export function TaxReceipt(props) {
  let {
    taxReceiptSwitch,
    toggleTaxReceipt,
    selectedTaxCountry,
    setShowTaxCountryModal,
    oneTaxCountry
  } = props;
  console.log('taxReceiptSwitch', taxReceiptSwitch);
  const SelectedCountryText = () => {
    return (
      <Text style={styles.isTaxDeductibleCountry}>
        {getCountryData(selectedTaxCountry).country}
      </Text>
    );
  };
  return (
    <View style={styles.isTaxDeductibleView}>
      <View>
        <Text style={styles.isTaxDeductibleText}>
          Send me a tax deduction receipt for
        </Text>
        {oneTaxCountry ? (
          <TouchableOpacity
            onPress={() => {
              setShowTaxCountryModal(
                prevTaxCountryModal => !prevTaxCountryModal
              ),
                toggleTaxReceipt(true);
            }}
            style={{ flexDirection: 'row', alignItems: 'center' }}
          >
            <SelectedCountryText />
            <Icon name={'chevron-down'} size={14} color="#89b53a" />
          </TouchableOpacity>
        ) : (
          <SelectedCountryText />
        )}
      </View>

      <Switch
        style={styles.isTaxDeductibleSwitch}
        onValueChange={toggleTaxReceipt}
        value={taxReceiptSwitch}
        thumbColor={taxReceiptSwitch ? '#89b53a' : '#bdc3c7'}
        trackColor={{
          false: '#f2f2f7',
          true: 'rgba(137, 181, 58, 0.6)'
        }}
      />
    </View>
  );
}

export function getCountryData(countryCode) {
  return countryData.find(c => c.countryCode == countryCode) || {};
}

export function SelectCountryModal(props) {
  let {
    selectedCountry,
    setSelectedCountry,
    showModal,
    setShowModal,
    taxDeductibleCountries
  } = props;
  const activeColor = '#74ba00';
  const defaultColor = '#4d5153';

  const [searchText, setSearchText] = useState('');

  const keyExtractor = d => d.item;

  const renderItem = ({ item: countryCode }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setSelectedCountry(countryCode);
          closeModal();
        }}
      >
        <View
          key={countryCode}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 12
          }}
        >
          <Image
            source={{
              uri: getCountryFlagImageUrl(
                getCountryData(countryCode).currencyCountryFlag,
                'png',
                256
              )
            }}
            style={{ width: 24, height: 15 }}
          />
          <Text
            style={{
              paddingLeft: 16,
              lineHeight: 22,
              flex: 1,
              fontFamily: 'OpenSans-SemiBold',
              fontSize: 16,
              color:
                selectedCountry === countryCode ? activeColor : defaultColor
            }}
          >
            {getCountryData(countryCode).country}
          </Text>
          {selectedCountry === countryCode && (
            <MaterialIcon
              name="done"
              size={24}
              color="#89b53a"
              style={{
                marginLeft: 5
              }}
            />
          )}
        </View>
      </TouchableOpacity>
    );
  };

  const closeModal = () => {
    setSearchText();
    setShowModal(false);
  };

  const setSearchCountries = (text = '') => {
    setSearchText(text);
  };

  return (
    <Modal
      isOpen={showModal}
      position={'left'}
      onClosed={closeModal}
      backdropPressToClose
      coverScreen
      keyboardTopOffset={0}
      swipeToClose
    >
      <View
        style={{
          opacity: 1,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: Platform.OS === 'ios' ? 54 : 20,
          marginBottom: 20,
          paddingHorizontal: 24
        }}
      >
        <Text
          style={{
            fontFamily: 'OpenSans-SemiBold',
            fontSize: 18,
            color: defaultColor
          }}
        >
          Select Tax Deduction Country
        </Text>
        <TouchableOpacity onPress={closeModal}>
          {searchText ? (
            <MaterialIcon name="arrow-back" size={30} color="black" />
          ) : (
            <MaterialIcon name="close" size={30} color="#4d5153" />
          )}
        </TouchableOpacity>
        {/* <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            borderColor: '#4d5153',
            borderRadius: 20,
            marginLeft: 20
          }}
        >
          <TextInput
            style={{ height: 40, width: '84%' }}
            onChangeText={text => {
              setSearchCountries(text);
            }}
            value={searchText}
            placeholder={i18n.t('label.searchshort')}
            placeholderTextColor={'#4d5153'}
            fontFamily="OpenSans-SemiBold"
          />
        </View> */}
      </View>
      <FlatList
        data={taxDeductibleCountries}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        contentContainerStyle={{
          backgroundColor: '#fff',
          flex: 1,
          paddingHorizontal: 24
        }}
      />
    </Modal>
  );
}

export function CoverFee(props) {
  return (
    <View style={styles.coverCommissionView}>
      <Text style={styles.coverCommissionText}>
        Help {props.selectedProject.tpoSlug} cover the credit card fee of{' '}
        {formatNumber(
          (props.treeCount / 100) * 2.9 + 0.3,
          null,
          props.selectedCurrency
        )}{' '}
      </Text>
      <Switch
        style={styles.coverCommissionSwitch}
        onValueChange={props.toggleSetCommission}
        trackColor={{ false: '#f2f2f7', true: '#88b439' }}
        value={props.commissionSwitch}
      />
    </View>
  );
}

export function PaymentOption(props) {
  let ffrequency = {
    once: 'One time Donation',
    monthly: 'Monthly Donation',
    yearly: 'Yearly Donation'
  };

  return (
    <View style={styles.bottomButtonView}>
      <View style={styles.leftSection}>
        {props.treeCount ? (
          <>
            <View style={styles.paymentTreeDetails}>
              <Text style={styles.paymentTreeAmount}>
                {formatNumber(
                  props.commissionSwitch
                    ? props.treeCost * props.treeCount +
                        ((props.treeCount / 100) * 2.9 + 0.3)
                    : props.treeCost * props.treeCount,
                  null,
                  props.selectedCurrency
                )}
              </Text>
            </View>

            {/* <TouchableOpacity style={styles.otherPaymentButton}>
            <Text style={styles.otherPaymentText}>Other payment methods</Text>
          </TouchableOpacity> */}
            <View>
              {/* <Text style={styles.otherPaymentText}>
                
                {props.frequency ? ffrequency[props.frequency] : null}
              </Text> */}

              <Text style={styles.paymentTreeCount}>
                for {props.treeCount} trees
              </Text>
            </View>
          </>
        ) : (
          <Text style={styles.paymentTreeCount}>Please select Tree count</Text>
        )}
      </View>
      {props.treeCount ? (
        <>
          <TouchableOpacity
            onPress={() =>
              props.showNativePay === 'google'
                ? handleAndroidPayPress({
                    totalTreeCount: String(props.treeCount),
                    totalPrice: String(props.treeCount * props.treeCost),
                    amountPerTree: String(props.treeCost),
                    currency_code: String(props.selectedCurrency),
                    token: props.token,
                    setToken: props.setToken,
                    stripe: props.stripe,
                    currentUserProfile: props.currentUserProfile,
                    context: props.context,
                    createDonation: props.createDonation,
                    setDonorDetails: props.setDonorDetails,
                    donationPay: props.donationPay
                  })
                : handleApplePayPress({
                    totalTreeCount: String(props.treeCount),
                    totalPrice: String(props.treeCount * props.treeCost),
                    amountPerTree: String(props.treeCost),
                    currency_code: String(props.selectedCurrency),
                    token: props.token,
                    setToken: props.setToken,
                    stripe: props.stripe,
                    setApplePayStatus: props.setApplePayStatus,
                    currentUserProfile: props.currentUserProfile,
                    context: props.context,
                    createDonation: props.createDonation,
                    setDonorDetails: props.setDonorDetails,
                    donationPay: props.donationPay
                  })
            }
            style={styles.nativePayButton}
          >
            <SvgXml
              style={{ maxHeight: 24, maxWidth: 60 }}
              xml={props.showNativePay === 'google' ? google_pay : apple_pay}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => props.onContinue()}
            style={styles.continueOtherButton}
          >
            <Text style={styles.continueOtherButtonText}>Other</Text>
            <Image
              style={{ maxHeight: 24, maxWidth: 24 }}
              source={nextArrow}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </>
      ) : (
        <View style={[styles.continueButtonView, { backgroundColor: 'grey' }]}>
          <Text style={styles.continueButtonText}>Next</Text>
          <Image
            style={{ maxHeight: 24, maxWidth: 24 }}
            source={nextArrowWhite}
            resizeMode="contain"
          />
        </View>
      )}
    </View>
  );
}

export function SelectFrequency(props) {
  let frequencyOptions = [
    { label: 'Once', value: 'once' },
    { label: 'Monthly', value: 'monthly' },
    { label: 'Yearly', value: 'yearly' }
  ];
  return (
    <>
      <Text
        style={{
          fontFamily: 'OpenSans-SemiBold',
          fontSize: 12,
          lineHeight: 17,
          letterSpacing: 0,
          textAlign: 'left',
          color: '#4d5153',
          marginTop: 30
        }}
      >
        FREQUENCY
      </Text>
      <View style={styles.repititionSelector}>
        {frequencyOptions.map(option => (
          <TouchableOpacity
            onPress={() => props.setFrequency(option.value)}
            style={
              props.frequency === option.value
                ? styles.repititionSelectedView
                : styles.repititionSelectorView
            }
          >
            <Text
              style={
                props.frequency === option.value
                  ? styles.selectedRepititionText
                  : styles.repititionText
              }
            >
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </>
  );
}

export function PlantProjectDetails(props) {
  const [showCurrencyModal, setShowCurrencyModal] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState(
    props.selectedCurrency
  );
  const [treeCost, setTreeCost] = useState(props.treeCost);

  const handleCurrencyChange = currency => {
    setSelectedCurrency(currency);
    setShowCurrencyModal(false);
    setTreeCost(calculateAmount(currency));
  };

  // This function takes the tree Count and calculates the total amount
  const calculateAmount = currency => {
    return (
      Math.round(props.treeCost * parseFloat(props.rates[currency]) * 100) /
        100 +
      props.fee
    );
  };
  return (
    <View style={styles.projectDetails}>
      <Image
        style={styles.projectImage}
        source={{
          uri: getImageUrl('project', 'thumb', props.selectedProject.image)
        }}
      />
      <View style={styles.projectNameAmount}>
        <Text style={styles.projectName}>{props.selectedProject.name}</Text>
        <View style={styles.projectAmountView}>
          <TouchableOpacity
            onPress={() => setShowCurrencyModal(true)}
            style={{ flexDirection: 'row', alignItems: 'center' }}
          >
            <Text style={styles.isTaxDeductibleCountry}>
              {selectedCurrency}
            </Text>
            <Icon name={'chevron-down'} size={14} color="#89b53a" />
          </TouchableOpacity>

          {/* <Image style={styles.projectAmountImage} source={currencyIcon} /> */}
          <Text style={styles.projectAmountText}>
            {formatNumber(treeCost, null, selectedCurrency)} per tree
          </Text>
        </View>
      </View>
      <CurrencySelectorList
        hideCurrencyModal={() => setShowCurrencyModal(false)}
        show={showCurrencyModal}
        handleCurrencyChange={handleCurrencyChange}
        selectedCurrency={selectedCurrency}
      />
    </View>
  );
}

export function NoPlantProjectDetails(props) {
  return (
    <TouchableOpacity style={styles.noprojectDetails}>
      <View style={styles.noprojectImage} />
      <View style={styles.noprojectNameAmount}>
        <Text style={styles.noprojectName}>Select Project</Text>
        <Text style={styles.noprojectAmountText}>
          Tap here to view all projects
        </Text>
      </View>
      <View style={[{ alignSelf: 'auto', marginRight: 16 }]}>
        <Icon name={'chevron-right'} size={14} color="#4d5153" />
      </View>
    </TouchableOpacity>
  );
}

export function SelectTreeCount(props) {
  const [customTreeCount, setCustomTreeCount] = React.useState(false);
  const [tempTreeCount, setTempTreeCount] = React.useState(0);
  let treeCountOptions;
  let defaultTreeCountOption;

  const customTreeCountRef = React.useRef(null);

  if (props.selectedProject) {
    if (props.selectedProject.treeCountOptions) {
      treeCountOptions = Object.values(props.selectedProject.treeCountOptions);
      treeCountOptions.sort();
      if (!props.treeCount) {
        props.setTreeCount(props.selectedProject.treeCountOptions.default);
      }
    } else {
      defaultTreeCountOption = 10;
      treeCountOptions = [10, 20, 50, 150];
      if (!props.treeCount) {
        props.setTreeCount(defaultTreeCountOption);
      }
    }
  }

  if (!customTreeCountRef.isFocused && customTreeCount) {
    props.setTreeCount(tempTreeCount);
  }

  console.log('Tree Count', props.treeCount);

  return (
    <View style={styles.treeCountSelector}>
      {treeCountOptions.map(option => (
        <TouchableOpacity
          onPress={() => {
            props.setTreeCount(option);
            setCustomTreeCount(false);
          }}
          style={
            props.treeCount === option
              ? styles.selectedView
              : styles.selectorView
          }
        >
          <Text
            style={
              props.treeCount === option
                ? styles.selectedTreeCountText
                : styles.treeCountText
            }
          >
            {option} Trees
          </Text>
        </TouchableOpacity>
      ))}
      {customTreeCount ? (
        <View style={styles.customSelectedView}>
          <TextInput
            style={
              customTreeCount
                ? styles.treeCountTextInputSelected
                : styles.treeCountTextInput
            }
            onChangeText={treeCount => setTempTreeCount(treeCount)}
            onSubmitEditing={() => props.setTreeCount(tempTreeCount)}
            value={tempTreeCount}
            keyboardType={'number-pad'}
            autoFocus
            ref={customTreeCountRef}
          />
          <Text
            style={
              customTreeCount
                ? styles.treeCountNumberSelected
                : styles.treeCountNumber
            }
          >
            Trees
          </Text>
        </View>
      ) : (
        <TouchableOpacity
          onPress={() => {
            setCustomTreeCount(true);
            props.setTreeCount(tempTreeCount);
          }}
          style={styles.customSelectorView}
        >
          <Text style={styles.customTreeCountText}>Custom Trees</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const hintCard = () => {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        marginTop: 24,
        borderRadius: 6,
        backgroundColor: '#F5F7F9',
        alignItems: 'center'
      }}
    >
      <View
        style={{
          backgroundColor: '#89b53a',
          width: 6,
          height: '100%',
          borderTopLeftRadius: 6,
          borderBottomLeftRadius: 6
        }}
      />
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          marginLeft: 24,
          paddingTop: 24,
          paddingBottom: 24,
          alignItems: 'center',
          paddingRight: 24
        }}
      >
        <Image
          source={infoHint}
          style={{ marginRight: 12, height: 24, width: 24 }}
        />
        <Text style={{ maxWidth: '90%', fontFamily: 'OpenSans-Regular' }}>
          Please select Tree Count to Donate trees.
        </Text>
      </View>
    </View>
  );
};

export const UserContactDetails = props => {
  let { donorDetails } = props;
  return (
    <>
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>CONTACT DETAILS</Text>
        <TouchableOpacity>
          {donorDetails.firstName ? (
            <Text style={styles.sectionRightButton}>Edit</Text>
          ) : (
            <Text style={styles.sectionRightButton}>Add</Text>
          )}
        </TouchableOpacity>
      </View>
      {donorDetails.firstName ? (
        <View>
          <Text style={styles.contactDetailsAddress}>
            {donorDetails.firstName} {donorDetails.lastName}
          </Text>
          {donorDetails.companyName ? (
            <Text style={styles.contactDetailsAddress}>
              {donorDetails.companyName}
            </Text>
          ) : null}
          <Text style={styles.contactDetailsAddress}>{donorDetails.email}</Text>
          <Text style={styles.contactDetailsAddress}>
            {donorDetails.country}
          </Text>
        </View>
      ) : null}
    </>
  );
};

export const UserPaymentDetails = props => {
  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>PAYMENT METHOD</Text>
      <TouchableOpacity>
        <Text style={styles.sectionRightButton}>Change</Text>
      </TouchableOpacity>
    </View>
  );
};

export const PaymentsProcessedBy = props => {
  return (
    <Text style={styles.paymentProcessText}>
      Your payment will be processed either by Stripe, Plant-for-the-Planet,{' '}
      {props.selectedProject.tpoSlug === 'plant-for-the-planet'
        ? null
        : 'or ' + props.selectedProject.tpoSlug}{' '}
      if is stripe connected.
    </Text>
  );
};

export const SupportUserDetails = props => {
  return (
    <View>
      <View style={[{ marginTop: 20, marginBottom: 0 }]}>
        <Text style={styles.sectionTitle}>SUPPORT</Text>
        <View style={styles.supportUser}>
          <UserProfileImage
            profileImage={
              props.context.support && props.context.support.treecounterAvatar
            }
            imageStyle={{ width: 40, height: 40, borderRadius: 40 / 2 }}
          />
          <View style={styles.supportUserNameContainer}>
            <Text style={styles.supportUserName}>
              {props.context.support.displayName}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};
