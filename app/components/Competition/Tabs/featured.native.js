import React, { Component } from 'react';
import { ScrollView, Text, View, Image } from 'react-native';
import styles from '../../../styles/competition/competition-master.native';
import scrollStyle from '../../../styles/common/scrollStyle.native';
import CompetitionSnippet from '../CompetitionSnippet.native';
import PropTypes from 'prop-types';
import { trees } from './../../../assets';
import i18n from '../../../locales/i18n';

export default class FeaturedCompetitions extends Component {
  constructor(props) {
    super(props);

    this.state = {
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
          { paddingBottom: 164 }
        ]}
      >
        <View style={styles.headerView}>
          <Text style={styles.headerTitle}>
            {i18n.t('label.featured_compeition_tab_header')}
          </Text>
          <Image
            source={trees}
            style={styles.headerImage}
            resizeMode="contain"
          />
        </View>
        {featuredCompetitions.length > 0
          ? featuredCompetitions.map(competition => (
              <CompetitionSnippet
                key={'competition' + competition.id}
                cardStyle={styles.cardStyle}
                onMoreClick={id => this.props.onMoreClick(id, competition.name)}
                leaveCompetition={id => this.props.leaveCompetition(id)}
                enrollCompetition={id => this.props.enrollCompetition(id)}
                editCompetition={this.props.editCompetition}
                competition={competition}
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
