import PropTypes from 'prop-types';
import React, { useMemo, useState } from 'react';
import { Image, TextInput, View } from 'react-native';

import { iosSearchGrey } from '../../../assets';
import i18n from '../../../locales/i18n.js';
import styles from '../../../styles/selectplantproject/list';
import ListViewProjects from './listview';

const ListProjects = ({
  plantProjects,
  selectProject,
  onMoreClick,
  placeholderTextColor
}) => {
  const [search, setSearch] = useState('');

  // memoized: refilters if plantProjects or search string changes
  const filteredProjects = useMemo(
    () => {
      if (!search) {
        return plantProjects;
      }
      const s = search.toLocaleLowerCase();
      return plantProjects.filter(
        project =>
          project.name.toLowerCase().includes(s) ||
          project.tpo_name.toLowerCase().includes(s)
      );
    },
    [plantProjects, search]
  );

  return (
    <View key={'listViewProject'} style={styles.flexContainer}>
      <View style={styles.searchItem}>
        <View style={[styles.searchContainer]}>
          <View style={styles.searchIconContainer}>
            <Image
              source={iosSearchGrey}
              resizeMode="contain"
              style={styles.searchIcon}
            />
          </View>
          <TextInput
            clearButtonMode="while-editing"
            underlineColorAndroid={'transparent'}
            onChangeText={setSearch}
            value={search}
            autoCorrect={false}
            returnKeyType="search"
            placeholder={i18n.t('label.search_project')}
            placeholderTextColor={placeholderTextColor || '#ccc'}
            style={[styles.searchInput, { paddingVertical: 0 }]}
            autoCapitalize={'sentences'}
          />
        </View>
      </View>

      <View style={styles.listViewContainer}>
        <ListViewProjects
          projects={filteredProjects}
          selectProject={selectProject}
          onMoreClick={onMoreClick}
        />
      </View>
    </View>
  );
};

ListProjects.propTypes = {
  plantProjects: PropTypes.array.isRequired,
  selectProject: PropTypes.func.isRequired,
  onMoreClick: PropTypes.func.isRequired,
  placeholderTextColor: PropTypes.string
};

export default ListProjects;
