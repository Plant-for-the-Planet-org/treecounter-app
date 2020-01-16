import React from 'react';
import { View, Text, Image } from 'react-native';
import styles from '../../styles/mesurements/index';
import { grayCalendar, upArrow, nextArrow } from '../../assets';
import i18n from '../../locales/i18n.js';

const Measurement = props => (
  <View style={{ marginBottom: 20 }}>
    <View
      style={{
        ...styles.itemContainer
      }}
    >
      <View style={styles.iconContainer}>
        <Image source={grayCalendar} style={styles.icon} />
      </View>
      <Text style={{ ...styles.text }}>{props.measurementDate}</Text>
    </View>
    <View style={{ flexDirection: 'row', paddingTop: 5 }}>
      <View
        style={{
          ...styles.itemContainer
        }}
      >
        <View style={styles.iconContainer}>
          <Image source={upArrow} style={styles.upArrow} />
        </View>
        <Text style={{ ...styles.text }}>
          {props.height} {i18n.t('label.m_tall')}
        </Text>
      </View>
      <View style={{ marginLeft: 16 }}>
        <View
          style={{
            ...styles.itemContainer
          }}
        >
          <View style={styles.iconContainer}>
            <Image source={nextArrow} style={styles.nextArrow} />
          </View>
          <Text style={{ ...styles.text }}>
            {props.diameter} {i18n.t('label.cm_wide')}
          </Text>
        </View>
      </View>
    </View>
  </View>
);

export default Measurement;
