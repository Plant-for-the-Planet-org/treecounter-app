import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import CardLayout from '../Common/Card';
import {
  singleTreeRegisterFormSchema,
  schemaOptionsSingleTree,
  multipleTreesRegisterFormSchema,
  schemaOptionsMultipleTrees
} from '../../server/parsedSchemas/registerTrees';
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
        <CardLayout>
          <RegisterTreeTab
            buttonTitle={i18n.t('label.update')}
            onRegister={this.props.onSubmit}
            mode={this.state.mode}
            plantProjects={this.plantProjects}
            schemaType={
              this.state.mode == 'single-tree'
                ? singleTreeRegisterFormSchema
                : multipleTreesRegisterFormSchema
            }
            isTpo={isTpo(this.props.currentUserProfile)}
            schemaOptions={
              this.state.mode == 'single-tree'
                ? schemaOptionsSingleTree
                : schemaOptionsMultipleTrees
            }
            value={this.props.userContribution}
            isEdit
          />
        </CardLayout>
      </KeyboardAwareScrollView>
    );
  }
}

EditUserContribution.propTypes = {
  userContribution: PropTypes.object,
  onSubmit: PropTypes.func
};
