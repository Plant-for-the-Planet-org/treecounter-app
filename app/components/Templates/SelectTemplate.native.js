import React from 'react';
import i18n from '../../locales/i18n';
import { Dropdown } from 'react-native-material-dropdown';

import PropTypes from 'prop-types';
import { Platform, Dimensions } from 'react-native';
// import { Text, View } from 'react-native';
// import datePickerStyle from '../../styles/date_picker.native';

// const UIPICKER_HEIGHT = 216;

class SelectTemplateIOS extends React.PureComponent {
  constructor(props) {
    super(props);
    // eslint-disable-next-line no-underscore-dangle
    this._onPress = this.onPress.bind(this);
  }

  onPress() {
    const locals = this.props.locals;
    if (typeof locals.onPress === 'function') {
      locals.onPress();
    }
  }

  render() {
    const locals = this.props.locals;
    // const stylesheet = locals.stylesheet;
    // let touchableStyle = stylesheet.dateTouchable.normal;
    // let datepickerStyle = stylesheet.datepicker.normal;
    // let dateValueStyle =
    //   datePickerStyle.dateValueStyle || stylesheet.dateValue.normal;

    // if (locals.hasError) {
    //   touchableStyle = stylesheet.dateTouchable.error;
    //   datepickerStyle = stylesheet.datepicker.error;
    //   dateValueStyle = stylesheet.dateValue.error;
    // }

    // if (locals.disabled) {
    //   touchableStyle = stylesheet.dateTouchable.notEditable;
    // }

    // let formattedValue = locals.value ? locals.value : '';

    // let filteredValue = this.props.options.filter(
    //   item => item.value === locals.value
    // );
    const textColor = '#686060';
    // if (filteredValue && filteredValue.length > 0) {
    // formattedValue = i18n.t(filteredValue[0].text);
    // }
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
              marginLeft: 10,
              marginBottom: 10,
              paddingRight: 10,
              elevation: 2
            },
            locals.config.style
          ]}
          pickerStyle={{
            position: 'absolute',
            maxHeight: Dimensions.get('window').height - 150,
            marginTop: 'auto',
            top:
              Dimensions.get('window').height / 2 >=
              this.props.options.length * 18
                ? Dimensions.get('window').height / 2 -
                  this.props.options.length * 18
                : 75,
            alignSelf: 'center',
            flex: 1
          }}
          initialNumToRender={this.props.options.length}
          itemCount={20}
          dropdownOffset={{
            top: 10,
            left: 0
          }}
          animationDuration={0}
          itemTextStyle={{
            fontSize: 13,
            color: textColor
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
      // <View style={datePickerStyle.datePickerContainer}>
      //   <TouchableOpacity
      //     style={{
      //       ...touchableStyle,
      //       flexDirection: 'row',
      //       justifyContent: 'space-between'
      //     }}
      //     disabled={locals.disabled}
      //     onPress={this._onPress}
      //   >
      //     <Text style={dateValueStyle}>{formattedValue}</Text>
      //     <Image
      //       source={this.state.isCollapsed ? foldout : foldin}
      //       style={{ height: 18, width: 18 }}
      //       resizeMode={'contain'}
      //     />
      //   </TouchableOpacity>
      //   <Animated.View
      //     style={{ height: this.state.height, overflow: 'hidden' }}
      //   >
      //     <Picker
      //       mode="dropdown"
      //       selectedValue={locals.value}
      //       onValueChange={itemValue => locals.onChange(itemValue)}
      //       style={[datepickerStyle, { height: height }]}
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
      //   </Animated.View>
      // </View>
      <Dropdown
        containerStyle={[
          {
            width: '100%',
            marginLeft: 10,
            marginBottom: 10,
            paddingRight: 10,
            elevation: 2
          },
          locals.config.style
        ]}
        pickerStyle={{
          position: 'absolute',
          maxHeight: Dimensions.get('window').height - 150,
          marginTop: 'auto',
          top:
            Dimensions.get('window').height / 2 >=
            this.props.options.length * 18
              ? Dimensions.get('window').height / 2 -
                this.props.options.length * 18
              : 75,
          alignSelf: 'center',
          flex: 1
        }}
        itemCount={20}
        dropdownOffset={{
          top: 10,
          left: 0
        }}
        animationDuration={0}
        itemTextStyle={{
          fontSize: 13,
          color: textColor
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
}

SelectTemplateIOS.propTypes = {
  locals: PropTypes.object.isRequired
};

// disabled custom template for select/dropdown as not working correctly
export function getSelectTemplate(/*enumOption*/) {
  return null;
}

/*
export function getSelectTemplate(enumOption) {
  return function SelectTemplate(locals) {
    const options = enumOption ? enumOption : locals.options;
    const stylesheet = locals.stylesheet;
    // let formGroupStyle = stylesheet.formGroup.normal;
    // let controlLabelStyle = stylesheet.controlLabel.normal;
    let helpBlockStyle = stylesheet.helpBlock.normal;
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
*/

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
