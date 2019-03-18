import React from 'react';
import PropTypes from 'prop-types';

import i18n from '../../locales/i18n';
import { queryParamsToObject } from '../../helpers/utils';
import { View, Text } from 'react-native';
import styles from '../../styles/selectplantproject/selectplantproject-full';
import PlantProjectDetails from './PlantProjectDetails';
import CardLayout from '../Common/Card';
import PrimaryButton from '../Common/Button/PrimaryButton';
import { ScrollView } from 'react-native';
import PlantProjectSnippet from './PlantProjectSnippet.native';
import scrollStyle from '../../styles/common/scrollStyle';
import TabContainer from '../../containers/Menu/TabContainer';
/**
 * see: https://github.com/Plant-for-the-Planet-org/treecounter-platform/wiki/Component-PlantProjectFull
 */
class CompetitionFull extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View>
        <ScrollView contentContainerStyle={scrollStyle.styleContainer}>
          <CardLayout style={styles.projectFullContainer} />
        </ScrollView>
      </View>
    );
  }
  componentWillUnmount() {}
}

CompetitionFull.propTypes = {
  plantProject: PropTypes.object.isRequired,
  tpoName: PropTypes.string,
  projectClear: PropTypes.func,
  showNextButton: PropTypes.bool,
  onNextClick: PropTypes.func,
  selectProject: PropTypes.func,
  onBackClick: PropTypes.func
};

export default CompetitionFull;
