import React, { Component } from 'react';
import { View, TouchableHighlight, Image, Text } from 'react-native';
import styles from '../../../styles/selectplantproject/list';
import CardLayout from '../../Common/Card';

import Proptypes from 'prop-types';
import ListViewProjects from './listview';
import { foldout, foldin } from '../../../assets';

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

  callExpanded = () => {
    this.setState({
      expanded: !this.state.expanded
    });
  };

  sortProjects = sortType => {
    if (sortType === 'desc') {
      let { plantProjects, currencies } = this.props;
      currencies = currencies.currencies;
      let priceSortedProjects = JSON.parse(JSON.stringify(plantProjects));
      if (currencies) {
        priceSortedProjects = priceSortedProjects.sort(function(a, b) {
          return (
            b.treeCost *
              parseFloat(currencies.currency_rates['EUR'].rates[b.currency]) -
            a.treeCost *
              parseFloat(currencies.currency_rates['EUR'].rates[a.currency])
          );
        });
      }
      this.setState({
        priceSortedProjects: priceSortedProjects
      });
    } else {
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
  };

  render() {
    let { priceSortedProjects } = this.state;
    return (
      <CardLayout style={styles.cardStyle}>
        <View style={styles.cardHeader}>
          <Text style={styles.headingStyle}>Cost Per Tree</Text>
          <View style={styles.sortContainer}>
            <TouchableHighlight
              style={styles.imageStyleContainer}
              onPress={() => this.sortProjects('desc')}
            >
              <Image style={styles.imageStyle} source={foldin} />
            </TouchableHighlight>
            <TouchableHighlight
              style={styles.imageStyleContainer}
              onPress={() => this.sortProjects('asc')}
            >
              <Image style={styles.imageStyle} source={foldout} />
            </TouchableHighlight>
          </View>
        </View>

        <ListViewProjects
          projects={priceSortedProjects}
          selectProject={projectId => this.props.selectProject(projectId)}
        />
      </CardLayout>
    );
  }
}

PriceProjects.propTypes = {
  plantProjects: Proptypes.array.isRequired,
  selectProject: Proptypes.func.isRequired,
  currencies: Proptypes.array.isRequired
};
