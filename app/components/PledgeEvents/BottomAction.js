import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image, Linking } from 'react-native';
import { updateStaticRoute, updateRoute } from '../../helpers/routerHelper';
import { getLocalRoute } from '../../actions/apiRouting';
import { successAnimated } from '../../assets';
import styles from './../../styles/pledgeevents/pledgeevents.native';
import i18n from '../../locales/i18n';

export default class BottomAction extends Component {
  render() {
    const route = 'app_donateTrees';
    treeCount = this.props.treeCount.toLocaleString();
    return (
      <View>
        <View
          style={{
            padding: 20,
            paddingVertical: 30
          }}
        >
          {/* <Image
            source={successAnimated}
            style={styles.baSuccessImage}
            resizeMode="cover"
          /> */}
          <Text style={styles.baMessage}>
            {i18n.t('label.pledgeAddedMessage', {
              treeCount: treeCount
            })}
          </Text>

          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center'
            }}
          >
            {/* <TouchableOpacity style={styles.baLaterButton}>
              <Text style={styles.baLaterText}>LATER</Text>
            </TouchableOpacity> */}

            <TouchableOpacity
              style={styles.baContinueButton}
              // onPress={() => {
              //   updateStaticRoute(getLocalRoute(route), this.props.navigation);
              // }}
              onPress={() =>
                Linking.openURL(
                  'https://www.trilliontreecampaign.org/donate-trees/1'
                )
              }
            >
              <Text style={styles.baContinueText}>
                {i18n.t('label.pledgeAddedContinueButton')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
