import React from 'react';
import { Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import i18n from '../../locales/i18n.js';
import { redeemImage, forward } from '../../assets';
import styles from '../../styles/redeem';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  Animated,
  Keyboard,
  ActivityIndicator,
  Platform
} from 'react-native';
import { TextField } from 'react-native-material-textfield';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-navigation';
import { Formik } from 'formik';
import { updateStaticRoute } from '../../helpers/routerHelper';
import HeaderNew from './../Header/HeaderNew.native';
import buttonStyles from '../../styles/common/button.native';
import colors from '../../utils/constants';

const height = Dimensions.get('window').height;

const AnimatedKeyboardAwareScrollView = Animated.createAnimatedComponent(
  KeyboardAwareScrollView
);

export default function Redemption(props) {
  const [scrollY] = React.useState(new Animated.Value(0));

  const [loadButton, setloadButton] = React.useState(false);
  const [buttonType, setButtonType] = React.useState('validate');

  const keyboardDidShow = () => {
    setButtonType('>');
  };

  const keyboardDidHide = () => {
    setButtonType('validate');
  };

  const type = props.type ? props.type : 'gift';
  const code = props.code ? props.code : '';

  let keyboardDidShowListener;
  let keyboardDidHideListener;
  React.useEffect(() => {
    keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      keyboardDidShow
    );
    keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      keyboardDidHide
    );
    // clean up
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const lockedButton = 'rgba(137, 181, 58, 0.19)';

  const style = {
    backgroundColor: "white",
    flex: 1,
    padding: 20,
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  };

  return (
    /*
    <View style={styles.mainContainer}>
      <HeaderNew title={''} navigation={props.navigation} />
      <Formik
        initialValues={{
          code: code
        }}
        onSubmit={(values, actions) => {
          setloadButton(true);
          props
            .validateCodeAction({
              type: type,
              code: values.code
            })
            .then(res => {
              if (res.data.status === 'error') {
                actions.setFieldError('code', res.data.errorText);
                setloadButton(false);
              } else {
                updateStaticRoute('redeem_add_trees', props.navigation, {
                  code: values.code,
                  type: type,
                  treeCount: res.data.treeCount,
                  tpoName: res.data.tpos[0] ? res.data.tpos[0].tpoName : '',
                  setRedemptionCode: props.setRedemptionCode
                });
                setloadButton(false);
              }
            });
        }}
      // validate={
      //   values => {
      //     let errors = {};
      //     setFormError('')
      //     props.validateCodeAction({
      //       type: 'gift',
      //       code: values.code
      //     }).then(res => {
      //       if (res.data.status === "error") {
      //         setFormError(res.data.errorText)
      //         //debug(res.data.errorText)
      //       } else {
      //         setFormError('')
      //       }
      //     })
      //     errors.code = formError;
      //     return errors;
      //   }
      // }
      >
        {props => (
          <>
            <AnimatedKeyboardAwareScrollView
              contentContainerStyle={styles.formScrollView}
              keyboardDismissMode="on-drag"
              keyboardShouldPersistTaps="always"
              resetScrollToCoords={{ x: 0, y: 0 }}
              scrollEnabled
              scrollEventThrottle={16}
              enableOnAndroid
              onScroll={Animated.event([
                {
                  nativeEvent: {
                    contentOffset: { y: scrollY }
                  }
                }
              ], { useNativeDriver: true })}
              extraScrollHeight={12}
            >
              <Text style={styles.mainTitle}>
                {i18n.t('label.redeem_trees')}
              </Text>
              <Text style={styles.titleText}>
                {i18n.t('label.redeem_heading')}
              </Text>
              <Image
                style={styles.imageStyle}
                resizeMode="contain"
                source={redeemImage}
              />
              <View style={styles.validateCodeInputContainer}>
                <TextField
                  label={i18n.t('label.validate_code_label')}
                  value={props.values.code}
                  tintColor={'#89b53a'}
                  titleFontSize={12}
                  lineWidth={1}
                  autoCapitalize={'characters'}
                  labelTextStyle={{ fontFamily: 'OpenSans-Regular' }}
                  titleTextStyle={{
                    fontFamily: 'OpenSans-SemiBold',
                    textTransform: 'uppercase'
                  }}
                  returnKeyType="done"
                  affixTextStyle={{ fontFamily: 'OpenSans-Regular' }}
                  error={props.errors.code}
                  onChangeText={props.handleChange('code')}
                  onBlur={props.handleBlur('code')}
                  onSubmitEditing={props.handleSubmit}
                />
              </View>
            </AnimatedKeyboardAwareScrollView>

            {buttonType === 'validate' ? (
              !props.isValid ? (
                <View
                  style={[
                    buttonStyles.actionButtonTouchable,
                    { alignSelf: 'center', paddingHorizontal: 24 },
                    Platform.OS === 'ios'
                      ? height < 500
                        ? { bottom: '14%' }
                        : { bottom: '6%' }
                      : null
                  ]}
                >
                  <View
                    style={[
                      buttonStyles.actionButtonView,
                      { backgroundColor: lockedButton }
                    ]}
                  >
                    {loadButton ? (
                      <ActivityIndicator size="large" color={colors.WHITE} />
                    ) : (
                        <Text style={buttonStyles.actionButtonText}>
                          {i18n.t('label.validate_code')}
                        </Text>
                      )}
                  </View>
                </View>
              ) : (
                  <TouchableOpacity
                    style={[
                      buttonStyles.actionButtonTouchable,
                      { alignSelf: 'center', paddingHorizontal: 24 },
                      Platform.OS === 'ios'
                        ? height < 500
                          ? { bottom: '14%' }
                          : { bottom: '6%' }
                        : null
                    ]}
                    onPress={props.handleSubmit}
                  >
                    <View style={[buttonStyles.actionButtonView]}>
                      {loadButton ? (
                        <ActivityIndicator size="large" color={colors.WHITE} />
                      ) : (
                          <Text style={buttonStyles.actionButtonText}>
                            {i18n.t('label.validate_code')}
                          </Text>
                        )}
                    </View>
                  </TouchableOpacity>
                )
            ) : null}

            {buttonType === '>' ? (
              <TouchableOpacity
                style={[
                  buttonStyles.actionButtonSmallTouchable,
                  { bottom: '8%', right: '8%' },
                  !props.isValid ? { backgroundColor: lockedButton } : {}
                ]}
                onPress={props.handleSubmit}
              >
                {loadButton ? (
                  <ActivityIndicator size="large" color={colors.WHITE} />
                ) : (
                    <Image
                      source={forward}
                      resizeMode="cover"
                      style={buttonStyles.actionButtonSmallImage}
                    />
                  )}
              </TouchableOpacity>
            ) : null}
          </>
        )}
      </Formik>
    </View>
    */
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.WHITE }}>
      <HeaderNew
        navigation={props.navigation}
        title={i18n.t('label.redeem_trees')}
      />
      <View style={style}>
        <View style={{ paddingBottom: 20 }}>
          <Image
            source={require("../../assets/images/gifts.png")}
            style={{ width: 220, height: 220 }}
          />
        </View>

        <Text
          style={{
            fontSize: 16,
            color: "#4d5153",
            fontFamily: "OpenSans-Regular",
            textAlign: "center"
          }}
        >
          {i18n.t("label.changed_challenge_workflow")}
        </Text>
      </View>
    </SafeAreaView>
  );
}

Redemption.navigationOptions = {
  header: null
};

Redemption.propTypes = {
  navigation: PropTypes.any
};
