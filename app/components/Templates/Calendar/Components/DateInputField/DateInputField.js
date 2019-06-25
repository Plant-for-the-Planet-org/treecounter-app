/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
// import CalendarIcon from '@material-ui/icons/CalendarTodayOutlined';
// import CrossIcon from '@material-ui/icons/Clear';
import { getStyles } from './style';
import { close_green, compCalendar } from '../../../../../assets/index';

const CalendarIcon = () => {
  return <img src={compCalendar} />;
};
const CrossIcon = () => {
  return <img src={close_green} style={{ height: 15, width: 15 }} />;
};
/**
 *
 * A Date Input Component
 */
class DateInputField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      focused: false,
      inputDD: undefined,
      inputMM: undefined,
      inputYYYY: undefined,
      inputDD1: undefined,
      inputMM1: undefined,
      inputYYYY1: undefined,
      dateComponentMinMaxInfo: {
        DD: { min: 1, max: 31, maxFirstDigit: 3 },
        MM: { min: 1, max: 12, maxFirstDigit: 1 },
        YYYY: {
          min: 100, //this is max supported by calendar
          max: 9999, //this is min supported by calendar
          maxFirstDigit: undefined,
          minLimit: props.startLimit && props.startLimit.getFullYear(), // this is min provided by consumer
          maxLimit: props.endLimit && props.endLimit.getFullYear() // this is max provided by consumer
        }
      },
      selectAll: false
    };
    this._inputRef1 = React.createRef();
    this._inputRef2 = React.createRef();
    this._inputRef3 = React.createRef();

    //create separate components for this type of input
    this._inputRef4 = React.createRef();
    this._inputRef5 = React.createRef();
    this._inputRef6 = React.createRef();

    this._lastBlurred = this._inputRef1;

    this._dateComponentsArray = Object.keys(this.state.dateComponentMinMaxInfo);
    this._isFirefox = navigator.userAgent.indexOf('Firefox') != -1;
  }

  /**
   * A utility method to verify the current date inputs selection
   * @private
   * @param {event} event - unknown
   *
   */
  _isAnyTextInputSelected = event => {
    //@TODO after introducing  selectAll state we can use that here, but for the sake of avoiding testing it will remain like this
    const selectionRegistry = window.getSelection();
    if (
      (selectionRegistry.containsNode(this._inputRef1.current) &&
        selectionRegistry.containsNode(this._inputRef2.current) &&
        selectionRegistry.containsNode(this._inputRef3.current)) ||
      (!this.props.isSingleMode &&
        selectionRegistry.containsNode(this._inputRef4.current) &&
        selectionRegistry.containsNode(this._inputRef5.current) &&
        selectionRegistry.containsNode(this._inputRef6.current)) ||
      (this._isFirefox && this.state.selectAll)
    ) {
      return true;
    }
    return false;
  };

  /**
   * React life cycle method
   * @param {any} props - component props
   * @param {any} state - component state
   *
   */
  static getDerivedStateFromProps(props, state) {
    let secondInputDateArray = {};
    let inputDateArray = {};
    if (props.inputDateArray) {
      inputDateArray = {
        inputDD: props.inputDateArray[2],
        inputMM: props.inputDateArray[1],
        inputYYYY: props.inputDateArray[0]
      };
    }
    if (props.secondInputDateArray) {
      secondInputDateArray = {
        inputDD1: props.secondInputDateArray[2],
        inputMM1: props.secondInputDateArray[1],
        inputYYYY1: props.secondInputDateArray[0]
      };
    }
    console.log('DateInputField__getDerivedStateFromProps', props);

    return {
      ...secondInputDateArray,
      ...inputDateArray
    };
  }

  /**
   * A Calendar component Copy event handler
   * If all date inputs are selected then copy their content in pasteboard
   * in DD/MM/YYYY or DD/MM/YYYY  - DD1/MM1/YYYY1
   * @param {event} event - copy event
   *
   */
  handleCopyEvent = event => {
    if (!!event && !!event.clipboardData && this._isAnyTextInputSelected()) {
      try {
        const secondDateInput = !this.props.isSingleMode
          ? `-${this.state['inputDD1']}/${this.state['inputMM1']}/${
              this.state['inputYYYY1']
            }`
          : '';
        const firstInputDate = `${this.state['inputDD']}/${
          this.state['inputMM']
        }/${this.state['inputYYYY']}`;

        event.clipboardData.setData(
          'text/plain',
          firstInputDate + secondDateInput
        );
      } catch (err) {
        console.log(err);
      }

      event.preventDefault();
    }
  };

  /**
   * A Calendar component paste event handler
   * Parse pasteboard text as (Date[slash]Month[slash]YYYY) and call onDateChange with correct parsed value
   * If user paste single numeric value it will get pasted into selected input
   * Calendar will not accept alphanumeric or special char paste content
   * @param {event} event - copy event
   *
   */
  handlePasteEvent = event => {
    try {
      let text = event.clipboardData.getData('text/plain');
      const isFirstDateInputSelected = this._inputRef1.current.parentNode.contains(
        event.target
      );
      const isSecondDateInputSelected =
        !this.props.isSingleMode &&
        this._inputRef4.current.parentNode.contains(event.target);
      let updateSecondDate = true;

      if (!!text) {
        text = text.trim();
        text = text.split('-');
        if (!!text) text = text.join('/');
        text = text.split('/');
        if (text.length == 1 && !isNaN(text[0])) {
          this.onDateChanged(
            {
              [event.target.getAttribute('data-type')]: text
            },
            false,
            true
          );
          return;
        }
        const firstDate = [
          !isNaN(text[2]) ? text[2] : undefined,
          !isNaN(text[1]) ? text[1] : undefined,
          !isNaN(text[0]) ? text[0] : undefined
        ];
        const secondDate = [
          !isNaN(text[5]) ? text[5] : undefined,
          !isNaN(text[4]) ? text[4] : undefined,
          !isNaN(text[3]) ? text[3] : undefined
        ];

        if (isFirstDateInputSelected) {
          this.props.onDateChanged(firstDate, false);
        } else if (isSecondDateInputSelected) {
          //do we have complete date or incomplete dates
          const secondDatesAvailable = !!text[3];
          updateSecondDate = secondDatesAvailable;
          this.props.onDateChanged(firstDate, false, !secondDatesAvailable);
        }

        if (!this.props.isSingleMode && text && updateSecondDate) {
          setTimeout(
            () => this.props.onDateChanged(secondDate, false, true),
            0
          );
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  /**
   * A Calendar component keyboard event handler
   * Handle Delete event if all Date inputs are selected
   * @param {event} event - keyDown event
   *
   */
  handleGlobalKeyPress = event => {
    if (
      event.type == 'keydown' &&
      (event.keyCode == 8 || event.key == 'Delete' || event.key == 'Backspace')
    ) {
      if (this._isAnyTextInputSelected()) {
        console.log('All node selected');
        const inputType1 = this._inputRef1.current.getAttribute('data-type');
        const inputType2 = this._inputRef2.current.getAttribute('data-type');
        const inputType3 = this._inputRef3.current.getAttribute('data-type');
        this.onDateChanged(
          {
            [inputType1]: -1,
            [inputType2]: -1,
            [inputType3]: -1
          },
          false,
          true
        );
        event.preventDefault();
        setTimeout(() => {
          this.handleOnClick(null, this['_inputRef1']);
        }, 0);

        return;
      }
    }
  };

  /**
   * A utility to identify when to show/hide cross/delete icon
   *
   * @private
   *
   */
  _showCrossIcon = () => {
    if (
      this.state.inputDD ||
      this.state.inputMM ||
      this.state.inputYYYY ||
      this.state.inputDD1 ||
      this.state.inputMM1 ||
      this.state.inputYYYY1
    ) {
      return true;
    }
    return false;
  };

  /**
   * Calendar icon handler
   * it will Bring calendar into focused state and Show Date picker
   * @private
   * @param {Event} event - click event
   */
  _handleCalendarIconClick = event => {
    if (!this.state.focused) {
      this.setState({
        focused: true,
        selectAll: false
      });
    }

    this.handleOnClick(event, this._lastBlurred);
    this.props.showPicker(true);
  };

  /**
   * Cross/delete icon handler
   * it will call clear dates of calendar root component to clear the calendar
   * @private
   * @param {Event} event - click event
   */
  _handleCrossIconClick = event => {
    this.deselectAllInputOnFirefox();
    this.props.clearDates && this.props.clearDates();
  };

  /**
   * DateInputComponent's Focus handler
   * Enabling focus state of component and creating synthetic click effect on first or
   * last selected date input field
   * @private
   * @param {Event} event - focus event
   */
  handleFocus = event => {
    if (
      event.target &&
      event.target.nodeName.toLowerCase() === 'div' &&
      this._lastBlurred
    ) {
      this.setState({
        focused: true,
        selectAll: false
      });
      this.handleOnClick(event, this._lastBlurred, false);
      return;
    }
    this.setState({ focused: true, selectAll: false });
  };

  /**
   * DateInputComponent's Blur handler
   * Parent component can also call it based on some other events
   * This will change the focused state to false
   * It will call the handleOnBlur of parent to provide blur event with current dates to consumer
   * @public
   * @param {Event} event - blur event
   */
  handleBlur = event => {
    console.log('__handleBlur', event && event.target);
    if (this.state.focused || this.state.selectAll) {
      this.setState(
        { focused: false, selectAll: false },
        this.handleOnBlur(!!event && this.state.focused)
      );
    }
  };

  /**
   * DateInputComponent's Input click handler
   * It will select the complete content of text input and bring it into focus
   * It will show hide date picker based on the prop configuration
   * @private
   * @param {event} event - click event
   * @param {import("react").Ref} inputRef - reference of clicked Input
   * @param {boolean}  [showPicker=true] - true to show picker else false
   */
  handleOnClick = (event, inputRef, showPicker = true) => {
    inputRef.current.focus();
    inputRef.current.select && inputRef.current.select();
    //for safari mobile
    inputRef.current.setSelectionRange(0, inputRef.current.value.length);

    this.props.openDatePickerOnClick &&
      showPicker &&
      this.props.showPicker(true);
    this.deselectAllInputOnFirefox();
  };

  /**
   * DateInputComponent's Input blur handler
   * It will  store the last blur input, which will get focus on next focus handler
   * @private
   * @param {event} event - blur event
   * @param {import("react").Ref} inputRef - reference of clicked Input
   */
  handleInputOnBlur = (event, inputRef) => {
    this._lastBlurred = inputRef;
  };

  /**
   * Internal onDateChange handler, it wll call parent date change handler
   * @private
   * @param {Object} dateObject - blur event
   * @param {Boolean} isIntervalRange - true if it is second date input of interval range else false
   * @param {Boolean} invalidateIntervalRange - if true it will clear the second date of interval range
   */
  onDateChanged = (
    dateObject,
    isIntervalRange,
    invalidateIntervalRange = false
  ) => {
    console.log('__onDateChanged__');
    this.props.onDateChanged &&
      this.props.onDateChanged(
        [dateObject.YYYY, dateObject.MM, dateObject.DD],
        false,
        isIntervalRange,
        invalidateIntervalRange
      );
  };

  /**
   * A utility method to copy text into pasteboard
   * It will create virtual text input node in DOM add copy text into that, bring that into focus
   * Call execCommand(copy) to copy the text into Pasteboard
   * @param {String} text - text to copy
   * @param {Node} parentNode - any specific node where we can add this virtual temporarily input node
   * @deprecated Now we are trapping global copy event where we can pass th text to event itself
   *
   */
  copySelectionText = (text, parentNode) => {
    const input = document.createElement('input');
    input.style.height = '1px';
    input.style.width = '1px';
    parentNode.appendChild(input);
    input.value = text;
    input.focus();
    input.select();
    const result = document.execCommand('copy');
    if (result === 'unsuccessful') {
      console.error('Failed to copy text.');
    }
    parentNode.removeChild(input);
    return result;
  };

  /**
   * DateInputComponent's key event handler
   * This handles ArrowUp, ArrowDown, all numeric inputs, ctr+v, ctr+c, delete, backspace
   * @private
   * @param {KeyboardEvent} event - key event
   * @param {import("react").Ref} inputRef - reference of Input, on which key event happened
   * @param {Boolean} lastInput - true if it is the last input of DateInputComponent
   * @param {Boolean} firstInput - true if it is the last input of DateInputComponent
   * @param {String} postfix - A way communicate this is second input date of Interval range calendar
   */
  handleKeyPress = (
    event,
    inputRef,
    lastInput = false,
    firstInput = false,
    postfix = ''
  ) => {
    console.log('___handleKeyPress____', event.keyCode, event.key);
    event = event || window.event;

    //dont prevent default behavior for copy and paste command
    if (
      (event.keyCode == 86 ||
        event.key == 'v' ||
        (event.keyCode == 67 || event.key == 'c')) &&
      (event.ctrlKey || event.metaKey)
    ) {
      return;
    }

    if (
      (event.keyCode == 65 || event.key == 'a') &&
      (event.ctrlKey || event.metaKey)
    ) {
      console.log('select all dates in calendar');
      console.log(inputRef.current.parentNode);
      if (!this._isFirefox)
        window
          .getSelection()
          .selectAllChildren(
            this.state.isSingleMode
              ? inputRef.current.parentNode
              : inputRef.current.parentNode.parentNode
          );
      this.setState({ selectAll: true });
      event.preventDefault();
      return;
    }

    if (event.keyCode == 9 || event.key == 'Tab') {
      if ((lastInput && !event.shiftKey) || (event.shiftKey && firstInput)) {
        this.setState({ focused: false });
        this.props.showPicker(false);
      }
      return;
    }
    const inputType = inputRef.current.getAttribute('data-type');
    const index = inputRef.current.getAttribute('index');

    // Handle Delete & Backspace
    if (
      event.keyCode == 8 ||
      event.key == 'Delete' ||
      event.key == 'Backspace'
    ) {
      if (
        (!(
          window.getSelection().containsNode(this._inputRef1.current) &&
          window.getSelection().containsNode(this._inputRef2.current) &&
          window.getSelection().containsNode(this._inputRef3.current)
        ) &&
          !(
            !this.props.isSingleMode &&
            window.getSelection().containsNode(this._inputRef4.current) &&
            window.getSelection().containsNode(this._inputRef5.current) &&
            window.getSelection().containsNode(this._inputRef6.current)
          )) ||
        (this._isFirefox && !this.state.selectAll)
      ) {
        this.onDateChanged(
          {
            [inputType]: -1
          },
          !!postfix,
          false
        );

        event.preventDefault();
        event.stopPropagation();
        //Select the whole input field always so that user cant move cursor on
        setTimeout(() => {
          this.handleOnClick(null, this['_inputRef' + parseInt(index)]);
        }, 0);
        return;
      }
    }

    const inputTypeMinMaxInfo = this.state.dateComponentMinMaxInfo[inputType];
    const inputTypeMin =
      inputTypeMinMaxInfo.minLimit || inputTypeMinMaxInfo.min;
    const inputTypeMax =
      inputTypeMinMaxInfo.maxLimit || inputTypeMinMaxInfo.max;
    if (event.key == 'ArrowUp') {
      if (!this.state[`input${inputType}${postfix}`]) {
        this.onDateChanged(
          {
            [inputType]: inputTypeMin
          },
          !!postfix
        );
      } else {
        const incrementDate =
          parseInt(this.state[`input${inputType}${postfix}`]) + 1;
        this.onDateChanged(
          {
            [inputType]:
              incrementDate <= parseInt(inputTypeMax)
                ? incrementDate
                : inputTypeMin.toString()
          },
          !!postfix
        );
      }
      //Select the whole input field always so that user cant move cursor on it
      setTimeout(() => {
        this.handleOnClick(null, this['_inputRef' + parseInt(index)]);
      }, 0);
    }
    if (event.key == 'ArrowDown') {
      if (!this.state[`input${inputType}${postfix}`]) {
        this.onDateChanged(
          {
            [inputType]: inputTypeMax.toString()
          },
          !!postfix
        );
      } else {
        const incrementDate =
          parseInt(this.state[`input${inputType}${postfix}`]) - 1;
        this.onDateChanged(
          {
            [inputType]:
              incrementDate >= inputTypeMin
                ? incrementDate
                : inputTypeMax.toString()
          },
          !!postfix
        );
      }
      //Select the whole input field always so that user cant move cursor on it
      setTimeout(() => {
        this.handleOnClick(null, this['_inputRef' + parseInt(index)]);
      }, 0);
    }
    if (event.key >= 0 && event.key <= 9) {
      //Can test selectionStart != selectionEnd
      if (
        !this.state[`input${inputType}${postfix}`] ||
        inputRef.current.selectionStart == 0
      ) {
        this.onDateChanged(
          {
            [inputType]: event.key
          },
          !!postfix
        );
        event.key >
          this.state.dateComponentMinMaxInfo[inputType].maxFirstDigit &&
          !lastInput &&
          this.handleOnClick(event, this['_inputRef' + (parseInt(index) + 1)]);
      } else {
        console.log('lastInput', lastInput);
        const newInputValue =
          this.state[`input${inputType}${postfix}`] + event.key;
        parseInt(newInputValue) <
        this.state.dateComponentMinMaxInfo[inputType].max
          ? this.onDateChanged(
              {
                [inputType]: newInputValue
              },
              !!postfix
            )
          : this.onDateChanged(
              {
                [inputType]: this.state.dateComponentMinMaxInfo[
                  inputType
                ].max.toString()
              },
              !!postfix
            );

        !lastInput &&
          inputType.length == newInputValue.toString().length &&
          this.handleOnClick(event, this['_inputRef' + (parseInt(index) + 1)]);
      }
    }

    console.log('inputType', inputType);
    event.preventDefault();
  };

  handleOnBlur = previousFocused => () => {
    previousFocused && this.props.onBlur && this.props.onBlur();
  };

  //Firefox related utility to handle custom selection in text input on firefox
  /**
   * This will change the selectAll state to false on firefox
   * @private
   */
  deselectAllInputOnFirefox = () => {
    this._isFirefox &&
      this.state.selectAll &&
      this.setState({ selectAll: false });
  };
  /**
   * Return background and color style info for selected date input on firefox
   * @private
   */
  getInputStyleForFirefox = () => {
    return {
      backgroundColor:
        this._isFirefox && this.state.selectAll && this.state.focused
          ? this.props.calendarTheme.primary
          : 'unset',
      color:
        this._isFirefox && this.state.selectAll && this.state.focused
          ? this.props.calendarTheme.modalBackgroundColor
          : 'unset'
    };
  };
  /**
   * Render : React life cycle method
   * Here we are rendering inputs based on Date input format
   * Also rendering configurable calendar icon, and cross/delete icon
   */
  render() {
    const { periodSeparator, hasError, calendarTheme } = this.props;
    let styles = getStyles(calendarTheme, this.state.focused, hasError);
    const dateFormat = this.props.dateFormat.split('/');
    const dateComponentSize = this._dateComponentsArray.length - 1;
    return (
      <React.Fragment>
        <div
          style={styles.root}
          tabIndex={'-1'}
          onFocus={this.handleFocus}
          // onKeyDown={event => console.log("onKeyDown_div")}
        >
          <div
            style={{
              ...styles.inputFieldContainer,
              paddingRight: this.props.isSingleMode ? 20 : 0
            }}
          >
            {this._dateComponentsArray.map((compKey, index) => (
              <React.Fragment key={index}>
                <input
                  onChange={() => {}}
                  type={'text'}
                  index={index + 1}
                  ref={this[`_inputRef${index + 1}`]}
                  size={dateFormat[index].length}
                  style={{
                    ...styles.inputField,
                    width: `${dateFormat[index].length}em`,
                    ...this.getInputStyleForFirefox()
                  }}
                  value={String(
                    this.state[`input${dateFormat[index]}`] || dateFormat[index]
                  ).padStart(dateFormat[index].length, '0')}
                  data-type={dateFormat[index]}
                  onBlur={event => {
                    this.handleInputOnBlur(
                      event,
                      this[`_inputRef${index + 1}`]
                    );
                  }}
                  maxLength={dateFormat[index].length}
                  onClick={event =>
                    this.handleOnClick(event, this[`_inputRef${index + 1}`])
                  }
                  onKeyDown={event =>
                    this.handleKeyPress(
                      event,
                      this[`_inputRef${index + 1}`],
                      index == dateComponentSize && this.props.isSingleMode,
                      index == 0
                    )
                  }
                />
                {index !== dateComponentSize && (
                  <span style={styles.selectNone}>/</span>
                )}
              </React.Fragment>
            ))}
          </div>
          {!this.props.isSingleMode && (
            <React.Fragment>
              <span style={styles.periodSeparator}>{periodSeparator}</span>
              <div
                style={{
                  ...styles.inputFieldContainer,
                  paddingLeft: this.props.isSingleMode ? 5 : 10
                }}
              >
                {this._dateComponentsArray.map((compKey, index) => (
                  <React.Fragment key={index + 4}>
                    <input
                      onChange={() => {}}
                      type={'text'}
                      index={index + 4}
                      ref={this[`_inputRef${index + 4}`]}
                      size={dateFormat[index].length}
                      style={{
                        ...styles.inputField,
                        width: `${dateFormat[index].length}em`,
                        ...this.getInputStyleForFirefox(),
                        marginRight:
                          index == dateComponentSize ? '8px' : 'unset'
                      }}
                      value={String(
                        this.state[`input${dateFormat[index]}1`] ||
                          dateFormat[index]
                      ).padStart(dateFormat[index].length, '0')}
                      data-type={dateFormat[index]}
                      onBlur={event => {
                        this.handleInputOnBlur(
                          event,
                          this[`_inputRef${index + 4}`]
                        );
                      }}
                      maxLength={dateFormat[index].length}
                      onClick={event =>
                        this.handleOnClick(event, this[`_inputRef${index + 4}`])
                      }
                      onKeyDown={event =>
                        this.handleKeyPress(
                          event,
                          this[`_inputRef${index + 4}`],
                          index == dateComponentSize,
                          false,
                          '1'
                        )
                      }
                    />
                    {index !== dateComponentSize && (
                      <span style={styles.selectNone}>/</span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </React.Fragment>
          )}
          <span style={styles.highlight} />
          <label title={this.props.label} style={styles.label}>
            {this.props.label}
          </label>
          <div
            style={{
              ...styles.crossIcon,
              visibility: this._showCrossIcon() ? 'visible' : 'hidden'
            }}
            onClick={this._handleCrossIconClick}
          >
            <CrossIcon style={{ ...styles.icon, zIndex: -10 }} />
          </div>

          <div
            style={styles.calendarIcon}
            onClick={this._handleCalendarIconClick}
          >
            {!!this.props.icon && typeof this.props.icon == 'string' ? (
              <img src={this.props.icon} style={styles.icon} />
            ) : (
              <CalendarIcon style={styles.icon} />
            )}
          </div>
        </div>
      </React.Fragment>
    );
  }

  componentWillUnmount() {}
}

DateInputField.defaultProps = {
  icon: CalendarIcon
};
DateInputField.propTypes = {
  label: PropTypes.string.isRequired,
  dateFormat: PropTypes.string.isRequired,
  onDateChanged: PropTypes.func,
  showPicker: PropTypes.func,
  isSingleMode: PropTypes.bool,
  inputDateArray: PropTypes.array,
  periodSeparator: PropTypes.string,
  startLimit: PropTypes.instanceOf(Date),
  endLimit: PropTypes.instanceOf(Date),
  hasError: PropTypes.bool,
  errorMsg: PropTypes.string,
  OnBlur: PropTypes.func,
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  openDatePickerOnClick: PropTypes.bool
};

export default DateInputField;
