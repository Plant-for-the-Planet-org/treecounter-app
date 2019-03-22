import React from 'react';
import PropTypes from 'prop-types';

import i18n from '../../locales/i18n';
import { View, Text, Image } from 'react-native';
import styles from '../../styles/selectplantproject/selectplantproject-snippet.native';
import { flagTarget } from '../../assets';

class CompetitionTopCompetitor extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <View />;
  }
}

export default CompetitionTopCompetitor;
CompetitionTopCompetitor.propTypes = {
  countPlanted: PropTypes.number,
  countTarget: PropTypes.number,
  hideTargetImage: PropTypes.bool
};
