import React from 'react';
import { Text, View } from 'react-native';
import styles from '../../../styles/donations/donationDetails';

export const PledgeOnComponent = props => {
  return (
    <View style={styles.giftDetails}>
      {props.selectedProject.image ? (
        <Image
          style={styles.giftImage}
          source={{
            uri: getImageUrl('project', 'thumb', props.context.pledge.image)
          }}
        />
      ) : null}
      <View style={styles.giftNameAmount}>
        <Text style={styles.giftName}>Sagar Aryal</Text>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={styles.giftTreesSelectTrees}>Select Trees</Text>
        {/* <Icon name={'chevron-up'} size={14} color="#4d5153" /> */}
      </View>
    </View>
  );
};
