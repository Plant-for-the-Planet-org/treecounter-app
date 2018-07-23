import { View, Text, TouchableHighlight } from 'react-native';
import React from 'react';

export function ListTemplateGenerator(config) {
  return function ListTemplate(locals) {
    if (locals.hidden) {
      return null;
    }

    let stylesheet = locals.stylesheet;
    let fieldsetStyle = stylesheet && stylesheet.fieldset;
    let controlLabelStyle = fieldsetStyle && stylesheet.controlLabel.normal;

    if (locals.hasError) {
      controlLabelStyle = stylesheet.controlLabel.error;
    }

    let label = locals.label ? (
      <Text style={controlLabelStyle}>{locals.label}</Text>
    ) : null;
    let error =
      locals.hasError && locals.error ? (
        <Text accessibilityLiveRegion="polite" style={stylesheet.errorBlock}>
          {locals.error}
        </Text>
      ) : null;

    let rows =
      locals.items &&
      locals.items.map(function(item) {
        return item.buttons.length === 0
          ? renderRowWithoutButtons(item)
          : renderRow(item, stylesheet);
      });

    let addButton = locals.add ? renderRowButton(locals.add, stylesheet) : null;

    return (
      <View style={fieldsetStyle}>
        {label}
        {error}
        {rows}
        {addButton}
      </View>
    );
  };
}

function renderRowWithoutButtons(item) {
  return <View key={item.key}>{item.input}</View>;
}

function renderRowButton(button, stylesheet, style) {
  return (
    <TouchableHighlight
      key={button.type}
      style={[stylesheet.button, style]}
      onPress={button.click}
    >
      <Text style={stylesheet.buttonText}>{button.label}</Text>
    </TouchableHighlight>
  );
}

function renderButtonGroup(buttons, stylesheet) {
  return (
    <View style={{ flexDirection: 'row' }}>
      {buttons.map(button =>
        renderRowButton(button, stylesheet, { width: 50 })
      )}
    </View>
  );
}

function renderRow(item, stylesheet) {
  return (
    <View key={item.key} style={{ flexDirection: 'row' }}>
      <View style={{ flex: 1 }}>{item.input}</View>
      <View style={{ flex: 1 }}>
        {renderButtonGroup(item.buttons, stylesheet)}
      </View>
    </View>
  );
}
