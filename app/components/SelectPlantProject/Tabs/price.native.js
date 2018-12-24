import React, { Component } from 'react';
import { View, Image, Text } from 'react-native';
import styles from '../../../styles/selectplantproject/list';
import CardLayout from '../../Common/Card';

import Proptypes from 'prop-types';
import ListViewProjects from './listview';
import { foldout, foldin } from '../../../assets';
import TouchableItem from '../../Common/TouchableItem.native';

export default class PriceProjects extends Component {
  constructor(props) {
    super(props);

    this.state = {
      expanded: false,
      priceSortedProjects: props.plantProjects
    };
  }
  componentDidMount() {
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

  sortProjects(sortType) {
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
  }

  render() {
    let { priceSortedProjects } = this.state;
    return (
      <View>
        <View style={styles.cardHeader}>
          <Text style={styles.headingStyle}>Cost Per Tree</Text>
          <View style={styles.sortContainer}>
            <TouchableItem
              style={styles.imageStyleContainer}
              onPress={this.sortProjects.bind(this, 'desc')}
            >
              <Image style={styles.imageStyle} source={foldin} />
            </TouchableItem>
            <TouchableItem
              style={styles.imageStyleContainer}
              onPress={this.sortProjects.bind(this, 'asc')}
            >
              <Image style={styles.imageStyle} source={foldout} />
            </TouchableItem>
          </View>
        </View>

        <ListViewProjects
          projects={priceSortedProjects}
          selectProject={projectId => this.props.selectProject(projectId)}
          onMoreClick={projectId => this.props.onMoreClick(projectId)}
        />
      </View>
    );
  }
}

PriceProjects.propTypes = {
  plantProjects: Proptypes.array.isRequired,
  selectProject: Proptypes.func.isRequired,
  currencies: Proptypes.object.isRequired,
  onMoreClick: Proptypes.func.isRequired
};
