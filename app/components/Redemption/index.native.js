import React from 'react';
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
  SafeAreaView
} from 'react-native';
import { updateStaticRoute } from '../../helpers/routerHelper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { TextField } from 'react-native-material-textfield';
import HeaderAnimated from './../Header/HeaderAnimated.native';
// import { SafeAreaView } from 'react-navigation';
import { Formik } from 'formik';
import buttonStyles from '../../styles/common/button.native';

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

  const white = '#ffffff';

  return (
    <SafeAreaView style={styles.safeAreaViewContainer}>
      <View style={styles.mainContainer}>
        <HeaderAnimated
          navigation={props.navigation}
          title={''}
          scrollY={scrollY}
        />
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
                    tpoName: res.data.tpos[0].tpoName,
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
          //         console.log(res.data.errorText)
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
              <KeyboardAwareScrollView
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
                ])}
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

                {buttonType === 'validate' ? (
                  <TouchableOpacity
                    style={[
                      buttonStyles.actionButtonTouchable,
                      { alignSelf: 'center' },
                      Platform.OS === 'ios' ? { bottom: '14%' } : null
                    ]}
                    onPress={props.handleSubmit}
                  >
                    <View style={buttonStyles.actionButtonView}>
                      {loadButton ? (
                        <ActivityIndicator size="large" color={white} />
                      ) : (
                        <Text style={buttonStyles.actionButtonText}>
                          {i18n.t('label.validate_code')}
                        </Text>
                      )}
                    </View>
                  </TouchableOpacity>
                ) : null}

                {buttonType === '>' ? (
                  <TouchableOpacity
                    style={[
                      buttonStyles.actionButtonSmallTouchable,
                      { top: '90%', left: '90%' }
                    ]}
                    onPress={props.handleSubmit}
                  >
                    {loadButton ? (
                      <ActivityIndicator size="large" color={white} />
                    ) : (
                      <Image
                        source={forward}
                        resizeMode="cover"
                        style={buttonStyles.actionButtonSmallImage}
                      />
                    )}
                  </TouchableOpacity>
                ) : null}
              </KeyboardAwareScrollView>
            </>
          )}
        </Formik>
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
