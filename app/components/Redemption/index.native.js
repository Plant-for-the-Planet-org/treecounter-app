import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LoadingIndicator from '../Common/LoadingIndicator';
import i18n from '../../locales/i18n.js';
import TouchableItem from '../../components/Common/TouchableItem';
import { redeemImage } from '../../assets';
import styles from '../../styles/redeem';
import {
  View,
  Image,
  TextInput,
  Text,
  TouchableOpacity,
  Animated
} from 'react-native';
import { updateRoute } from '../../helpers/routerHelper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { TextField } from 'react-native-material-textfield';
import HeaderAnimated from './../Header/HeaderAnimated.native';
import { SafeAreaView } from 'react-navigation';
import { Formik } from 'formik';

export default function Redemption(props) {
  const [scrollY, setScrollY] = React.useState(new Animated.Value(0));
  const value = '';
  return (
    <SafeAreaView style={styles.createPledgeRootView}>
      <View>
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
                onScroll={Animated.event([
                  {
                    nativeEvent: {
                      contentOffset: { y: scrollY }
                    }
                  }
                ])}
              >
                <Text style={styles.titleText}>Subheading</Text>
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
            </>
          )}
        </Formik>
      </View>
    </SafeAreaView>
  );
}

Redemption.propTypes = {
  navigation: PropTypes.any
};
