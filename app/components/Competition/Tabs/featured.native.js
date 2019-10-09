import React, { Component } from 'react';
import { ScrollView, Text, View, Image } from 'react-native';
import PlantProjectSnippet from '../../PlantProjects/PlantProjectSnippet';
import { updateStaticRoute } from '../../../helpers/routerHelper';
import styles from '../../../styles/competition/competition-master.native';
import scrollStyle from '../../../styles/common/scrollStyle.native';
import CompetitionSnippet from '../CompetitionSnippet.native';
import PropTypes from 'prop-types';
import { trees } from './../../../assets';

export default class FeaturedCompetitions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      expanded: false,
      pageIndex: 1,
      featuredCompetitions: []
    };
  }
  componentWillMount() {
    let { allCompetitions } = this.props;
    let featuredCompetitions = [];
    let CurrentDate = new Date();

    if (allCompetitions.length > 0) {
      allCompetitions.forEach(val => {
        if (val.category === 'featured') {
          val.competitions.forEach(comp => {
            let endDate = comp.endDate;
            endDate = new Date(endDate);
            if (endDate > CurrentDate) {
              featuredCompetitions.push(comp);
            }
          });
        }
      });
    }
    this.setState({
      featuredCompetitions: featuredCompetitions
    });
  }

  componentWillReceiveProps(nextProps) {
    let { allCompetitions } = nextProps;
    let featuredCompetitions = [];
    let CurrentDate = new Date();
    if (allCompetitions.length > 0) {
      allCompetitions.forEach(val => {
        if (val.category === 'featured') {
          val.competitions.forEach(comp => {
            let endDate = comp.endDate;
            endDate = new Date(endDate);
            if (endDate > CurrentDate) {
              featuredCompetitions.push(comp);
            }
          });
        }
      });
    }
    this.setState({
      featuredCompetitions: featuredCompetitions
    });
  }

  render() {
    let { featuredCompetitions } = this.state;
    return (
      <ScrollView
        contentContainerStyle={[
          scrollStyle.styleContainer,
          { paddingBottom: 72 }
        ]}
      >
        <View style={styles.headerView}>
          <Text style={styles.headerTitle}>
            Select a competition to join and start planting trees
          </Text>
          <Image
            source={trees}
            style={styles.headerImage}
            resizeMode="contain"
          />
        </View>
        {featuredCompetitions.length > 0
          ? featuredCompetitions.map(project => (
              <CompetitionSnippet
                key={'competition' + project.id}
                cardStyle={styles.cardStyle}
                onMoreClick={id => this.props.onMoreClick(id, project.name)}
                leaveCompetition={id => this.props.leaveCompetition(id)}
                enrollCompetition={id => this.props.enrollCompetition(id)}
                editCompetition={this.props.editCompetition}
                competition={project}
                type="featured"
              />
            ))
          : null}
      </ScrollView>
    );
  }
}
FeaturedCompetitions.propTypes = {
  allCompetitions: PropTypes.any,
  onMoreClick: PropTypes.any,
  leaveCompetition: PropTypes.any,
  enrollCompetition: PropTypes.any,
  editCompetition: PropTypes.any
};
