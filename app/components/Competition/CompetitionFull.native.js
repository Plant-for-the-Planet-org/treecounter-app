import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import styles from '../../styles/selectplantproject/selectplantproject-full';
import CardLayout from '../Common/Card';
import { ScrollView } from 'react-native';
import scrollStyle from '../../styles/common/scrollStyle';
/**
 * see: https://github.com/Plant-for-the-Planet-org/treecounter-platform/wiki/Component-PlantProjectFull
 */
class CompetitionFull extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextProps) {}
  componentDidMount() {}
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
