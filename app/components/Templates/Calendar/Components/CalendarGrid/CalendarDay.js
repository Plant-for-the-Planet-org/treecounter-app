/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import { getRGBColor } from '../../Utils';
import { selectNone } from '../../Utils/styles';
import { withHover } from '../../Utils/HOCs/withHover';
/**
 * A Reusable and a stateless CalendarDay Component,
 * it represents a Day in calendar grid
 *
 */
class CalendarDay extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      onClick,
      children,
      textInputColor,
      enableHover,
      referenceDate,
      selectedMode,
      selected,
      isRange,
      inMonth,
      isDisabled,
      isSpecialDate,
      calendarTheme,
      lastMontLastDate,
      nextMonthFirstDate,
      isSingleMode,
      title,
      showNeighborMonthDates,
      index
    } = this.props;
    const normalTextColor = calendarTheme.textInputColor;
    const visibility = inMonth || showNeighborMonthDates;
    const textColor =
      textInputColor || getRGBColor(calendarTheme.textInputFocusedColor);
    const isHighlighted = !isDisabled && selected;
    const lightPrimaryColor = calendarTheme.primaryLight;
    const disabledBackgroudnColor =
      calendarTheme.textInputDisabledBackgroudnColor;
    const disabledDarkColor = calendarTheme.secondary;
    const disabledDarkestColor = calendarTheme.secondary500;
    const isSlantDate =
      (nextMonthFirstDate || lastMontLastDate) && (isRange || isHighlighted);
    const isHovered =
      enableHover &&
      this.props.hovering &&
      !isDisabled &&
      (!isRange || (isRange && !inMonth));
    const circleRadius = selected
      ? isSingleMode
        ? inMonth || (!inMonth && (lastMontLastDate || nextMonthFirstDate))
        : true
      : false;
    let parentTransformStyle = {};
    let childTransformStyle = {};
    let viewMaskerStyle = {
      right: 'unset',
      left: 'unset',
      height: '100%',
      width: '50%',
      backgroundColor: calendarTheme.modalBackgroundColor,
      display: 'inline-block',
      position: 'absolute',
      transform: 'unset',
      visibility:
        visibility && ((selected && isHighlighted) || isSlantDate)
          ? 'visible'
          : 'hidden'
    };

    if ((nextMonthFirstDate || lastMontLastDate) && isRange) {
      parentTransformStyle.transform = 'skew(-15deg, 0deg)';
      parentTransformStyle.margin = '0 -4px';
      childTransformStyle.transform = 'skew(15deg, 0deg)';
      childTransformStyle.paddingBottom = '1px';
    }
    let containerStyle = {
      visibility: visibility ? 'visible' : 'hidden',
      display: 'flex',
      justifyContent: 'center',
      position: 'relative',
      zIndex: lastMontLastDate ? 1 : 'unset',
      backgroundColor: isRange
        ? inMonth
          ? lightPrimaryColor
          : disabledDarkColor
        : !inMonth
          ? disabledBackgroudnColor
          : 'transparent',
      minWidth: '30px',
      minHeight: '30px',
      [`borderTop${selectedMode}Radius`]: circleRadius ? '50%' : '0',
      [`borderBottom${selectedMode}Radius`]: circleRadius ? '50%' : '0',
      cursor: 'default',
      ...selectNone,
      color:
        inMonth && !isDisabled
          ? isHighlighted
            ? calendarTheme.modalBackgroundColor
            : isRange || referenceDate
              ? calendarTheme.primary
              : textColor
          : isHighlighted
            ? calendarTheme.modalBackgroundColor
            : normalTextColor,
      ...parentTransformStyle
    };

    const circularMonthDayHolderStyle = {
      ...childTransformStyle,
      zIndex: 12,
      backgroundColor: isHighlighted
        ? inMonth
          ? calendarTheme.primary
          : disabledDarkestColor
        : isHovered
          ? calendarTheme.primaryLight
          : 'transparent',
      maxWidth: '30px',
      width: '100%',
      minHeight: '30px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxSizing: 'border-box',
      position: 'relative',
      border: referenceDate
        ? '1px solid' + (inMonth ? calendarTheme.primary : '')
        : '',
      transition: isHovered ? '300ms ease background-color' : 'none'
    };

    const dateHighlighterStyle = {
      height: 4,
      width: 4,
      backgroundColor: calendarTheme.primary,
      borderRadius: '50%',
      display: 'inline-block',
      bottom: 0,
      position: 'absolute',
      visibility: isSpecialDate && visibility ? 'visible' : 'hidden',
      right: 'calc(50% - 2px)'
    };

    return (
      // Represents a parent container which will have 100% width to fill Flex item gap
      <div
        title={title}
        index={-3}
        onClick={!isDisabled ? onClick : undefined}
        style={containerStyle}
      >
        {/* View Masker to reduce/hide parent container border radius if this is selected day because parent has 100% width*/}
        {isHighlighted && (
          <React.Fragment>
            <div
              selectedmode={selectedMode}
              style={{
                ...viewMaskerStyle,
                right: selectedMode == 'Right' ? 0 : 'unset',
                left: selectedMode !== 'Right' ? 0 : 'unset',
                visibility: visibility ? 'visible' : 'hidden'
              }}
            >
              {!inMonth &&
                index != 0 &&
                index != 6 &&
                (!lastMontLastDate || selectedMode != 'Right') && (
                  // this is for Special case where we dont want to change the background color
                  //case : if date is in neighbor month
                  // we can avoid this special mask and provide its background in parent masker but
                  // due to usage of RGBA color it is not working in every scenario
                  <div
                    style={{
                      ...viewMaskerStyle,
                      width: '100%',
                      right: selectedMode == 'Right' ? 0 : 'unset',
                      left: selectedMode !== 'Right' ? 0 : 'unset',
                      backgroundColor: disabledBackgroudnColor
                    }}
                  />
                )}
            </div>
          </React.Fragment>
        )}
        {/* this view masker is used to hide the slant height if date is at index 0 or index 6 */}
        {/* see bug https://dev.azure.com/wizzio/wizzio-components/_workitems/edit/116 to find test case*/}
        {!inMonth &&
          (index == 0 || index == 6) &&
          (nextMonthFirstDate || lastMontLastDate) && (
            <div
              style={{
                ...viewMaskerStyle,
                width: '20%',
                right:
                  index == 6 && (nextMonthFirstDate || lastMontLastDate)
                    ? '-11%'
                    : 'unset',
                left:
                  index == 0 && (lastMontLastDate || nextMonthFirstDate)
                    ? '-11%'
                    : 'unset',
                transform: 'skew(16deg, 0deg)'
              }}
            />
          )}
        {/* A Circular Date Holder*/}
        {/* This will hold the actual day of month */}
        {/* It has 2 children first is day number itself second is  highlight date dot*/}
        <div style={circularMonthDayHolderStyle}>
          {children}
          <div style={dateHighlighterStyle} />
        </div>
      </div>
    );
  }
}

CalendarDay.defaultProps = {
  enableHover: true,
  referenceDate: false,
  selected: false,
  inMonth: true,
  isDisabled: false,
  isSpecialDate: false,
  lastMontLastDate: false,
  nextMonthFirstDate: false,
  isSingleMode: true
};

CalendarDay.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
  theme: PropTypes.object,
  calendarTheme: PropTypes.object,
  enableHover: PropTypes.bool,
  referenceDate: PropTypes.bool,
  selected: PropTypes.bool,
  isRange: PropTypes.bool,
  selectedMode: PropTypes.string,
  inMonth: PropTypes.bool,
  isDisabled: PropTypes.bool,
  textInputColor: PropTypes.string,
  isSpecialDate: PropTypes.bool,
  lastMontLastDate: PropTypes.bool,
  nextMonthFirstDate: PropTypes.bool,
  isSingleMode: PropTypes.bool,
  title: PropTypes.string,
  showNeighborMonthDates: PropTypes.bool,
  index: PropTypes.number
};

export default withHover(CalendarDay, { width: '100%' });
