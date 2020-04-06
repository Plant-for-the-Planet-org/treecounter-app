import PropTypes from 'prop-types';
import React from 'react';
import { Animated, Text, TouchableOpacity, View, Image } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from '../../../styles/donations/donationDetails';
import HeaderAnimated from '../../Header/HeaderAnimated.native';
import { CoverFee, NoPlantProjectDetails, PaymentOption, PlantProjectDetails, SelectFrequency, SelectTreeCount, TaxReceipt } from '../components/donationComponents.native';
import { GiftTreesComponent } from '../components/giftDontaionComponents.native';
import {getImageUrl} from '../../../actions/apiRouting';
import UserProfileImage from '../../Common/UserProfileImage.native';

function DonationDetails(props) {
  const [commissionSwitch, setCommissionSwitch] = React.useState(false); // for Switching whether the user wants to pay the commission of payment portal
  const [taxReceiptSwitch, setTaxReceiptSwitch] = React.useState(false); // for Switching whether the user wants receipt or not
  const [treeCount, setTreeCount] = React.useState(''); // for Selecting Tree Count
  const [frequency, setFrequency] = React.useState(''); // for Selecting Frequency of Donations
  const [countryForTax, setCountryForTax] = React.useState(''); // for Selecting the Country
  const [scrollY, setScrollY] = React.useState(new Animated.Value(0));

  const [donorDetails, setDonorDetails] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    country: '',
    isCompany: false,
    companyName: ''
  });
  // Function for Switching the state of commission
  const toggleSetCommission = value => {
    setCommissionSwitch(value);
  };

  // Function for Switching the state of tax receipt
  const toggleTaxReceipt = value => {
    setTaxReceiptSwitch(value);
  };

  // console.log('Context in Donate Page ----------------------------------', props.context)
  let context = props.context;
  let contextType = props.context.contextType;
  console.log('Context Type ------------', contextType);

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
        scrollEnabled
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

        {context.contextType === 'direct' ? (
          <SelectTreeCount
            treeCount={treeCount}
            setTreeCount={setTreeCount}
            selectedProject={props.selectedProject}
          />
        ) : null}

        {/* Donation Context */}

        {/* Gift Trees */}
        {context.contextType === 'gift-contact' ||
          context.contextType === 'gift-invitation' ? (
            <GiftTreesComponent
              treeCount={treeCount}
              setTreeCount={setTreeCount}
              selectedProject={props.selectedProject}
              context={context}
            />
          ) : null}

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
        ) : null}

        {/* Tax Receipt */}
        <TaxReceipt
          taxReceiptSwitch={taxReceiptSwitch}
          toggleTaxReceipt={toggleTaxReceipt}
        />
        {props.context.contextType==='support' ?<View>
          <View style={[{marginTop:20,marginBottom:0}]}><Text style={styles.sectionTitle}>SUPPORT</Text>
        <View style={styles.supportUser}>
          <UserProfileImage
            profileImage={
              props.context.support && props.context.support.treecounterAvatar
            }
            imageStyle={{ width: 40, height: 40, borderRadius: 40 / 2 }}
          />
          <View style={styles.supportUserNameContainer}>
            <Text style={styles.supportUserName}>{props.context.support.displayName}</Text>
          </View>
        </View>
        </View></View>:null}
        {/* <UserContactDetails donorDetails={donorDetails} /> */}

        {/* <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>PAYMENT METHOD</Text>
          {props.selectedProject ? (
            <TouchableOpacity>
              <Text style={styles.sectionRightButton}>Change</Text>
            </TouchableOpacity>
          ) : null}
        </View> */}

        {/* Payment Processed by */}
        {/* <Text style={styles.paymentProcessText}>
          Your payment will be processed either by Stripe, Plant-for-the-Planet,{' '}
          {props.selectedProject.tpoSlug === 'plant-for-the-planet'
            ? null
            : 'or ' + props.selectedProject.tpoSlug}{' '}
          if is stripe connected.
        </Text> */}

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

const UserContactDetails = (props) => {
  let { donorDetails } = props
  return (
    <>
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>CONTACT DETAILS</Text>
        <TouchableOpacity>
          {donorDetails.firstName ? <Text style={styles.sectionRightButton}>Edit</Text> : <Text style={styles.sectionRightButton}>Add</Text>}
        </TouchableOpacity>
      </View>
      {donorDetails.firstName ?
        <View>
          <Text style={styles.contactDetailsAddress}>{donorDetails.firstName} {donorDetails.lastName}</Text>
          {donorDetails.companyName ? (
            <Text style={styles.contactDetailsAddress}>{donorDetails.companyName}</Text>
          ) : null}
          <Text style={styles.contactDetailsAddress}>
            {donorDetails.email}
          </Text>
          <Text style={styles.contactDetailsAddress}>{donorDetails.country}</Text>
        </View> : null}
    </>
  )
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
