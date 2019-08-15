import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import { updateStaticRoute, updateRoute } from '../../helpers/routerHelper';
import { getLocalRoute } from '../../actions/apiRouting';
import { successAnimated } from '../../assets';
import styles from './../../styles/pledgeevents/pledgeevents.native';

export default class BottomAction extends Component {
  render() {
    const route = 'app_donateTrees';
    return (
      <View>
        <View
          style={{
            padding: 20,
            paddingVertical: 30
          }}
        >
          <Image
            source={successAnimated}
            style={styles.baSuccessImage}
            resizeMode="cover"
          />
          <Text style={styles.baMessage}>
            You’ve pledged to plant {this.props.treeCount} Trees. You can tap
            continue to fulfill your pledge right now.
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
              onPress={() => {
                updateStaticRoute(getLocalRoute(route), this.props.navigation);
              }}
            >
              <Text style={styles.baContinueText}>CONTINUE</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
