import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { SafeAreaView } from 'react-navigation';
import giftplant from '../../assets/svgAssets/giftTrees/giftPlant';
import { updateStaticRoute } from '../../helpers/routerHelper';
import i18n from '../../locales/i18n';
import styles from '../../styles/gifttrees/giftrees';
import HeaderNew from '../Header/HeaderNew';

const NewGiftTrees = props => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <HeaderNew title={''} navigation={props.navigation} />
      <View style={styles.nMainContainer}>
        <Text
          style={{
            fontFamily: 'OpenSans-Bold',
            fontSize: 27,
            lineHeight: 40,
            letterSpacing: 0,
            textAlign: 'left',
            color: '#4d5153'
          }}
        >
          {i18n.t('label.gift_trees')}
        </Text>
        <Text style={styles.nGiftDesc}>
          {i18n.t('label.gift_tree_description_new')}
        </Text>
        {/* <Image source={giftplant} style={styles.giftImage} /> */}
        <SvgXml style={styles.giftImage} xml={giftplant} />
        <View
          style={{
            position: 'absolute',
            bottom: '12%',
            width: '100%',
            alignSelf: 'center'
          }}
        >
          <TouchableOpacity
            onPress={() =>
              updateStaticRoute('gift_user_email', props.navigation, {
                setGiftContextDetails: props.setGiftContextDetails
              })
            }
            style={{
              alignSelf: 'center',
              paddingHorizontal: 20,
              width: '100%'
            }}
          >
            <View style={styles.actionButtonView2}>
              <Text style={styles.actionButtonText2}>
                Enter Receiver’s details
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              updateStaticRoute('select_contacts_gift', props.navigation, {
                setGiftContextDetails: props.setGiftContextDetails
              })
            }
            style={{
              alignSelf: 'center',
              paddingHorizontal: 20,
              width: '100%',
              marginTop: 16
            }}
          >
            <View style={styles.actionButtonView}>
              <Text style={styles.actionButtonText}>Select from contacts</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default NewGiftTrees;
