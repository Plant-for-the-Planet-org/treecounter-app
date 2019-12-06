import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Switch,
  TextInput,
  Animated
} from 'react-native';
import styles from '../../styles/donations/donationDetails';
import PropTypes from 'prop-types';
import {
  currencyIcon,
  gPayLogo,
  blackLock,
  nextArrowWhite
} from './../../assets';
import { getImageUrl } from '../../actions/apiRouting';
import i18n from '../../locales/i18n';
import { Dropdown } from 'react-native-material-dropdown';
import { formatNumber, delimitNumbers } from '../../utils/utils';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Header from './DonationDetailsComponents/Header';
import { updateStaticRoute } from '../../helpers/routerHelper';

function DonationDetails(props) {
  const [commissionSwitch, setCommissionSwitch] = React.useState(false); // for Switching whether the user wants to pay the commission of payment portal
  const [taxReceiptSwitch, setTaxReceiptSwitch] = React.useState(false); // for Switching whether the user wants receipt or not
  const [treeCount, setTreeCount] = React.useState(''); // for Selecting Tree Count
  const [frequency, setFrequency] = React.useState(''); // for Selecting Frequency of Donations
  const [countryForTax, setCountryForTax] = React.useState(''); // for Selecting the Country
  const [scrollY, setScrollY] = React.useState(new Animated.Value(0));

  // Function for Switching the state of commission
  toggleSetCommission = value => {
    setCommissionSwitch(value);
  };

  // Function for Switching the state of tax receipt
  toggleTaxReceipt = value => {
    setTaxReceiptSwitch(value);
  };
  return (
    <View style={{ backgroundColor: 'white' }}>
      <Header
        scrollY={scrollY}
        navigation={props.navigation}
        title={'Tree Donation'}
      />

      <KeyboardAwareScrollView
        contentContainerStyle={styles.scrollView}
        keyboardDismissMode="on-drag"
        resetScrollToCoords={{ x: 0, y: 0 }}
        scrollEnabled={true}
        extraScrollHeight={100}
        extraHeight={100}
        enableOnAndroid
        scrollEventThrottle={16}
        onScroll={Animated.event([
          { nativeEvent: { contentOffset: { y: scrollY } } }
        ])}
      >
        {/* Plant Project Details */}
        <PlantProjectDetails
          treeCost={props.treeCost}
          selectedCurrency={props.selectedCurrency}
          selectedProject={props.selectedProject}
        />

        {/* Donation Context */}

        {/* Gift Trees */}
        <View style={styles.giftDetails}>
          <Image
            style={styles.giftImage}
            source={{
              uri: getImageUrl('project', 'thumb', props.selectedProject.image)
            }}
          />
          <View style={styles.giftNameAmount}>
            <Text style={styles.giftName}>Sagar Aryal</Text>
            <Text style={styles.giftRecipient}>Gift Recipient</Text>
          </View>
        </View>

        <SelectTreeCount
          treeCount={treeCount}
          setTreeCount={setTreeCount}
          selectedProject={props.selectedProject}
        />

        <View style={styles.horizontalDivider} />

        <SelectFrequency frequency={frequency} setFrequency={setFrequency} />

        <View style={styles.horizontalDivider} />

        {/* Commission Covering */}
        {treeCount ? (
          <View style={styles.coverCommissionView}>
            <Text style={styles.coverCommissionText}>
              Help {props.selectedProject.tpoSlug} cover the credit card fee of{' '}
              {formatNumber(
                treeCount / 100 * 2.9 + 0.3,
                null,
                props.selectedCurrency
              )}{' '}
              (disabled by default)
            </Text>
            <Switch
              style={styles.coverCommissionSwitch}
              onValueChange={toggleSetCommission}
              thumbColor={'#89b53a'}
              trackColor={{ false: '#f2f2f7', true: 'rgba(137, 181, 58, 0.8)' }}
              value={commissionSwitch}
            />
          </View>
        ) : null}

        {/* Tax Receipt */}
        {/* <Text style={styles.notTaxDeductible}>
          This project does not issues tax deductions, if you are looking for
          tax deductions, please select another project or contact project
        </Text>
        <View style={styles.isTaxDeductibleView}>
          <Text style={styles.isTaxDeductibleText}>
            I would like a tax receipt (if istaxdeductible)
          </Text>
          <Switch
            style={styles.isTaxDeductibleSwitch}
            onValueChange={toggleTaxReceipt}
            value={taxReceiptSwitch}
          />
        </View> */}

        {/* Payment Processed by */}
        {/* <Text style={styles.paymentProcessText}>
          Your payment will be processed either by Stripe, Plant-for-the-Planet,{' '}
          {props.selectedProject.tpoSlug === 'plant-for-the-planet'
            ? null
            : 'or ' + props.selectedProject.tpoSlug}{' '}
          if is stripe connected.
        </Text> */}

        {/* <CountryPicker
          value={countryForTax}
          setCountryForTax={setCountryForTax}
        />

        <Text style={styles.countryForTaxText}>
          Only donations made in local EUR are tax deductible in Germany.
        </Text> */}
        {props.giftTreeCounterName ? (
          <Text>Gift Trees</Text>
        ) : props.supportTreecounter && props.supportTreecounter.displayName ? (
          <Text>Support Trees</Text>
        ) : null}
      </KeyboardAwareScrollView>

      {treeCount ? (
        <PaymentOption
          treeCount={treeCount}
          treeCost={props.treeCost}
          selectedCurrency={props.selectedCurrency}
          commissionSwitch={commissionSwitch}
          navigation={props.navigation}
        />
      ) : null}
    </View>
  );
}

export function PaymentOption(props) {
  return (
    <View style={styles.bottomButtonView}>
      <View style={styles.leftSection}>
        <View style={styles.paymentTreeDetails}>
          <Text style={styles.paymentTreeAmount}>
            {formatNumber(
              props.commissionSwitch
                ? props.treeCost * props.treeCount +
                  (props.treeCount / 100 * 2.9 + 0.3)
                : props.treeCost * props.treeCount,
              null,
              props.selectedCurrency
            )}
          </Text>
          <Text style={styles.paymentTreeCount}>
            for {props.treeCount} trees
          </Text>
        </View>

        {/* <TouchableOpacity style={styles.otherPaymentButton}>
          <Text style={styles.otherPaymentText}>Other payment methods</Text>
        </TouchableOpacity> */}
        <View>
          <Text style={styles.otherPaymentText}>Click Continue to proceed</Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => {
          updateStaticRoute('donor_details_form', props.navigation, {
            treeCount: props.treeCount,
            treeCost: props.treeCost,
            selectedCurrency: props.selectedCurrency,
            commissionSwitch: props.commissionSwitch
          });
        }}
        style={styles.continueButtonView}
      >
        <View style={{ alignItems: 'center' }}>
          <Image
            style={{ maxHeight: 24 }}
            source={nextArrowWhite}
            resizeMode="contain"
          />
          <Text style={styles.continueButtonText}>Continue</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

export function PlantProjectDetails(props) {
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
          <Image style={styles.projectAmountImage} source={currencyIcon} />
          <Text style={styles.projectAmountText}>
            {formatNumber(props.treeCost, null, props.selectedCurrency)} per
            tree
          </Text>
        </View>
      </View>
    </View>
  );
}

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

  const onChange = value => {
    props.setCountryForTax(value);
  };

  return (
    <View>
      <Dropdown
        ref={ref => (this.dropdown = ref)}
        label={'Country'}
        data={data}
        onChangeText={onChange}
        lineWidth={1}
        itemTextStyle={{ fontFamily: 'OpenSans-Regular' }}
        labelTextStyle={{ fontFamily: 'OpenSans-Regular' }}
      />
    </View>
  );
}

export function SelectTreeCount(props) {
  const [customTreeCount, setCustomTreeCount] = React.useState(false);
  let treeCountOptions;

  if (props.selectedProject) {
    if (
      props.selectedProject.paymentSetup.treeCountOptions &&
      props.selectedProject.paymentSetup.treeCountOptions.fixedTreeCountOptions
    ) {
      treeCountOptions =
        props.selectedProject.paymentSetup.treeCountOptions
          .fixedTreeCountOptions;
    } else {
      treeCountOptions = [10, 20, 50, 150];
    }
  }

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
            onChangeText={treeCount => props.setTreeCount(treeCount)}
            value={props.treeCount}
            keyboardType={'number-pad'}
            autoFocus
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
            props.setTreeCount('');
          }}
          style={styles.customSelectorView}
        >
          <Text style={styles.customTreeCountText}>Custom Trees</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

export function SelectFrequency(props) {
  let frequencyOptions = [
    { label: 'One Time', value: 'once' },
    { label: 'Monthly', value: 'monthly' },
    { label: 'Yearly', value: 'yearly' }
  ];
  return (
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
  );
}

DonationDetails.propTypes = {
  currencies: PropTypes.object.isRequired,
  selectedCurrency: PropTypes.string.isRequired,
  treeCountOptions: PropTypes.object.isRequired,
  selectedTreeCount: PropTypes.number.isRequired,
  treeCost: PropTypes.number.isRequired,
  rates: PropTypes.object.isRequired,
  fees: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  showNextButton: PropTypes.bool,
  onNextClick: PropTypes.func,
  selectedProject: PropTypes.object.isRequired
};

export default DonationDetails;

// ToDO
/*
    1. Get Gift Details
    2. Get Pledge Details
    3. Add Google/Apple Pay
*/
