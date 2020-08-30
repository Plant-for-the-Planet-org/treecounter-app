/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  View,
  Animated,
  DatePickerIOS,
  TouchableOpacity
} from 'react-native';
import i18n from '../../locales/i18n.js';
import datePickerStyle from '../../styles/date_picker.native';
import { formatDateToMySQL } from '../../helpers/utils';

const UIPICKER_HEIGHT = 216;

class CollapsibleDatePickerIOS extends React.PureComponent {
  constructor(props) {
    super(props);
    this._onDateChange = this.onDateChange.bind(this);
    this._onPress = this.onPress.bind(this);
    this.state = {
      isCollapsed: true,
      height: new Animated.Value(0)
    };
  }

  onDateChange(value) {
    this.props.locals.onChange(formatDateToMySQL(value));
  }

  onPress() {
    const locals = this.props.locals;
    let animation = Animated.timing;
    let animationConfig = {
      duration: 200,
      useNativeDriver: true
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
    if (locals.config) {
      if (locals.config.format && formattedValue) {
        formattedValue = locals.config.format(locals.value);
      } else if (!formattedValue) {
        formattedValue = locals.config.defaultValueText
          ? locals.config.defaultValueText
          : i18n.t(locals.label);
      }
    }
    const height = this.state.isCollapsed ? 0 : UIPICKER_HEIGHT;
    return (
      <View style={datePickerStyle.datePickerContainer}>
        <TouchableOpacity
          style={touchableStyle}
          disabled={locals.disabled}
          onPress={this._onPress}
        >
          <Text style={dateValueStyle}>{formattedValue}</Text>
          <View style={datePickerStyle.underlineStyle} />
        </TouchableOpacity>
        <Animated.View
          style={{ height: this.state.height, overflow: 'hidden' }}
        >
          <DatePickerIOS
            locale={i18n.language}
            ref="input"
            accessibilityLabel={i18n.t(locals.label)}
            date={locals.value ? new Date(locals.value) : null}
            initialDate={new Date()}
            maximumDate={locals.config.maxDate ? new Date() : null}
            minimumDate={locals.config.minDate ? new Date() : null}
            minuteInterval={locals.minuteInterval}
            mode={locals.mode || 'date'}
            onDateChange={this._onDateChange}
            timeZoneOffsetInMinutes={locals.timeZoneOffsetInMinutes}
            style={[datepickerStyle, { height: height }]}
          />
        </Animated.View>
      </View>
    );
  }
}

CollapsibleDatePickerIOS.propTypes = {
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
      <CollapsibleDatePickerIOS locals={locals} />
      {help}
      {error}
    </View>
  );
}
