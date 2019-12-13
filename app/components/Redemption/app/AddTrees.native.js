import React from 'react';
import styles from '../../../styles/redeem';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  ScrollView
} from 'react-native';
import HeaderAnimated from './../../Header/HeaderAnimated.native';
import { SafeAreaView } from 'react-navigation';
import buttonStyles from '../../../styles/common/button.native';
import PropTypes from 'prop-types';
import { updateStaticRoute } from '../../../helpers/routerHelper';
import i18n from '../../../locales/i18n.js';

export default function AddTrees(props) {
  const [scrollY] = React.useState(new Animated.Value(0));

  const redeemObject = [
    {
      type: 'donation',
      category: 'default',
      treeCount: 100,
      date: '2019-10-24',
      tpo: 'Plant for the Planet'
    },
    {
      type: 'donation',
      category: 'default',
      treeCount: 500,
      date: '2019-10-24',
      tpo: 'Plant for the Planet'
    },
    {
      type: 'donation',
      category: 'gift',
      treeCount: 200,
      date: '2019-10-20',
      tpo: 'Plant for the Planet',
      giftRecipient: 'Sagar Aryal'
    }
  ];
  return (
    <SafeAreaView style={styles.safeAreaViewContainer}>
      <View style={styles.mainContainer}>
        <HeaderAnimated
          navigation={props.navigation}
          title={'Redeem 20,500 Trees'}
          scrollY={scrollY}
        />
        <View style={styles.subheader}>
          <Text style={styles.subheaderClaiming}>
            {i18n.t('label.claiming')} {props.navigation.getParam('code')}
          </Text>
          <Text style={styles.subheaderTrees}>
            {i18n.t('label.trees_in_code')}
          </Text>
        </View>
        <ScrollView>
          {/* Single Redeem Object */}
          <View style={styles.singleRedeemObject}>
            {/* if Date */}
            <View style={styles.redeemObjectDate}>
              <Text style={styles.redeemObjectDateText}>March 7, 2019</Text>
            </View>
            {/* Trees to be redeemed */}
            <View style={styles.redeemObjectTreesContainer}>
              <View style={styles.row1}>
                <Text style={styles.redeemObjectTitle}>Gift to S. William</Text>
                <Text style={styles.redeemObjectTrees}>10,000</Text>
              </View>
              <View style={styles.row2}>
                <Text style={styles.redeemObjectSubTitle}>
                  Planted by Plant-for-the-Planet
                </Text>
                <Text style={styles.redeemObjectSubTitle}>Trees</Text>
              </View>
            </View>
          </View>
        </ScrollView>
        <TouchableOpacity
          style={buttonStyles.actionButtonTouchable}
          onPress={() =>
            updateStaticRoute('redeem_see_project', props.navigation)
          }
        >
          <View style={buttonStyles.actionButtonView}>
            <Text style={buttonStyles.actionButtonText}>
              {'Add to my Trees'}
            </Text>
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
