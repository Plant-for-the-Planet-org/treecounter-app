import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RegisterTreeTab from '../RegisterTrees/RegisterTreeTab.native';
import i18n from '../../locales/i18n.js';
import { getPlantProjectEnum, isTpo } from '../../helpers/utils';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default class EditUserContribution extends Component {
  static mode = {
    singleTree: 'single-tree',
    multipleTrees: 'multiple-trees'
  };

  constructor(props) {
    super(props);
    let mode;
    if (props.userContribution.treeCount > 1) {
      mode = EditUserContribution.mode.multipleTrees;
    } else {
      mode = EditUserContribution.mode.singleTree;
    }

    this.state = {
      mode: mode
    };
    this.plantProjects = getPlantProjectEnum(
      this.props.currentUserProfile,
      this.props.plantProjects
    );
    // Bind Local method
    this.onSubmitClick = this.onSubmitClick.bind(this);
  }

  onSubmitClick() {
    this.props.onSubmit();
  }

  render() {
    return (
      <KeyboardAwareScrollView
        enableOnAndroid
        contentContailnerStyle={{ justifyContent: 'center' }}
        extraHeight={66}
        keyboardShouldPersistTaps={'handled'}
        extraScrollHeight={50}
        enableResetScrollToCoords={false}
      >
        <RegisterTreeTab
          onRegister={this.props.onSubmit}
          mode={this.state.mode}
          plantProjects={this.plantProjects}
          isTpo={isTpo(this.props.currentUserProfile)}
          value={this.props.userContribution}
          isEdit
        />
      </KeyboardAwareScrollView>
    );
  }
}

EditUserContribution.propTypes = {
  userContribution: PropTypes.object,
  onSubmit: PropTypes.func
};
