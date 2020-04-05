import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Switch,
  TextInput,
  Animated,
  Dimensions,
  FlatList
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
import GetRandomImage from '../../utils/getRandomImage';

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

        {/* <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>CONTACT DETAILS</Text>
          <TouchableOpacity
            onPress={
              () => BottomSheetRef.current.snapTo(0)
            }
          >{donorDetails.firstName ? <Text style={styles.sectionRightButton}>Edit</Text> : <Text style={styles.sectionRightButton}>Add</Text>}
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
          </View> : null} */}

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

const space = () => {
  return (
    <View style={{ height: 60, width: 15, backgroundColor: 'transparent' }} />
  );
};

const GiftTreesComponent = props => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [giftDetails, setGiftDetails] = React.useState([]);
  React.useEffect(() => {
    let details = props.context.giftDetails;
    for (let i = 0; i < details.length; i++) {
      details[i] = {
        ...details[i],
        treeCount: 0,
        isCustomCount: false,
        giftMsg: '',
        notifyRecipient: false
      };
    }
    setGiftDetails(details);
  }, []);
  return (
    <View>
      <Text style={[styles.sectionTitle, { marginTop: 20 }]}>
        GIFT RECIPIENT
      </Text>
      <FlatList
        data={props.context.giftDetails}
        ItemSeparatorComponent={space}
        horizontal
        style={{ marginTop: 20 }}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <View
            style={{
              maxWidth: 60,
              alignItems: 'center'
            }}
          >
            <TouchableOpacity
              onPress={() => {
                setCurrentIndex(index);
              }}
            >
              {item.hasThumbnail ? (
                <Image
                  style={{ height: 60, width: 60, borderRadius: 30 }}
                  source={{ uri: item.thumbnailPath }}
                />
              ) : (
                <GetRandomImage dimension={60} name={item.firstName} />
              )}
              <Text
                style={{
                  fontFamily: 'OpenSans-SemiBold',
                  textAlign: 'center',
                  marginTop: 6
                }}
                ellipsizeMode="tail"
                numberOfLines={1}
              >
                {item.firstName}
              </Text>
            </TouchableOpacity>
            {currentIndex === index ? (
              <View style={[styles.triangle, { marginTop: 10 }]} />
            ) : null}
          </View>
        )}
      />
      <View
        style={{
          width: Dimensions.get('window').width,
          borderWidth: 1,
          borderColor: '#dddddd',
          borderRadius: 8,
          padding: 24,
          marginLeft: -24
        }}
      >
        {giftDetails.length > 0 ? (
          <SelectMultiTreeCount
            currentIndex={currentIndex}
            giftDetails={giftDetails}
            setGiftDetails={setGiftDetails}
            selectedProject={props.selectedProject}
          />
        ) : null}
      </View>
      {props.treeCount ? (
        <>
          <View style={styles.giftDetails}>
            {props.selectedProject.image ? (
              <Image
                style={styles.giftImage}
                source={{
                  uri: getImageUrl(
                    'project',
                    'thumb',
                    props.selectedProject.image
                  )
                }}
              />
            ) : null}
            <View style={styles.giftNameAmount}>
              <Text style={styles.giftName}>Sagar Aryal</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.giftTreesTreeCountNumber}>
                {props.treeCount}{' '}
              </Text>
              <Text
                style={[
                  styles.giftTreesSelectTrees,
                  {
                    marginRight: 12
                  }
                ]}
              >
                Trees
              </Text>
              <TouchableOpacity onPress={() => props.setTreeCount(0)}>
                <Icon name={'chevron-down'} size={14} color="#4d5153" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.horizontalDivider} />
        </>
      ) : (
        <>
          <View style={styles.giftDetails}>
            {props.selectedProject.image ? (
              <Image
                style={styles.giftImage}
                source={{
                  uri: getImageUrl(
                    'project',
                    'thumb',
                    props.selectedProject.image
                  )
                }}
              />
            ) : null}

            <View style={styles.giftNameAmount}>
              <Text style={styles.giftName}>Sagar Aryal</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.giftTreesSelectTrees}>Select Trees</Text>
              {/* <Icon name={'chevron-up'} size={14} color="#4d5153" /> */}
            </View>
          </View>

          <SelectTreeCount
            treeCount={props.treeCount}
            setTreeCount={props.setTreeCount}
            selectedProject={props.selectedProject}
          />

          <View style={styles.horizontalDivider} />
        </>
      )}

      {/* <TouchableOpacity>
          <Text style={styles.giftTreesAddRecepient}>
            Add another recipient
          </Text>
        </TouchableOpacity> */}
    </View>
  );
};

function SelectMultiTreeCount(props) {
  const [tempTreeCount, setTempTreeCount] = React.useState(0);
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
            let { giftDetails } = props;
            giftDetails[props.currentIndex].treeCount = option;
            giftDetails[props.currentIndex].isCustomCount = false;
            props.setGiftDetails(giftDetails);
            setTempTreeCount('');
          }}
          style={
            props.giftDetails[props.currentIndex].treeCount === option
              ? styles.selectedView
              : styles.selectorView
          }
        >
          <Text
            style={
              props.giftDetails[props.currentIndex].treeCount === option
                ? styles.selectedTreeCountText
                : styles.treeCountText
            }
          >
            {option} Trees
          </Text>
        </TouchableOpacity>
      ))}
      {props.giftDetails[props.currentIndex].isCustomCount ? (
        <View style={styles.customSelectedView}>
          <TextInput
            style={
              props.giftDetails[props.currentIndex].isCustomCount
                ? styles.treeCountTextInputSelected
                : styles.treeCountTextInput
            }
            onChangeText={treeCount => setTempTreeCount(treeCount)}
            onSubmitEditing={() => {
              let { giftDetails } = props;
              giftDetails[props.currentIndex].treeCount = Number(tempTreeCount);
              props.setGiftDetails(giftDetails);
            }}
            value={tempTreeCount}
            keyboardType={'number-pad'}
            autoFocus
          />
          <Text
            style={
              props.giftDetails[props.currentIndex].isCustomCount
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
            let { giftDetails } = props;
            giftDetails[props.currentIndex].treeCount = 0;
            giftDetails[props.currentIndex].isCustomCount = true;
            props.setGiftDetails(giftDetails);
          }}
          style={styles.customSelectorView}
        >
          <Text style={styles.customTreeCountText}>Custom Trees</Text>
        </TouchableOpacity>
      )}
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
