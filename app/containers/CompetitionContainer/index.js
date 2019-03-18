import React from 'react';
import Competiton from '../../components/Competition/index.native';
import SelectPlantProject from '../../components/SelectPlantProject';
import { updateRoute } from '../../helpers/routerHelper';

class CompetitionContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <Competiton onMoreClick={id => this.onMoreClick(id)} />;
  }
  onMoreClick(id) {
    //this.props.selectPlantProjectAction(id);
    const { navigation } = this.props;
    if (navigation) {
      updateRoute(
        'app_selectCompetition',
        navigation,
        1,
        navigation.getParam('userForm')
      );
    }
  }
}

export default CompetitionContainer;
CompetitionContainer.propTypes = {
  navigation: PropTypes.any
};
