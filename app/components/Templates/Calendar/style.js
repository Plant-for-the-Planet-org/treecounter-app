import { labelTopMargin } from '../Calendar/Components/DateInputField/style';

/**
 * Calendar Component root styles
 * @param {*} theme - that receives the theme as argument;
 * @param {*} calendarTheme - that receives the calendarTheme as argument;
 */
export const getStyles = (theme, calendarTheme) => {
  console.log('__THEME___', theme);
  return {
    root: {
      width: '100%',
      fontFamily: 'SourceSansPro',
      fontSize: calendarTheme.fontSize,
      position: 'relative',
      backgroundColor: 'white',
      marginBottom:
        Number.parseInt(calendarTheme.margimBottom) +
        -1 * labelTopMargin +
        'px',
      marginRight: calendarTheme.marginRight,
      marginLeft: calendarTheme.marginLeft,
      fontWeight: 'normal',
      fontStyle: 'normal',
      fontStretch: 'normal',
      lineHeight: 'normal',
      letterSpacing: 'normal'
    },
    errorMsg: {
      marginTop: '5px',
      color: 'red'
    }
  };
};
