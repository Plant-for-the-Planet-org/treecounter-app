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
  nextArrowWhite,
  infoHint
} from './../../assets';
import { getImageUrl } from '../../actions/apiRouting';
import i18n from '../../locales/i18n';
import { Dropdown } from 'react-native-material-dropdown';
import { formatNumber, delimitNumbers } from '../../utils/utils';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Header from './DonationDetailsComponents/Header';
import { updateStaticRoute } from '../../helpers/routerHelper';
import HeaderAnimated from './../Header/HeaderAnimated.native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {
  TaxReceipt,
  CoverFee,
  PaymentOption,
  SelectFrequency,
  PlantProjectDetails,
  NoPlantProjectDetails,
  SelectTreeCount,
  CountryPicker
} from './DonationDetailsComponents/donationComponents.native';
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
      <HeaderAnimated
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
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>DONATION TO</Text>
          {props.selectedProject ? (
            <TouchableOpacity>
              <Text style={styles.sectionRightButton}>Change</Text>
            </TouchableOpacity>
          ) : null}
        </View>
        {props.selectedProject ? (
          <PlantProjectDetails
            treeCost={props.treeCost}
            selectedCurrency={props.selectedCurrency}
            selectedProject={props.selectedProject}
          />
        ) : (
          <NoPlantProjectDetails
            treeCost={props.treeCost}
            selectedCurrency={props.selectedCurrency}
            selectedProject={props.selectedProject}
          />
        )}

        <SelectTreeCount
          treeCount={treeCount}
          setTreeCount={setTreeCount}
          selectedProject={props.selectedProject}
        />
        {/* Donation Context */}

        {/* Gift Trees */}
        <Text style={[styles.sectionTitle, { marginTop: 20 }]}>
          GIFT RECIPIENT
        </Text>

        <View style={styles.giftDetails}>
          <Image
            style={styles.giftImage}
            source={{
              uri: getImageUrl('project', 'thumb', props.selectedProject.image)
            }}
          />
          <View style={styles.giftNameAmount}>
            <Text style={styles.giftName}>Sagar Aryal</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text
              style={{
                fontFamily: 'OpenSans-Bold',
                fontSize: 18,
                lineHeight: 24,
                letterSpacing: 0,
                textAlign: 'right',
                color: '#89b53a',
                marginRight: 4
              }}
            >
              50
            </Text>
            <Text
              style={{
                fontFamily: 'OpenSans-Regular',
                fontSize: 13,
                lineHeight: 18,
                letterSpacing: 0,
                textAlign: 'right',
                color: 'rgba(0, 0, 0, 0.6)',
                marginRight: 12
              }}
            >
              Trees
            </Text>
            <Icon name={'chevron-down'} size={14} color="#4d5153" />
          </View>
        </View>

        <View style={styles.horizontalDivider} />

        <View style={styles.giftDetails}>
          <Image
            style={styles.giftImage}
            source={{
              uri: getImageUrl('project', 'thumb', props.selectedProject.image)
            }}
          />
          <View style={styles.giftNameAmount}>
            <Text style={styles.giftName}>Sagar Aryal</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text
              style={{
                fontFamily: 'OpenSans-Regular',
                fontSize: 13,
                lineHeight: 18,
                letterSpacing: 0,
                textAlign: 'right',
                color: 'rgba(0, 0, 0, 0.6)',
                marginRight: 12
              }}
            >
              Select Trees
            </Text>
            <Icon name={'chevron-up'} size={14} color="#4d5153" />
          </View>
        </View>

        <SelectTreeCount
          treeCount={treeCount}
          setTreeCount={setTreeCount}
          selectedProject={props.selectedProject}
        />

        <View style={styles.horizontalDivider} />

        <TouchableOpacity>
          <Text
            style={{
              fontFamily: 'OpenSans-SemiBold',
              fontSize: 14,
              lineHeight: 21,
              letterSpacing: 0,
              textAlign: 'left',
              color: '#89b53a',
              marginTop: 10
            }}
          >
            Add another recipient
          </Text>
        </TouchableOpacity>

        <SelectFrequency frequency={frequency} setFrequency={setFrequency} />
        <View style={[styles.horizontalDivider, { width: '14%' }]} />

        {/* Commission Covering */}
        {treeCount ? (
          <CoverFee
            selectedProject={props.selectedProject.tpoSlug}
            treeCount={treeCount}
            selectedCurrency={props.selectedCurrency}
            toggleSetCommission={toggleSetCommission}
            commissionSwitch={commissionSwitch}
          />
        ) : (
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
        )}

        {/* Tax Receipt */}
        <TaxReceipt
          taxReceiptSwitch={taxReceiptSwitch}
          toggleTaxReceipt={toggleTaxReceipt}
        />

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>CONTACT DETAILS</Text>
          {props.selectedProject ? (
            <TouchableOpacity>
              <Text style={styles.sectionRightButton}>Edit</Text>
            </TouchableOpacity>
          ) : null}
        </View>
        <View>
          <Text style={styles.contactDetailsAddress}>Company Name</Text>
          <Text style={styles.contactDetailsAddress}>
            Am Bahnhof 1, Uffing am Staffelsee, DE
          </Text>
          <Text style={styles.contactDetailsAddress}>sagar@aryal.me</Text>
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>PAYMENT METHOD</Text>
          {props.selectedProject ? (
            <TouchableOpacity>
              <Text style={styles.sectionRightButton}>Change</Text>
            </TouchableOpacity>
          ) : null}
        </View>

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
