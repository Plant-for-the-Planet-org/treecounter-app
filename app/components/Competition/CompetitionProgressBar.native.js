import React from 'react';
import PropTypes from 'prop-types';

import i18n from '../../locales/i18n';
import { View, Text, Image } from 'react-native';
import styles from '../../styles/competition/competition-snippet.native';
import { flagTarget } from '../../assets';
import { delimitNumbers } from '../../utils/utils';

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
    const backgroundColor = '#b9d384';
    return (
      <View style={styles.treeCounterContainer}>
        <View style={styles.treePlantedContainer}>
          <View
            style={
              treeCountWidth > 0
                ? treeCountWidth != 100
                  ? {
                      height: '100%',
                      flexDirection: 'row',
                      backgroundColor: '#89b53a',
                      borderColor: '#89b53a',
                      width: treeCountWidth + '%',
                      paddingRight: 12,
                      padding: 5,
                      borderTopRightRadius: 20,
                      borderBottomRightRadius: 20
                    }
                  : {
                      height: '100%',
                      flexDirection: 'row',
                      backgroundColor: '#89b53a',
                      borderColor: '#89b53a',
                      width: treeCountWidth + '%',
                      paddingRight: 12,
                      padding: 5
                    }
                : {
                    height: '100%',
                    flexDirection: 'row',
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

            <View style={{ paddingLeft: 5, paddingRight: 16 }}>
              <Image source={flagTarget} style={{ width: 15, height: 15 }} />
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
