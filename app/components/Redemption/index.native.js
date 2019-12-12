import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LoadingIndicator from '../Common/LoadingIndicator';
import i18n from '../../locales/i18n.js';
import TouchableItem from '../../components/Common/TouchableItem';
import { redeemImage, forward } from '../../assets';
import styles from '../../styles/redeem';
import {
  View,
  Image,
  TextInput,
  Text,
  TouchableOpacity,
  Animated,
  Keyboard
} from 'react-native';
import { updateRoute, updateStaticRoute } from '../../helpers/routerHelper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { TextField } from 'react-native-material-textfield';
import HeaderAnimated from './../Header/HeaderAnimated.native';
import { SafeAreaView } from 'react-navigation';
import { Formik } from 'formik';
import buttonStyles from '../../styles/common/button.native';

export default function Redemption(props) {
  const [scrollY, setScrollY] = React.useState(new Animated.Value(0));
  const value = '';

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
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={{ flex: 1 }}>
        <HeaderAnimated
          navigation={props.navigation}
          title={i18n.t('Redeem Trees')}
          scrollY={scrollY}
        />
        <Formik
          initialValues={{
            code: ''
          }}
          onSubmit={values => {
            const data = {
              code: values.code
            };
            console.log(data);
            updateStaticRoute('redeem_add_trees', props.navigation);
          }}
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
                  You can use this tool to add trees to your tree counter using
                  Tree Voucher or a Merchandise Code
                </Text>
                <Image
                  style={styles.imageStyle}
                  resizeMode="contain"
                  source={redeemImage}
                />
                <View style={{ marginTop: 40 }}>
                  <View>
                    <TextField
                      label={i18n.t('Please type Code to Redeem')}
                      value={value}
                      tintColor={'#89b53a'}
                      titleFontSize={12}
                      lineWidth={1}
                      labelTextStyle={{ fontFamily: 'OpenSans-Regular' }}
                      titleTextStyle={{ fontFamily: 'OpenSans-SemiBold' }}
                      affixTextStyle={{ fontFamily: 'OpenSans-Regular' }}
                      blurOnSubmit={false}
                      error={props.touched.code && props.errors.code}
                      onChangeText={props.handleChange('code')}
                      onBlur={props.handleBlur('code')}
                    />
                  </View>
                </View>
              </KeyboardAwareScrollView>

              {buttonType === 'validate' ? (
                <TouchableOpacity
                  style={buttonStyles.actionButtonTouchable}
                  onPress={props.handleSubmit}
                >
                  <View style={buttonStyles.actionButtonView}>
                    <Text style={buttonStyles.actionButtonText}>
                      {i18n.t('Validate Code')}
                    </Text>
                  </View>
                </TouchableOpacity>
              ) : null}

              {buttonType === '>' ? (
                <TouchableOpacity
                  style={buttonStyles.actionButtonSmallTouchable}
                  onPress={props.handleSubmit}
                >
                  <Image
                    source={forward}
                    resizeMode="cover"
                    style={buttonStyles.actionButtonSmallImage}
                  />
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
