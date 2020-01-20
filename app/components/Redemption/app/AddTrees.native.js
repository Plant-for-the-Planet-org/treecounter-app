import React from 'react';
import styles from '../../../styles/redeem';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  ActivityIndicator,
  ScrollView,
  Platform
} from 'react-native';
import HeaderNew from './../../Header/HeaderNew.native';
import { SafeAreaView } from 'react-navigation';
import buttonStyles from '../../../styles/common/button.native';
import PropTypes from 'prop-types';
import { updateRoute } from '../../../helpers/routerHelper';
import i18n from '../../../locales/i18n.js';
import { delimitNumbers } from '../../../utils/utils';

export default function AddTrees(props) {
  const [scrollY] = React.useState(new Animated.Value(0));
  const [loadButton, setloadButton] = React.useState(false);
  const [errorText, seterrorText] = React.useState('');

  const redeemCode = () => {
    setloadButton(true),
      props.navigation
        .getParam('setRedemptionCode')({
          type: props.navigation.getParam('type'),
          code: props.navigation.getParam('code')
        })
        .then(res => {
          if (res.data.response.status === 'error') {
            seterrorText(true);
            setloadButton(false);
          } else {
            updateRoute('app_myTrees', props.navigation);
            setloadButton(false);
          }
        });
  };
  const white = '#ffffff';
  const treeCount = props.navigation.getParam('treeCount');

  return (
    <SafeAreaView style={styles.safeAreaViewContainer}>
      <View style={styles.mainContainer}>
        <HeaderNew
          navigation={props.navigation}
          title={
            treeCount > 1
              ? i18n.t('label.RedeemxTrees', { treeCount })
              : i18n.t('label.RedeemxTrees', { treeCount })
          }
          scrollY={scrollY}
        />
        <View style={styles.subheader}>
          <Text style={styles.subheaderClaiming}>
            {i18n.t('label.claiming')} {props.navigation.getParam('code')}
          </Text>
          {errorText ? (
            <Text style={styles.alreadyRedeemed}>
              {i18n.t('label.already_redeemed_trees')}
            </Text>
          ) : (
            <Text style={styles.subheaderTrees}>
              {i18n.t('label.trees_in_code')}
            </Text>
          )}
        </View>
        <ScrollView>
          {/* Single Redeem Object */}
          {errorText ? null : (
            <View style={styles.singleRedeemObject}>
              {/* if Date */}
              {/* <View style={styles.redeemObjectDate}>
              <Text style={styles.redeemObjectDateText}>March 7, 2019</Text>
            </View> */}
              {/* Trees to be redeemed */}
              <View style={styles.redeemObjectTreesContainer}>
                <View style={styles.row1}>
                  <Text style={styles.redeemObjectTitle}>
                    {i18n.t('label.you_can_redeem')}
                  </Text>
                  <Text style={styles.redeemObjectTrees}>
                    {delimitNumbers(treeCount)}
                  </Text>
                </View>
                <View style={styles.row2}>
                  <Text style={styles.redeemObjectSubTitle}>
                    {i18n.t('label.planted_by')}{' '}
                    {props.navigation.getParam('tpoName')}
                  </Text>
                  <Text style={styles.redeemObjectSubTitle}>
                    {treeCount > 1
                      ? i18n.t('label.trees')
                      : i18n.t('label.tree')}
                  </Text>
                </View>
              </View>
            </View>
          )}
        </ScrollView>
        <TouchableOpacity
          style={[
            buttonStyles.actionButtonTouchable,
            { alignSelf: 'center', paddingHorizontal: 24 },
            Platform.OS === 'ios' ? { bottom: '14%' } : null
          ]}
          onPress={() => redeemCode()}
        >
          <View style={buttonStyles.actionButtonView}>
            {loadButton ? (
              <ActivityIndicator size="large" color={white} />
            ) : (
              <Text style={buttonStyles.actionButtonText}>
                {i18n.t('label.add_my_trees')}
              </Text>
            )}
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

AddTrees.navigationOptions = {
  header: null
};

AddTrees.propTypes = {
  navigation: PropTypes.any
};
