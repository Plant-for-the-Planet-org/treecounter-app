import React from 'react';
import i18n from '../../locales/i18n';
import styles from '../../styles/forms/select.native';
import { Dropdown } from 'react-native-material-dropdown';

import PropTypes from 'prop-types';
import {
  Text,
  View,
  Animated,
  TouchableOpacity,
  Picker,
  Platform,
  TouchableNativeFeedback
} from 'react-native';
import datePickerStyle from '../../styles/date_picker.native';

const UIPICKER_HEIGHT = 216;

class SelectTemplateIOS extends React.PureComponent {
  constructor(props) {
    super(props);
    this._onPress = this.onPress.bind(this);
    this.state = {
      isCollapsed: true,
      height: new Animated.Value(0)
    };
  }

  onPress() {
    const locals = this.props.locals;
    let animation = Animated.timing;
    let animationConfig = {
      duration: 200
    };
    if (locals.config) {
      if (locals.config.animation) {
        animation = locals.config.animation;
      }
      if (locals.config.animationConfig) {
        animationConfig = locals.config.animationConfig;
      }
    }
    animation(
      this.state.height,
      Object.assign(
        {
          toValue: this.state.isCollapsed ? UIPICKER_HEIGHT : 0
        },
        animationConfig
      )
    ).start();
    this.setState({ isCollapsed: !this.state.isCollapsed });
    if (typeof locals.onPress === 'function') {
      locals.onPress();
    }
  }

  render() {
    const locals = this.props.locals;
    const stylesheet = locals.stylesheet;
    let touchableStyle = stylesheet.dateTouchable.normal;
    let datepickerStyle = stylesheet.datepicker.normal;
    let dateValueStyle =
      datePickerStyle.dateValueStyle || stylesheet.dateValue.normal;

    if (locals.hasError) {
      touchableStyle = stylesheet.dateTouchable.error;
      datepickerStyle = stylesheet.datepicker.error;
      dateValueStyle = stylesheet.dateValue.error;
    }

    if (locals.disabled) {
      touchableStyle = stylesheet.dateTouchable.notEditable;
    }

    let formattedValue = locals.value ? locals.value : '';

    let filteredValue = this.props.options.filter(
      item => item.value === locals.value
    );

    if (filteredValue && filteredValue.length > 0) {
      formattedValue = i18n.t(filteredValue[0].text);
    } else {
    }
    const height = this.state.isCollapsed ? 0 : UIPICKER_HEIGHT;
    if (Platform.OS === 'android') {
      return (
        //   <View style={datePickerStyle.datePickerContainer}>
        //     <TouchableNativeFeedback
        //       style={touchableStyle}
        //       disabled={locals.disabled}
        //       onPress={this._onPress}
        //     >
        //       <Text style={dateValueStyle}>{formattedValue}</Text>
        //     </TouchableNativeFeedback>
        //     <Picker
        //       mode="dropdown"
        //       selectedValue={formattedValue}
        //       onValueChange={itemValue => locals.onChange(itemValue)}
        //       style={[datepickerStyle, { marginBottom: -2, marginTop: -10 }]}
        //     >
        //       {this.props.options.map(option => (
        //         <Picker.Item
        //           itemStyle={styles.itemStyle}
        //           key={option.value}
        //           label={i18n.t(option.text)}
        //           color={'#686060'}
        //           value={option.value}
        //         />
        //       ))}
        //     </Picker>
        //     <View style={[datePickerStyle.underlineStyle, { marginLeft: 8 }]} />
        //   </View>
        // );
        <Dropdown
          containerStyle={[
            {
              width: '100%',
              height: 35,
              marginLeft: 10,
              marginBottom: 10,
              paddingRight: 10
            },
            locals.config.style
          ]}
          dropdownOffset={{
            top: 10,
            left: 0
          }}
          itemTextStyle={{
            fontSize: 13,
            color: '#686060'
          }}
          value={i18n.t(locals.value)}
          textColor="rgba(104,96,96, 0.8)"
          selectedItemColor="rgba(104,96,96, 0.8)"
          labelExtractor={item => i18n.t(item.text)}
          valueExtractor={item => item.value}
          onChangeText={item => locals.onChange(item)}
          // label={i18n.t(locals.value.text)}
          data={this.props.options}
        />
      );
    }
    return (
      <View style={datePickerStyle.datePickerContainer}>
        <TouchableOpacity
          style={touchableStyle}
          disabled={locals.disabled}
          onPress={this._onPress}
        >
          <Text style={dateValueStyle}>{formattedValue}</Text>
        </TouchableOpacity>
        <Animated.View
          style={{ height: this.state.height, overflow: 'hidden' }}
        >
          <Picker
            mode="dropdown"
            selectedValue={locals.value}
            onValueChange={itemValue => locals.onChange(itemValue)}
            style={[datepickerStyle, { height: height }]}
          >
            {this.props.options.map(option => (
              <Picker.Item
                itemStyle={styles.itemStyle}
                key={option.value}
                label={i18n.t(option.text)}
                color={'#686060'}
                value={option.value}
              />
            ))}
          </Picker>
        </Animated.View>
      </View>
    );
  }
}

SelectTemplateIOS.propTypes = {
  locals: PropTypes.object.isRequired
};

export function getSelectTemplate(enumOption) {
  return function SelectTemplate(locals) {
    const options = enumOption ? enumOption : locals.options;
    const stylesheet = locals.stylesheet;
    // let formGroupStyle = stylesheet.formGroup.normal;
    // let controlLabelStyle = stylesheet.controlLabel.normal;
    // let helpBlockStyle = stylesheet.helpBlock.normal;
    const errorBlockStyle = stylesheet && stylesheet.errorBlock;

    // if (locals.hasError) {
    //   formGroupStyle = stylesheet.formGroup.error;
    //   controlLabelStyle = stylesheet.controlLabel.error;
    //   helpBlockStyle = stylesheet.helpBlock.error;
    // }

    const help = locals.help ? (
      <Text style={helpBlockStyle}>{locals.help}</Text>
    ) : null;
    const error =
      locals.hasError && locals.error ? (
        <Text accessibilityLiveRegion="polite" style={errorBlockStyle}>
          {locals.error}
        </Text>
      ) : null;

    return (
      //formGroupStyle
      <View style={[{ flex: 1 }]}>
        <SelectTemplateIOS locals={locals} options={options} />
        {help}
        {error}
      </View>
    );
  };
}

// export function getSelectTemplate(enumOption) {
//   return function SelectTemplate(locals) {
//     const options = enumOption ? enumOption : locals.options;
//     return (
//       <View style={styles.containerStyle}>
//         <Picker
//           mode="dropdown"
//           selectedValue={locals.value}
//           onValueChange={(itemValue, itemIndex) => locals.onChange(itemValue)}
//           style={styles.pickerStyle}
//           itemStyle={styles.itemStyle}
//         >
//           {options.map(option => (
//             <Picker.Item
//               itemStyle={styles.itemStyle}
//               key={option.value}
//               label={i18n.t(option.text)}
//               color={'#686060'}
//               value={option.value}
//             />
//           ))}
//         </Picker>
//       </View>
//     );
//   };
// }
