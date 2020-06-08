import React from 'react';
import PropTypes from 'prop-types';

import i18n from '../../../locales/i18n';
import { View, Text, Image } from 'react-native';
import styles from '../../../styles/competition/competition-snippet.native';
import { flagTarget } from '../../../assets';
import { delimitNumbers } from '../../../utils/utils';

class CompetitionProgressBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { countPlanted, countTarget } = this.props;
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
    return (
      <View style={styles.treeCounterContainer}>
        <View style={styles.treePlantedContainer}>
          <View
            style={
              treeCountWidth > 0
                ? treeCountWidth != 100
                  ? [{ width: treeCountWidth + '%' }, styles.progressbar]
                  : [{ width: treeCountWidth + '%' }, styles.progressbarw100]
                : styles.progressbarw0
            }
          />
          <View style={styles.treeCountViewPB}>
            <Text style={styles.treePlantedtextPlanted}>
              {delimitNumbers(countPlanted)}
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

            <View style={styles.targetflagview}>
              <Image source={flagTarget} style={styles.targetflagimage} />
            </View>
          </View>
        ) : null}
      </View>
    );
  }
}

CompetitionProgressBar.propTypes = {
  countPlanted: PropTypes.number,
  countTarget: PropTypes.number,
  hideTargetImage: PropTypes.bool
};

export default CompetitionProgressBar;
