import { selectNone, textOverflowEllipsis } from '../../Utils/styles';
export const labelTopMargin = -12;
export const getStyles = (theme, focus, hasError = false) => {
  const textInputColor = focus
    ? theme.textInputFocusedColor
    : theme.textInputColor;
  const labelTextColor = focus
    ? theme.textInputFocusedLabelColor
    : theme.textInputLabelColor;
  const borderColor = focus
    ? theme.textInputFocusedBorderColor
    : theme.textInputBorderColor;
  const iconColor = focus
    ? theme.textInputFocusedIconColor
    : theme.textInputIconColor;
  const errorColor = theme.textInputErrorBorderColor;
  const icon = {
    color: iconColor,
    transition: '300ms ease all',
    position: 'absolute',
    paddingRight: '8px'
  };
  return {
    root: {
      position: 'relative',
      width: '100%',
      // backgroundColor: theme.palette.primary[500],
      display: 'flex',
      alignItems: 'center',
      border: 'none',
      borderBottom: hasError
        ? '1px solid' + errorColor
        : '1px solid' + borderColor
    },
    inputFieldContainer: {
      background: 'none',
      color: textInputColor,
      padding: '8px 20px 8px 5px',
      display: 'block',
      boxSizing: 'border-box',
      border: 'none',
      outline: 'none',
      transition: '300ms ease all'
    },
    inputField: {
      background: 'none',
      color: textInputColor,
      cursor: 'default',
      width: '2em',
      display: 'inline',
      boxSizing: 'border-box',
      border: 'none',
      outline: 'none',
      transition: '300ms ease all',
      padding: 0,
      borderRadius: 0
    },
    periodSeparator: {
      color: textInputColor
    },
    label: {
      top: labelTopMargin + 'px',
      color: hasError ? errorColor : labelTextColor,
      fontSize: '14px',
      position: 'absolute',
      left: '5px',
      transition: '300ms ease all',
      width: '100%',
      textAlign: 'left',
      ...textOverflowEllipsis,
      ...selectNone
    },
    calendarIcon: {
      width: '24px',
      height: '24px',
      marginLeft: '-25px',
      right: 0,
      ...selectNone,
      ...icon
    },
    crossIcon: {
      width: '15px',
      height: '15px',
      marginLeft: '-25px',
      ...icon,
      right: 40
    },
    icon: {
      width: '100%',
      height: '100%',
      pointerEvents: 'none'
    },
    highlight: {
      boxSizing: 'border-box',
      display: 'block',
      height: '2px',
      width: focus ? '100%' : '0',
      bottom: '-1px',
      position: 'absolute',
      background: hasError ? errorColor : borderColor,
      transition: '300ms ease all',
      left: focus ? '0%' : '50%',
      outline: 'none'
    },
    selectNone: {
      ...selectNone
    },
    errorMsg: {
      marginTop: '5px',
      color: errorColor,
      position: 'absolute'
      // width: "100%",
      // ...textOverflowEllipsis
    }
  };
};
