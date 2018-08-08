import React, { Component } from 'react';
import { View, ScrollView, Dimensions, Text } from 'react-native';
import styles from '../../../styles/selectplantproject/list';
import i18n from '../../../locales/i18n.js';

import PrimaryButton from '../../Common/Button/PrimaryButton';
import CardLayout from '../../Common/Card/CardLayout';

const { height, width } = Dimensions.get('window');
import { getAppBarHeight } from '../../../styles/common/header';
import SeeMoreToggle from '../../Common/SeeMoreToggle';

export default class PriceProjects extends Component {
  constructor(props) {
    super(props);

    this.state = {
      expanded: false,
      priceSortedProjects: props.plantProjects
    };
  }
  componentWillMount() {
    let { plantProjects, currencies } = this.props;
    currencies = currencies.currencies;
    let priceSortedProjects = JSON.parse(JSON.stringify(plantProjects));
    if (currencies) {
      priceSortedProjects = priceSortedProjects.sort(function(a, b) {
        return (
          a.treeCost *
            parseFloat(currencies.currency_rates['EUR'].rates[a.currency]) -
          b.treeCost *
            parseFloat(currencies.currency_rates['EUR'].rates[b.currency])
        );
      });
    }
    this.setState({
      priceSortedProjects: priceSortedProjects
    });
  }

  componentWillReceiveProps(nextProps) {
    let { plantProjects, currencies } = nextProps;
    currencies = currencies.currencies;
    let priceSortedProjects = plantProjects;
    if (currencies) {
      priceSortedProjects = plantProjects.sort(function(a, b) {
        return (
          a.treeCost *
            parseFloat(currencies.currency_rates['EUR'].rates[a.currency]) -
          b.treeCost *
            parseFloat(currencies.currency_rates['EUR'].rates[b.currency])
        );
      });
    }
    this.setState({
      priceSortedProjects: priceSortedProjects
    });
  }

  onSelectProject = id => {
    this.props.selectProject(id);
  };

  callExpanded = () => {
    this.setState({
      expanded: !this.state.expanded
    });
  };

  render() {
    let { priceSortedProjects } = this.state;
    return (
      <CardLayout
        style={{
          flex: 1,
          flexDirection: 'column'
        }}
      >
        <ScrollView>
          <View style={styles.listContentContainer}>
            {priceSortedProjects.length !== 0
              ? priceSortedProjects.map(project => (
                  <View
                    style={{
                      height: 170,
                      flexDirection: 'column'
                    }}
                  >
                    <View style={styles.projectNameContainer}>
                      <Text style={styles.projectNameText}>{project.name}</Text>
                      <Text
                        style={[styles.projectNameText, styles.tpoNameText]}
                      >
                        By {project.tpo_name}
                      </Text>
                    </View>
                    <View style={styles.projectMetaContainer}>
                      <View style={styles.projectMetaLabels}>
                        <Text style={styles.textStyle}>Location</Text>
                        <Text style={styles.textStyle}>Planted Trees</Text>
                        <Text style={styles.textStyle}>Survival Rate</Text>
                        <Text style={styles.textStyle}>Cost Per Tree</Text>
                      </View>
                      <View style={styles.projectMetaValue}>
                        <Text style={styles.textStyle}>{project.location}</Text>
                        <Text style={styles.textStyle}>
                          {project.countPlanted}
                        </Text>
                        <Text style={styles.textStyle}>
                          {project.survivalRate}
                        </Text>
                        <Text style={styles.textStyle}>
                          {project.treeCost.toFixed(2)}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.projectButtonContainer}>
                      <SeeMoreToggle
                        style={{ paddingLeft: 5 }}
                        seeMore={!this.state.expanded}
                        onToggle={this.toggleExpanded}
                      />
                      <PrimaryButton
                        buttonStyle={{
                          height: 20,
                          paddingLeft: 2,
                          paddingRight: 2,
                          paddingTop: 0,
                          paddingBottom: 0,
                          margin: 0,
                          borderWidth: 0,
                          borderRadius: 0,
                          marginRight: 5
                        }}
                        textStyle={{ fontSize: 12 }}
                      >
                        select project
                      </PrimaryButton>
                    </View>
                  </View>
                ))
              : null}
          </View>
        </ScrollView>
      </CardLayout>
    );
  }
}
