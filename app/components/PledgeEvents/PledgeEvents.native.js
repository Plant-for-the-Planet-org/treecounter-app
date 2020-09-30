import React from 'react';
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Platform
} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import { SafeAreaView } from 'react-navigation';
import { getImageUrl } from '../../actions/apiRouting';
import { nextArrowWhite } from '../../assets';
import { updateStaticRoute } from '../../helpers/routerHelper';
import i18n from '../../locales/i18n';
import CardLayout from '../Common/Card';
import styles from './../../styles/pledgeevents/pledgeevents.native';
import { delimitNumbers } from './../../utils/utils';
import LoadingIndicator from './../Common/LoadingIndicator';
import { PledgeTabView, TabButtons } from './PledgeTabView.native';
import { Header } from './../DonateTrees/components/Header';
const PledgeEvents = props => {
  const [showRBSheetState, setShowRBSheetState] = React.useState(true);
  const pledges = props.pledges;
  const navigation = props.navigation;
  const myPledge = props.myPledge;
  const RBSheetRef = React.useRef('');
  const [tabselected, setTabSelected] = React.useState('recent');

  React.useEffect(() => {
    if (props.showRBSheet && showRBSheetState) {
      RBSheetRef.current.open();
      setShowRBSheetState(false);
    }
    return () => {
      setShowRBSheetState(true);
    };
  }, [props.showRBSheet]);

  return props.loading ? (
    <LoadingIndicator contentLoader screen={'PledgeEvents'} />
  ) : (
    <SafeAreaView style={styles.peRootView}>
      <ScrollView
        stickyHeaderIndices={[1]}
        contentContainerStyle={styles.peRootScrollView}
        scrollEnabled
      >
        <View style={{ marginHorizontal: 20 }}>
          <Header navigation={navigation} useBackIcon />
          <Image
            style={[
              styles.peHeaderLogo,
              Platform.OS === 'ios' ? null : { marginTop: -40 }
            ]}
            source={{
              uri: getImageUrl('event', 'thumb', pledges.image)
            }}
            resizeMode="contain"
          />
          <Text style={styles.eventTitle}>{pledges.name}</Text>
          {pledges && pledges.total ? (
            <Text style={styles.eventSubTitle}>
              {i18n.t('label.treesPledgedAllPledges', {
                treeCount: delimitNumbers(pledges.total)
              })}
            </Text>
          ) : null}
        </View>

        {pledges && pledges.total > 0 ? (
          <TabButtons
            tabselected={tabselected}
            setTabSelected={setTabSelected}
          />
        ) : null}

        {pledges && (
          <EventDetails tabselected={tabselected} pledges={pledges} />
        )}
        {/* This opens when the user has just created the Pledge  */}
        <RBSheet
          ref={RBSheetRef}
          height={354}
          duration={250}
          customStyles={{
            container: {
              justifyContent: 'center'
            }
          }}
        >
          <View style={styles.baContainer}>
            <Text style={styles.baMessage}>
              {i18n.t('label.pledgeAddedMessage', {
                treeCount: props.treeCount
              })}
            </Text>

            <View style={styles.baButtonContainer}>
              <TouchableOpacity
                style={styles.baLaterButton}
                onPress={() => {
                  props.fetchPledgesAction(props.slug);
                  RBSheetRef.current.close();
                }}
              >
                <Text style={styles.baLaterText}>
                  {i18n.t('label.pledgeAddedLaterButton')}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.baContinueButton}
                onPress={() => {
                  const {
                    navigation,
                    selectPlantProjectAction,
                    contextActions
                  } = props;
                  navigateToDonationDetails(
                    navigation,
                    pledges,
                    myPledge,
                    selectPlantProjectAction,
                    contextActions
                  );
                }}
              >
                <Text style={styles.baContinueText}>
                  {i18n.t('label.pledgeAddedContinueButton')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </RBSheet>
      </ScrollView>

      {typeof myPledge !== 'undefined' && myPledge !== null ? (
        myPledge.length > 0 ? (
          <FulfillPledgeButton
            myPledge={myPledge[0]}
            pledges={pledges}
            selectPlantProjectAction={props.selectPlantProjectAction}
            navigation={navigation}
            contextActions={props.contextActions}
          />
        ) : (
          <MakePledgeButton navigation={navigation} pledges={pledges} />
        )
      ) : (
        <MakePledgeButton navigation={navigation} pledges={pledges} />
      )}
    </SafeAreaView>
  );
};

PledgeEvents.navigationOptions = {
  header: null
};

function MakePledgeButton(props) {
  return (
    <TouchableOpacity
      style={styles.makePledgeButton}
      onPress={() => {
        updateStaticRoute('app_pledge_form', props.navigation, {
          slug: props.pledges.slug,
          plantProject: props.pledges.plantProject
        });
      }}
    >
      <View style={styles.makePledgeButtonView}>
        <Text style={styles.makePledgeButtonText}>
          {i18n.t('label.makePledgeButton')}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

function FulfillPledgeButton(props) {
  const imageStyle = {
    height: 30
  };
  return (
    <View style={styles.bottomButtonView}>
      <View style={styles.leftSection}>
        <Text style={styles.pledgeTreesAmount}>
          {i18n.t('label.treesPledgedAllPledges', {
            treeCount: delimitNumbers(props.myPledge.treeCount)
          })}
        </Text>
        <TouchableOpacity
          onPress={() => {
            updateStaticRoute('app_pledge_update_form', props.navigation, {
              unfulfilledEvent: props.myPledge,
              slug: props.pledges.slug,
              plantProject: props.pledges.plantProject
            });
          }}
        >
          <Text style={styles.pledgeTreesAction}>
            {i18n.t('label.increaseMyPledge')}
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={() => {
          const {
            navigation,
            pledges,
            myPledge,
            selectPlantProjectAction,
            contextActions
          } = props;
          navigateToDonationDetails(
            navigation,
            pledges,
            myPledge,
            selectPlantProjectAction,
            contextActions
          );
        }}
      >
        <View style={styles.continueButtonView}>
          <Image
            style={imageStyle}
            source={nextArrowWhite}
            resizeMode="contain"
          />
          <Text style={styles.continueText}>{i18n.t('label.donate')}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

function navigateToDonationDetails(
  navigation,
  pledges,
  myPledge,
  selectPlantProjectAction,
  contextActions
) {
  selectPlantProjectAction(pledges.plantProject.id);

  contextActions.setDonorDetails({
    firstName: myPledge.firstname,
    lastName: myPledge.lastname,
    email: myPledge.email
  });

  contextActions.setPledgeDetails({
    firstName: myPledge.firstname,
    lastName: myPledge.lastname,
    treeCount: myPledge.treeCount,
    email: myPledge.email,
    isAnonymous: myPledge.isAnonymous,
    token: myPledge.token,
    lastIncremented: myPledge.lastIncremented,
    image: pledges.image,
    eventName: pledges.name,
    eventDate: pledges.eventDate
  });
  contextActions.setDonationContext('pledge');

  updateStaticRoute('app_donate_detail', navigation, {
    id: pledges.plantProject.id
  });
}

const EventDetails = props => {
  let pledges = props.pledges;

  return (
    <>
      {pledges.highestPledgeEvents && pledges.highestPledgeEvents.length > 0 ? (
        <PledgeTabView pledges={pledges} tabselected={props.tabselected} />
      ) : (
        <Text style={styles.eventSubTitle}>{i18n.t('label.noPledges')}</Text>
      )}

      {/* Show Event Images */}
      {pledges.pledgeEventImages && pledges.pledgeEventImages.length > 0 ? (
        <EventImages pledgeEventImages={pledges.pledgeEventImages} />
      ) : null}

      {/* Show Event description */}
      {pledges.description ? (
        <CardLayout style={styles.peDescriptionView}>
          <Text style={styles.peDescriptionText}>{pledges.description}</Text>
        </CardLayout>
      ) : null}
    </>
  );
};

function EventImages(props) {
  const pledgeImages = props.pledgeEventImages;
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.peSliderScrollView}
    >
      {pledgeImages.map((pledgeImage, index) => (
        <Image
          key={`pledgeImage-${index}`}
          style={styles.peSliderImage}
          source={{
            uri: getImageUrl('eventGallery', 'default', pledgeImage.image)
          }}
          resizeMode="contain"
        />
      ))}
    </ScrollView>
  );
}

export default PledgeEvents;
