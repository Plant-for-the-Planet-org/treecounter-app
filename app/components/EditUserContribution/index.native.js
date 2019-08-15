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
import RegisterTreeTab from '../RegisterTrees/RegisterTreeTab';
import i18n from '../../locales/i18n.js';

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

    // Bind Local method
    this.onSubmitClick = this.onSubmitClick.bind(this);
  }

  onSubmitClick() {
    this.props.onSubmit();
  }

  render() {
    return (
      <ScrollView>
        <CardLayout>
          <RegisterTreeTab
            buttonTitle={i18n.t('label.update')}
            onRegister={this.props.onSubmit}
            mode={this.state.mode}
            schemaType={
              this.state.mode == 'single-tree'
                ? singleTreeRegisterFormSchema
                : multipleTreesRegisterFormSchema
            }
            schemaOptions={
              this.state.mode == 'single-tree'
                ? schemaOptionsSingleTree
                : schemaOptionsMultipleTrees
            }
            value={this.props.userContribution}
          />
        </CardLayout>
      </ScrollView>
    );
  }
}

EditUserContribution.propTypes = {
  userContribution: PropTypes.object,
  onSubmit: PropTypes.func
};
