import React from 'react';
import { Animated, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
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
import HeaderAnimatedImage from './../Header/HeaderAnimatedImage.native';
import PledgeTabView from './PledgeTabView.native';

const PledgeEvents = props => {
  const [scrollY, setScrollY] = React.useState(new Animated.Value(0));
  const [showRBSheetState, setShowRBSheetState] = React.useState(true);
  const pledges = props.pledges;
  const navigation = props.navigation;
  const myPledge = props.myPledge;
  const RBSheetRef = React.useRef('');

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
        <View style={{ paddingBottom: 100 }}>
          <HeaderAnimatedImage
            navigation={navigation}
            title={pledges.name}
            scrollY={scrollY}
            titleStyle={styles.eventTitle}
            imageStyle={styles.peHeaderLogo}
            imageSource={{
              uri: getImageUrl('event', 'thumb', pledges.image)
            }}
          />

          <EventDetails pledges={pledges} scrollY={scrollY} />

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
                    const { navigation, selectPlantProjectAction } = props;
                    navigateToDonationDetails(
                      navigation,
                      pledges,
                      myPledge,
                      selectPlantProjectAction,
                      contextActions = props.contextActions
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
        </View>
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
    email: myPledge.email,
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

  contextActions.setSelectedProjectDetails({
    currency: pledges.plantProject.currency,
    amountPerTree: pledges.plantProject.treeCost,
    plantProjectID: pledges.plantProject.id
  });

  contextActions.setDonationContext('pledge');

  updateStaticRoute('app_donate_detail', navigation, {
    id: pledges.plantProject.id,
    userForm: navigation.getParam('userForm'),
  });
}

function EventDetails(props) {
  let pledges = props.pledges;
  return (
    <ScrollView
      contentContainerStyle={styles.peRootScrollView}
      scrollEnabled
      scrollEventThrottle={16}
      onScroll={Animated.event([
        { nativeEvent: { contentOffset: { y: props.scrollY } } }
      ])}
    >
      {pledges &&
        pledges.highestPledgeEvents &&
        pledges.highestPledgeEvents.length > 0 ? (
          // If there are Pledges
          <View>
            <Text style={styles.eventSubTitle}>
              {i18n.t('label.treesPledgedAllPledges', {
                treeCount: delimitNumbers(pledges.total)
              })}
            </Text>
            {/* All the pledges are here */}
            <PledgeTabView pledges={pledges} />
          </View>
        ) : (
          // If there are no Pledges
          <View>
            <Text style={styles.eventSubTitle}>{i18n.t('label.noPledges')}</Text>
          </View>
        )}

      {/* Show Event Images */}
      {pledges &&
        pledges.pledgeEventImages &&
        pledges.pledgeEventImages.length > 0 ? (
          <EventImages pledgeEventImages={pledges.pledgeEventImages} />
        ) : null}

      {/* Show Event description */}
      {pledges.description ? (
        <CardLayout style={styles.peDescriptionView}>
          <Text style={styles.peDescriptionText}>{pledges.description}</Text>
        </CardLayout>
      ) : null}
    </ScrollView>
  );
}

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
