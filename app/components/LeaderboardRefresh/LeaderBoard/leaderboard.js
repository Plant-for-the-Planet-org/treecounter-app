import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from '../../../styles/LeaderboardRefresh/Leaderboard/leaderboardstyles';
import i18n from '../../../locales/i18n';
import { updateRoute } from '../../../helpers/routerHelper/routerHelper.native';
import { world, school, tpo, me, organisation } from '../../../assets/index';
const Leaderboard = ({ navigation }) => {
  const navigateTo = (category, routeName) => {
    updateRoute(routeName, navigation, undefined, { category });
  };
  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => navigateTo('country', 'countries_leaderboard')}
          style={styles.widgetContainer}
        >
          <Image style={styles.image} source={world} resizeMode={'contain'} />
          <View style={styles.widgetTitleContainer}>
            <Text style={styles.widgetTitle}>
              {i18n.t('label.lbr_countries')}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigateTo('company', 'companies_leaderboard')}
          style={styles.widgetContainer}
        >
          <Image
            style={styles.image}
            source={organisation}
            resizeMode={'contain'}
          />
          <View style={styles.widgetTitleContainer}>
            <Text style={styles.widgetTitle}>
              {i18n.t('label.lbr_companies')}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => navigateTo('individual', 'individuals_leaderboard')}
          style={styles.widgetContainer}
        >
          <Image style={styles.image} source={me} resizeMode={'contain'} />
          <View style={styles.widgetTitleContainer}>
            <Text style={styles.widgetTitle}>
              {i18n.t('label.lbr_individuals')}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigateTo('education', 'schools_leaderboard')}
          style={styles.widgetContainer}
        >
          <Image style={styles.image} source={school} resizeMode={'contain'} />
          <View style={styles.widgetTitleContainer}>
            <Text style={styles.widgetTitle}>
              {i18n.t('label.lbr_schools')}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => navigateTo('tpo', 'tpo_LeaderBoard')}
          style={styles.widgetContainer}
        >
          <Image style={styles.image} source={tpo} resizeMode={'contain'} />
          <View style={[styles.widgetTitleContainer, { width: 277 }]}>
            <Text style={styles.widgetTitle}>
              {i18n.t('label.lbr_tree_planting_organizations')}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Leaderboard;
