import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from '../../../styles/LeaderboardRefresh/Leaderboard/leaderboardstyles';
import i18n from '../../../locales/i18n';
import { updateRoute } from '../../../helpers/routerHelper/routerHelper.native';
import {
  countriesleaderboard,
  schooldleaderboard,
  organizationleaderboard,
  individualsleaderboard,
  companiesleaderboard
} from '../../../assets/index';
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
          <Image
            style={styles.image}
            source={countriesleaderboard}
            resizeMode={'contain'}
          />
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
            source={companiesleaderboard}
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
          <Image
            style={styles.image}
            source={individualsleaderboard}
            resizeMode={'contain'}
          />
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
          <Image
            style={styles.image}
            source={schooldleaderboard}
            resizeMode={'contain'}
          />
          <View style={styles.widgetTitleContainer}>
            <Text style={styles.widgetTitle}>
              {i18n.t('label.lbr_schools')}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={() => navigateTo('organization', 'organizations_LeaderBoard')}
        style={styles.widgetContainer}
      >
        <Image
          style={styles.image}
          source={organizationleaderboard}
          resizeMode={'contain'}
        />
        <View style={styles.widgetTitleContainer}>
          <Text style={styles.widgetTitle}>
            {i18n.t('label.lbr_tree_planting_organizations')}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Leaderboard;
