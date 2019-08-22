import React from 'react';
import PropTypes from 'prop-types';
import numeral from 'numeral';
import i18n from '../../locales/i18n';
import { View, Text, Image } from 'react-native';
import styles from '../../styles/selectplantproject/selectplantproject-snippet.native';
import { flagTarget } from '../../assets';
import { delimitNumbers } from '../../utils/utils';
class PlantedProgressBar extends React.Component {
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
            style={styles.treePlantedChildContainer}
            style={
              treeCountWidth > 0
                ? {
                    height: '100%',
                    flexDirection: 'row',
                    backgroundColor: '#89B53A',
                    borderColor: '#89B53A',
                    width: treeCountWidth + '%',
                    paddingRight: 10,
                    padding: 5,
                    borderTopRightRadius: 20,
                    borderBottomRightRadius: 20,
                    borderWidth: 0.5,
                    borderBottomLeftRadius: 7
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
              {i18n.t(numeral(countPlanted).format('0.0 a'))}
            </Text>
            {/* {treeCountWidth > 25 ? (
             treeCountWidth > 40 ? (
               <Text style={styles.treePlantedtextTrees}>
                 {i18n.t('label.treesPlanted')}
               </Text>
             ) : (
               <Text style={styles.treePlantedtextTrees}>
                 {i18n.t('label.trees')}
               </Text>
             )
           ) : null} */}
          </View>
        </View>
        {!this.props.hideTargetImage ? (
          <View style={styles.targetContainer}>
            <Text style={styles.treePlantedtext}>
              {countTarget
                ? i18n.t(numeral(countTarget).format('0.0 a'))
                : null}
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
PlantedProgressBar.propTypes = {
  countPlanted: PropTypes.number,
  countTarget: PropTypes.number,
  hideTargetImage: PropTypes.bool
};
export default PlantedProgressBar;
