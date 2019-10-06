/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  View,
  Animated,
  DatePickerAndroid,
  TouchableNativeFeedback
} from 'react-native';
import i18n from '../../locales/i18n.js';
import datePickerStyle from '../../styles/date_picker.native';

// const UIPICKER_HEIGHT = 216;

class CollapsibleDatePickerAndroid extends React.PureComponent {
  constructor(props) {
    super(props);
    this._onDateChange = this.onDateChange.bind(this);
    this._onPress = this.onPress.bind(this);
    this.state = {
      isCollapsed: true,
      height: new Animated.Value(0),
      time: null
    };
    this.openDatePicker = this.openDatePicker.bind(this);
  }

  onDateChange(value) {
    this.props.locals.onChange(value);
  }

  onPress() {
    this.setState({ isCollapsed: !this.state.isCollapsed });
    this.openDatePicker();
  }

  openDatePicker() {
    try {
      let dateObject = {
        date: new Date()
      };
      if (this.props.locals.config.maxDate) {
        dateObject.maxDate = new Date();
      }
      if (this.props.locals.config.minDate) {
        dateObject.minDate = new Date();
      }
      DatePickerAndroid.open(dateObject).then(date => {
        if (date.action !== DatePickerAndroid.dismissedAction) {
          //Please take note that the number of the months is based on
          //the count of an index, let say January is 0, February is 1 and so on...
          //if you want the count to be  1 to 12 for months, then add 1
          const finalDate = `${date.year} - ${date.month + 1} - ${date.day} `;
          this.onDateChange(finalDate);

          //Let say i pick February 10 2019, the output will be 2 10 2019
          //You can use moment to format the date as you like

          //Here's an example:
          //console.log(moment(finalDate, 'MM DD YYYY').format('LL'))
          //Output: February 10, 2019
        }
      });
    } catch ({ code, message }) {
      console.warn('Cannot open date picker', message);
    }
  }

  render() {
    const locals = this.props.locals;
    const stylesheet = locals.stylesheet;
    let touchableStyle = stylesheet.dateTouchable.normal;
    // let datepickerStyle = stylesheet.datepicker.normal;
    let dateValueStyle =
      datePickerStyle.dateValueStyle || stylesheet.dateValue.normal;

    if (locals.hasError) {
      touchableStyle = stylesheet.dateTouchable.error;
      // datepickerStyle = stylesheet.datepicker.error;
      dateValueStyle = stylesheet.dateValue.error;
    }

    if (locals.disabled) {
      touchableStyle = stylesheet.dateTouchable.notEditable;
    }

    let formattedValue = locals.value ? locals.value : '';
    if (locals.config) {
      if (!formattedValue) {
        formattedValue = locals.config.defaultValueText
          ? locals.config.defaultValueText
          : i18n.t(locals.label);
      }
    }
    // const height = this.state.isCollapsed ? 0 : UIPICKER_HEIGHT;
    return (
      <View style={datePickerStyle.datePickerContainer}>
        <TouchableNativeFeedback
          style={touchableStyle}
          disabled={locals.disabled}
          onPress={this._onPress}
          background={TouchableNativeFeedback.Ripple(
            this.props.pressColor,
            this.props.borderless
          )}
        >
          <View>
            <Text style={dateValueStyle}>{formattedValue}</Text>
            <View style={datePickerStyle.underlineStyle} />
          </View>
        </TouchableNativeFeedback>
      </View>
    );
  }
}

CollapsibleDatePickerAndroid.propTypes = {
  locals: PropTypes.object.isRequired
};

export function DatePickerTemplate(locals) {
  if (locals.hidden) {
    return null;
  }

  const stylesheet = locals.stylesheet;
  let formGroupStyle = stylesheet.formGroup.normal;
  // let controlLabelStyle = stylesheet.controlLabel.normal;
  let helpBlockStyle = stylesheet.helpBlock.normal;
  const errorBlockStyle = stylesheet.errorBlock;

  if (locals.hasError) {
    formGroupStyle = stylesheet.formGroup.error;
    // controlLabelStyle = stylesheet.controlLabel.error;
    helpBlockStyle = stylesheet.helpBlock.error;
  }

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
    <View style={[formGroupStyle, { flex: 1 }]}>
      <CollapsibleDatePickerAndroid locals={locals} />
      {help}
      {error}
    </View>
  );
}
