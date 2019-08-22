import PropTypes from 'prop-types';
import React, { useMemo, useState } from 'react';
import { Image, Text, View } from 'react-native';

import { foldin, foldout } from '../../../assets';
import i18n from '../../../locales/i18n';
import styles from '../../../styles/selectplantproject/list';
import { sortProjectsByPrice } from '../../../utils/currency';
import TouchableItem from '../../Common/TouchableItem.native';
import ListViewProjects from './listview';

const PriceProjects = ({
  plantProjects,
  currencies,
  selectProject,
  onMoreClick
}) => {
  currencies = currencies ? currencies.currencies : null;

  const [sortType, setSortType] = useState('asc');

  // memoized: rebuilds if plantProjects, sortType or currencies changes
  const sortedProjects = useMemo(
    () => sortProjectsByPrice(plantProjects, sortType === 'asc', currencies),
    [plantProjects, sortType, currencies]
  );

  return (
    <View style={styles.flexContainer}>
      <View style={styles.cardHeader}>
        <Text style={styles.headingStyle}>{i18n.t('label.cost_per_tree')}</Text>
        <View style={styles.sortContainer}>
          <TouchableItem
            style={styles.imageStyleContainer}
            hitSlop={{ left: 50, right: 150 }}
            onPress={() => setSortType('desc')}
          >
            <Image style={styles.imageStyle} source={foldin} />
          </TouchableItem>
          <TouchableItem
            style={styles.imageStyleContainer}
            hitSlop={{ left: 50, right: 150 }}
            onPress={() => setSortType('asc')}
          >
            <Image style={styles.imageStyle} source={foldout} />
          </TouchableItem>
        </View>
      </View>

      <View style={styles.listViewContainer}>
        <ListViewProjects
          projects={sortedProjects}
          selectProject={selectProject}
          onMoreClick={onMoreClick}
        />
      </View>
    </View>
  );
};

PriceProjects.propTypes = {
  plantProjects: PropTypes.array.isRequired,
  selectProject: PropTypes.func.isRequired,
  currencies: PropTypes.object.isRequired,
  onMoreClick: PropTypes.func.isRequired
};

export default PriceProjects;
