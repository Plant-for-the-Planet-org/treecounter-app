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
  ActivityIndicator
} from 'react-native';
import { updateStaticRoute } from '../../helpers/routerHelper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { TextField } from 'react-native-material-textfield';
import HeaderAnimated from './../Header/HeaderAnimated.native';
import { SafeAreaView } from 'react-navigation';
import { Formik } from 'formik';
import buttonStyles from '../../styles/common/button.native';

export default function Redemption(props) {
  const [scrollY] = React.useState(new Animated.Value(0));
  const value = '';

  const [loadButton, setloadButton] = React.useState(false);
  const [buttonType, setButtonType] = React.useState('validate');

  const keyboardDidShow = () => {
    setButtonType('>');
  };

  const keyboardDidHide = () => {
    setButtonType('validate');
  };

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
  return (
    <SafeAreaView style={styles.safeAreaViewContainer}>
      <View style={styles.mainContainer}>
        <HeaderAnimated
          navigation={props.navigation}
          title={i18n.t('label.redeem_trees')}
          scrollY={scrollY}
        />
        <Formik
          initialValues={{
            code: ''
          }}
          onSubmit={(values, actions) => {
            setloadButton(true);
            props
              .validateCodeAction({
                type: 'gift',
                code: values.code
              })
              .then(res => {
                if (res.data.status === 'error') {
                  actions.setFieldError('code', res.data.errorText);
                  setloadButton(false);
                } else {
                  updateStaticRoute('redeem_add_trees', props.navigation, {
                    code: values.code
                  });
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
                    value={value}
                    tintColor={'#89b53a'}
                    titleFontSize={12}
                    lineWidth={1}
                    labelTextStyle={{ fontFamily: 'OpenSans-Regular' }}
                    titleTextStyle={{ fontFamily: 'OpenSans-SemiBold' }}
                    affixTextStyle={{ fontFamily: 'OpenSans-Regular' }}
                    blurOnSubmit={false}
                    error={props.errors.code}
                    onChangeText={props.handleChange('code')}
                    onBlur={props.handleBlur('code')}
                  />
                  {console.log('Error', props.errors.code)}
                </View>
              </KeyboardAwareScrollView>

              {buttonType === 'validate' ? (
                <TouchableOpacity
                  style={buttonStyles.actionButtonTouchable}
                  onPress={props.handleSubmit}
                >
                  <View style={buttonStyles.actionButtonView}>
                    {loadButton ? (
                      <ActivityIndicator size="large" color="#ffffff" />
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
                  style={buttonStyles.actionButtonSmallTouchable}
                  onPress={props.handleSubmit}
                >
                  {loadButton ? (
                    <ActivityIndicator size="large" color="#ffffff" />
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
    </SafeAreaView>
  );
}

Redemption.navigationOptions = {
  header: null
};

Redemption.propTypes = {
  navigation: PropTypes.any
};
