// import { getPalettes } from "@ui-lib/core/styles";

const getPalettes = () => {
  return {};
};
export const getRGBColor = function(rgbColor) {
  if (rgbColor.hasOwnProperty('color')) {
    return `rgba(${rgbColor.color[0]},${rgbColor.color[1]},${
      rgbColor.color[2]
    },${rgbColor.valpha})`;
  }
  return rgbColor;
};

export function buildCalendarThemeInfo(theme) {
  //   $colorPrimary: #bad788;
  // $colorPrimaryDark: #b7d37f;
  // $colorPrimaryAccent: #e86f56;
  // $colorPrimaryAccentLight: #ec6453;
  // $headerTextColor: #686060;
  // $hoverColor: #f4f4f4;
  // $fontSizeNormal: 14px;
  // $placeholderColor: #e9e9e9;
  // $spanTextColor: #9c9b9b;
  // $colorError: #ff0033;
  // $colorRedeemBorder: #9fc356;
  // $colorRedeemInside: #f5fbe8;
  // $boxShadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2),
  // 0 1px 5px 0 rgba(0, 0, 0, 0.12);

  console.log(theme);
  let defaultThemeObject = {
    darkTextColor: '#333333',
    dropdownFontSize: '',
    errorPrimary: '#ff0033',
    fontSize: '',
    lightTextColor: '#ffffff',
    margimBottom: '',
    marginLeft: '',
    marginRight: '',
    modalBackgroundColor: '#ffffff',
    primary: '#bad788',
    primary200: 'rgba(15, 196, 255,0.2)',
    primaryLight: '#daedbb',
    secondary: '#e86f56',
    secondary500: 'rgb(134, 134, 134)',
    selectFocusedBorderColor: '#bad788',
    selectFocusedLabelTextColor: '#bad788',
    selectItemBackgroundColor: '#ffffff',
    selectItemColor: '#000000',
    selectItemHoverColor: '#bad788',
    selectLabelTextColor: 'rgba(35,35,35,0.6)',
    successPrimary: '#26a020',
    textInputBorderColor: '#232323',
    textInputColor: 'rgba(35,35,35,0.4)',
    textInputDisabledBackgroudnColor: 'rgba(35,35,35,0.030000000000000027)',
    textInputErrorBorderColor: '#ff0033',
    textInputFocusedBorderColor: '#bad788',
    textInputFocusedColor: '#232323',
    textInputFocusedIconColor: 'rgba(35,35,35,0.7)',
    textInputFocusedLabelColor: '#bad788',
    textInputIconColor: 'rgba(35,35,35,0.19999999999999996)',
    textInputLabelColor: 'rgba(35,35,35,0.6)'
  };
  if (theme && theme.components) {
    if (!!theme.components.select) {
      defaultThemeObject.selectLabelTextColor = getRGBColor(
        theme.components.select.labelTextColor
      );
      defaultThemeObject.selectFocusedLabelTextColor = getRGBColor(
        theme.components.select.labelTextColorFocus
      );
      defaultThemeObject.selectFocusedBorderColor = getRGBColor(
        theme.components.select.borderColorFocus
      );
    }
    if (!!theme.components.selectOptions) {
      defaultThemeObject.selectItemColor = theme.components.selectOptions.color;
      defaultThemeObject.selectItemBackgroundColor =
        theme.components.selectOptions.backgroundColor;
      defaultThemeObject.selectItemHoverColor =
        theme.components.selectOptions.hoverColor;
    }
    if (!!theme.palette) {
      let palette = getPalettes(theme);

      defaultThemeObject.primary = theme.palette.primary;
      defaultThemeObject.primaryLight = theme.palette.primaryLight;
      defaultThemeObject.secondary = theme.palette.secondary;
      defaultThemeObject.secondary500 = palette.secondary[500];
    }
    if (!!theme.components.calendar) {
      defaultThemeObject.datePickerBorder =
        theme.components.calendar.datePickerBorder;
      defaultThemeObject.fontSize = theme.components.calendar.fontSize;
      defaultThemeObject.dropdownFontSize =
        theme.components.calendar.dropdownFontSize;
      defaultThemeObject.margimBottom = theme.components.calendar.margimBottom;
      defaultThemeObject.marginLeft = theme.components.calendar.marginLeft;
      defaultThemeObject.marginRight = theme.components.calendar.marginRight;
    }
    if (!!theme.components.textInput) {
      defaultThemeObject.textInputFocusedBorderColor =
        theme.components.textInput.borderColorFocus;
      defaultThemeObject.textInputErrorBorderColor =
        theme.components.textInput.errorBorderColor;
      defaultThemeObject.textInputBorderColor =
        theme.components.textInput.borderColor;

      defaultThemeObject.textInputFocusedColor =
        theme.components.textInput.textColorFocus;
      defaultThemeObject.textInputColor = getRGBColor(
        theme.components.textInput.textColor
      );

      defaultThemeObject.textInputFocusedLabelColor =
        theme.components.textInput.labelTextColorFocus;
      defaultThemeObject.textInputLabelColor = getRGBColor(
        theme.components.textInput.labelTextColor
      );

      defaultThemeObject.textInputFocusedIconColor = getRGBColor(
        theme.components.textInput.iconColorFocus
      );
      defaultThemeObject.textInputIconColor = getRGBColor(
        theme.components.textInput.iconColor
      );
      defaultThemeObject.textInputDisabledBackgroudnColor = getRGBColor(
        theme.components.textInput.disabledBackgroudnColor
      );
    }
    if (!!theme.components.modal) {
      defaultThemeObject.modalBackgroundColor =
        theme.components.modal.backgroundColor;
    }
  }
  console.log('defaultThemeObject', defaultThemeObject);
  return defaultThemeObject;
}
