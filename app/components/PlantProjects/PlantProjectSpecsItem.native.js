import React from 'react';
import PropTypes from 'prop-types';
import styles from '../../styles/selectplantproject/selectplantproject-spec';
import { View, Text, Image, TouchableHighlight } from 'react-native';
import Tooltips from 'react-native-tooltips';

class PlantProjectSpecsItem extends React.Component {
  _onPress(ref) {
    this.setState({ visible: true, dismiss: false, reference: ref });
  }
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      reference: undefined
    };
  }
  render() {
    let { label, value, icon, rightIcon } = this.props;

    return (
      <View style={styles.project_specs__item}>
        <View style={styles.spec_icon__container}>
          {icon ? <Image style={styles.spec_icon} source={icon} /> : null}
        </View>
        <View
          style={[
            styles.project_specs__itemText,
            styles.project_specs__itemTextsurvival
          ]}
        >
          <Text style={styles.project_specs__itemText_left}>{label + ' '}</Text>
          {rightIcon ? (
            <TouchableHighlight
              ref={ref => {
                this.ref1 = ref;
              }}
              onPress={() => {
                this._onPress(this.ref1);
              }}
            >
              <Image style={styles.spec_icon} source={rightIcon} />
            </TouchableHighlight>
          ) : null}
          <Tooltips
            text={
              'Percentage of planted trees that survive the first year after planting.'
            }
            visible={this.state.visible}
            reference={this.state.reference}
            autoHide={true}
          />
        </View>
        {value && (value !== undefined || value !== 'undefined') ? (
          <View style={styles.project_specs__itemText}>
            <Text style={styles.project_specs__itemText_right}>{value}</Text>
          </View>
        ) : null}
      </View>
    );
  }
}

PlantProjectSpecsItem.propTypes = {
  icon: PropTypes.any,
  rightIcon: PropTypes.any,
  value: PropTypes.any,
  label: PropTypes.string
};

export default PlantProjectSpecsItem;
