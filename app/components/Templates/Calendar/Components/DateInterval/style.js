import { getRGBColor } from '../../Utils';
import { selectNone } from '../../Utils/styles';

export const getStyles = (calendarTheme, focus) => {
  // const colors = theme.components.subHeader.secondary;
  const normalTextColor = calendarTheme.textInputColor;
  const focusedTextColor = calendarTheme.textInputFocusedColor;
  // selectItemHoverColor
  return {
    root: {
      ...selectNone,
      position: 'relative',
      width: '100%',
      backgroundColor: calendarTheme.secondary,
      // color: colors.color,
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: '15px 25px',
      boxSizing: 'border-box',
      minHeight: '16%'
    },
    suggestionsRoot: {
      ...selectNone,
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      background: '#fff',
      padding: '0',
      height: '100%',
      overflowY: 'auto',
      overflowX: 'hidden',
      margin: '0',
      textAlign: 'start',
      WebKitOverflowScrolling: 'touch',
      paddingTop: '20px',
      borderLeft: '1px solid #000',
      borderRight: '1px solid #000',
      boxSizing: 'border-box',
      color: normalTextColor,
      backgroundColor: calendarTheme.modalBackgroundColor
    },
    headerInfo: {
      fontSize: '14px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      textAlign: 'start',
      height: '100%',
      justifyContent: 'space-between'
    },
    suggestionItem: {
      width: '100%',
      padding: '10px 0 10px 5px',
      margin: '0',
      fontSize: 14,
      cursor: 'default',
      display: 'inline-block',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      paddingLeft: 15,
      color: focusedTextColor,
      backgroundColor: calendarTheme.modalBackgroundColor,
      boxSizing: 'border-box'
    }
  };
};
