import React from 'react';
import PropTypes from 'prop-types';

// import i18n from '../../locales/i18n.js';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import styles from '../../styles/newUserContributions/newUserContributions';

import EditIcon from '../../assets/images/baseline-edit.png';
import DeleteIcon from '../../assets/images/baseline-delete.png';

export default class NewUserContributions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  _handleIndexChange = index => this.setState({ index });

  render() {
    const props = this.props;
    return (
      <View style={styles.container}>
        <View style={{ flex: 2, paddingTop: 10 }}>
          <Text style={styles.treeCount}>
            {props.treeCount ? props.treeCount : 0}
          </Text>
          <Text style={styles.text}>
            {props.location ? props.location : 'none'}
          </Text>
          <Text style={styles.text}>
            {props.dedicatedTo
              ? 'Dedicated to ' + props.dedicatedTo
              : 'Dedicated to'}
          </Text>
          <Text style={styles.text}>
            {props.plantedDate ? props.plantedDate : 'none'}
          </Text>
        </View>
        <View style={{ flex: 1, justifyContent: 'space-between' }}>
          <TouchableOpacity
            style={{
              alignItems: 'center',
              backgroundColor: '#F1F6E7',
              borderBottomLeftRadius: 4
            }}
          >
            <Text style={{ paddingVertical: 10, color: '#89b53a' }}>
              Planted
            </Text>
          </TouchableOpacity>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity
              onPress={props.onClickDeleteUserContributor}
              style={styles.button}
            >
              <Image style={styles.image} source={DeleteIcon} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={props.onClickEditUserContributor}
              style={styles.button}
            >
              <Image style={styles.image} source={EditIcon} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

NewUserContributions.propTypes = {
  // treeCount: PropTypes.number,
  // location: PropTypes.string,
  // dedicatedTo: PropTypes.string,
  // plantedDate: propTypes.string
};
