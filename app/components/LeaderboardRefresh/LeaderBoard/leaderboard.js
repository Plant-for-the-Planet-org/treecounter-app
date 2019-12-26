import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import styles from '../../../styles/LeaderboardRefresh/Leaderboard/leaderboardstyles';
import i18n from '../../../locales/i18n';

const Leaderboard = () => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <View style={styles.widgetContainer}>
          <Image
            style={styles.image}
            source={{
              uri:
                'https://cdn.zeplin.io/5cad97d9b33d0b5931d90a9b/assets/88AFF8D1-86C3-49EB-BF8C-6658B0D2E50D.png'
            }}
            resizeMode={'contain'}
          />
          <View style={styles.widgetTitleContainer}>
            <Text style={styles.widgetTitle}>
              {i18n.t('label.lbr_countries')}
            </Text>
          </View>
        </View>
        <View style={styles.widgetContainer}>
          <Image
            style={styles.image}
            source={{
              uri:
                'https://cdn.zeplin.io/5cad97d9b33d0b5931d90a9b/assets/81A18291-CCBC-49F2-9968-3BBF2CFF666C.png'
            }}
            resizeMode={'contain'}
          />
          <View style={styles.widgetTitleContainer}>
            <Text style={styles.widgetTitle}>
              {i18n.t('label.lbr_companies')}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.container}>
        <View style={styles.widgetContainer}>
          <Image
            style={styles.image}
            source={{
              uri:
                'https://cdn.zeplin.io/5cad97d9b33d0b5931d90a9b/assets/77782C4C-2A9C-462B-8A60-14911DA51AF6.png'
            }}
            resizeMode={'contain'}
          />
          <View style={styles.widgetTitleContainer}>
            <Text style={styles.widgetTitle}>
              {i18n.t('label.lbr_individuals')}
            </Text>
          </View>
        </View>
        <View style={styles.widgetContainer}>
          <Image
            style={styles.image}
            source={{
              uri:
                'https://cdn.zeplin.io/5cad97d9b33d0b5931d90a9b/assets/8381140B-4114-4677-AB5B-EE3BCE473DE5.png'
            }}
            resizeMode={'contain'}
          />
          <View style={styles.widgetTitleContainer}>
            <Text style={styles.widgetTitle}>
              {i18n.t('label.lbr_schools')}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.container}>
        <View style={styles.widgetContainer}>
          <Image
            style={styles.image}
            source={{
              uri:
                'https://cdn.zeplin.io/5cad97d9b33d0b5931d90a9b/assets/8381140B-4114-4677-AB5B-EE3BCE473DE5.png'
            }}
            resizeMode={'contain'}
          />
          <View style={styles.widgetTitleContainer}>
            <Text style={styles.widgetTitle}>
              {i18n.t('label.lbr_tree_planting_organizations')}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Leaderboard;
