import React from 'react';
import PropTypes from 'prop-types';

import i18n from '../../locales/i18n';
import { View, Text } from 'react-native';
import styles from '../../styles/selectplantproject/selectplantproject-snippet.native';
import { delimitNumbers, convertNumber } from '../../utils/utils';

import Icon from 'react-native-vector-icons/FontAwesome';

const flagIcon = <Icon name="flag" size={18} color="#ffffff" />;

class PlantedProgressBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      countPlanted,
      countTarget,
      style,
      treePlantedChildContainerStyle
    } = this.props;
    let treePlantedRatio = (countPlanted / countTarget).toFixed(2);
    treePlantedRatio = parseFloat(treePlantedRatio);
    let treeCountWidth;
    if (treePlantedRatio > 1) {
      treeCountWidth = 100;
    } else if (treePlantedRatio < 0) {
      treeCountWidth = 0;
    } else {
      treeCountWidth = treePlantedRatio * 100;
    }
    const colors = { backgroundColor: '#b9d384', borderColor: '#b9d384' };
    return (
      <View style={[styles.treeCounterContainer, style]}>
        <View style={styles.treePlantedContainer}>
          <View
            style={
              treeCountWidth > 0
                ? {
                    height: '100%',
                    flexDirection: 'row',
                    backgroundColor: colors.backgroundColor,
                    borderColor: colors.borderColor,
                    width: treeCountWidth + '%',
                    paddingRight: 10,
                    padding: 5,
                    borderTopRightRadius: treeCountWidth < 100 ? 20 : 0,
                    borderBottomRightRadius: treeCountWidth < 100 ? 20 : 0,
                    borderWidth: 0.5,
                    ...treePlantedChildContainerStyle
                  }
                : {
                    padding: 5
                  }
            }
          />
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              position: 'absolute',
              alignItems: 'center',
              paddingTop: 8,
              paddingBottom: 8
            }}
          >
            <Text style={styles.treePlantedtextPlanted}>
              {convertNumber(parseInt(countPlanted), 2)}
            </Text>
            <Text style={styles.treePlantedtextTrees}>
              {i18n.t('label.planted')}
            </Text>
          </View>
        </View>

        {!this.props.hideTargetImage ? (
          <View style={styles.targetContainer}>
            <Text style={styles.treePlantedtext}>
              {countTarget ? delimitNumbers(countTarget) : null}
            </Text>

            <View style={{ paddingLeft: 5.5, paddingRight: 12 }}>
              {flagIcon}
            </View>
          </View>
        ) : null}
      </View>
    );
  }
}

PlantedProgressBar.propTypes = {
  countPlanted: PropTypes.number,
  countTarget: PropTypes.number,
  hideTargetImage: PropTypes.bool,
  style: PropTypes.object,
  treePlantedChildContainerStyle: PropTypes.object
};

export default PlantedProgressBar;
