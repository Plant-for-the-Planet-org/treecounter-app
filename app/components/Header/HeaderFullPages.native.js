import React from 'react';
import { Animated, BackHandler, Dimensions, Image, Platform, Share, TouchableOpacity, View } from 'react-native';
import { closeHBlack, closeHWhite, shareBlack, shareWhite } from '../../assets';
import { updateStaticRoute } from '../../helpers/routerHelper';
import i18n from '../../locales/i18n';

const Layout = {
  window: {
    height: Dimensions.get('window').height - (56 + 70 + 20),
    width: Dimensions.get('window').width
  }
};
export default function HeaderAnimated(props) {
  const headerOpacityReverse = props.scrollY.interpolate({
    inputRange: [
      0,
      Layout.window.width * 0.7833 * 0.9,
      Layout.window.width * 0.7833 * 0.96
    ],
    outputRange: [0, 0, 1],
    extrapolate: 'clamp'
  });

  // const iconColor = props.scrollY.interpolate({
  //   inputRange: [0, 32, 72],
  //   outputRange: [0, 0, 1],
  //   extrapolate: 'clamp'
  // });

  let navigateBack = () => {
    props.navigation.goBack();
    return true;
  };
  const backHandler = () => {
    let { navigation, donationContext } = props;
    console.log(donationContext)
    if (navigation && donationContext.selectedProject) {
      updateStaticRoute('app_donate_detail', navigation, {
        userForm: navigation.getParam('userForm'),
        giftMethod: navigation.getParam('giftMethod'),
      });
    } else {
      navigateBack();
    }
  }
  React.useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', navigateBack);
    // clean up
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', navigateBack);
    };
  });

  let onShare = async (entityType, entityName, url, appurl) => {
    try {
      if (entityType === 'projects') {
        const result = await Share.share({
          message: i18n.t('label.shareProject', {
            entityName: entityName,
            url: url,
            appurl: appurl
          })
        });
        if (result.action === Share.sharedAction) {
          if (result.activityType) {
            // shared with activity type of result.activityType
          } else {
            // shared
          }
        } else if (result.action === Share.dismissedAction) {
          // dismissed
        }
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const whiteColor = 'white';
  const transparent = 'rgba(52, 52, 52, 0.0)';
  return (
    <>
      <Animated.View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          backgroundColor: whiteColor,
          height: Platform.OS === 'ios' ? 96 : 76,
          zIndex: 1000,
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
          paddingTop: Platform.OS === 'ios' ? 44 : 24,
          opacity: headerOpacityReverse
        }}
      >
        <View
          style={{
            height: 48,
            width: 48,
            justifyContent: 'center',
            marginLeft: 12
          }}
        >
          <TouchableOpacity
            style={{
              height: 38,
              width: 38,
              zIndex: 1001,
              justifyContent: 'center',
              alignSelf: 'center'
            }}
            onPress={backHandler}
          >
            <Image
              source={closeHBlack}
              style={{
                height: 24,
                width: 24,
                alignSelf: 'center'
              }}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            height: 48,
            width: 48,
            justifyContent: 'center',
            marginRight: 12
          }}
        >
          <TouchableOpacity
            style={{
              height: 38,
              width: 38,
              zIndex: 1001,
              justifyContent: 'center',
              alignSelf: 'center'
            }}
            onPress={() =>
              onShare(
                props.entityType,
                props.entityName,
                props.url,
                props.appurl
              )
            }
          >
            <Image
              source={shareBlack}
              style={{
                height: 24,
                width: 24,
                alignSelf: 'center'
              }}
            />
          </TouchableOpacity>
        </View>
      </Animated.View>
      <Animated.View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          backgroundColor: transparent,
          height: Platform.OS === 'ios' ? 96 : 76,
          zIndex: 999,
          alignItems: 'center',
          justifyContent: 'space-between',
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
          paddingTop: Platform.OS === 'ios' ? 44 : 24
        }}
      >
        <View
          style={{
            height: 48,
            width: 48,
            justifyContent: 'center',
            marginLeft: 12
          }}
        >
          <TouchableOpacity
            style={{
              height: 38,
              width: 38,
              zIndex: 1001,
              justifyContent: 'center',
              alignSelf: 'center'
            }}
            onPress={() => props.navigation.goBack()}
          >
            <Image
              source={closeHWhite}
              style={{
                height: 24,
                width: 24,
                alignSelf: 'center'
              }}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            height: 48,
            width: 48,
            justifyContent: 'center',
            marginRight: 12
          }}
        >
          <TouchableOpacity
            style={{
              height: 38,
              width: 38,
              zIndex: 1001,
              justifyContent: 'center',
              alignSelf: 'center'
            }}
            onPress={() =>
              onShare(props.entityType, props.entityName, props.url)
            }
          >
            <Image
              source={shareWhite}
              style={{
                height: 24,
                width: 24,
                alignSelf: 'center'
              }}
            />
          </TouchableOpacity>
        </View>
      </Animated.View>
    </>
  );
}
