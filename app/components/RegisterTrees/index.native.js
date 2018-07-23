import React, { Component } from 'react';
import { ScrollView, View, Text } from 'react-native';
import PropTypes from 'prop-types';
import styles from '../../styles/login';
// import t from 'tcomb-form';
import t from 'tcomb-form-native';

let Form = t.form.Form;

// import Tabs from '../Common/Tabs';
// import PrimaryButton from '../Common/Button/PrimaryButton';
// import TextHeading from '../Common/Heading/TextHeading';
// import CardLayout from '../Common/Card/CardLayout';
// import {
// singleTreeRegisterFormSchema,
// schemaOptionsSingleTree,
// multipleTreesRegisterFormSchema,
// schemaOptionsMultipleTrees
// } from '../../server/parsedSchemas/registerTrees';
import i18n from '../../locales/i18n.js';
// import RegistrationMap from './RegistrationMap';
// import DescriptionHeading from '../../components/Common/Heading/DescriptionHeading';

// let TCombForm = t.form.Form;

// const formLayoutSingleTree = locals => {
//   return (
//     <View >
//       <Text className="register-tree__form--row">
//         {locals.inputs.treeCount}
//         {locals.inputs.treeSpecies}
//       </Text>
//       <Text className="register-tree__form--row">
//       {locals.inputs.plantDate}
//       {locals.inputs.geoLocation}
//       </Text>
//       <Text className="register-tree__form--row">
//         {locals.inputs.contributionImages}
//       </Text>
//       <View className="register-tree__form--row">
//         <Text>{locals.inputs.treeClassification}</Text>
//         <View className="register-tree__form--row__spacer" />
//         <Text>{locals.inputs.treeScientificName}</Text>
//       </View>
//       <Text className="register-tree__form--row">
//         {locals.inputs.contributionMeasurements}
//       </Text>
//     </View>
//   );
// };

// const formLayoutMultipleTrees = locals => {
//   return (
//     <View className="register-tree__form">
//       <View className="register-tree__form--row">
//         <Text>{locals.inputs.treeCount}</Text>
//         <View className="register-tree__form--row__spacer" />
//         <Text>{locals.inputs.treeSpecies}</Text>
//       </View>
//       <View className="register-tree__form--row">{locals.inputs.plantDate}</View>
//       <Text>{locals.inputs.geoLocation}</Text>
//       <Text className="register-tree__form--row">
//         {locals.inputs.contributionImages}
//       </Text>
//     </View>
//   );
// };

// const schemaOptionsSingle = {
//   template: formLayoutSingleTree,
//   ...schemaOptionsSingleTree
// };

// const schemaOptionsMultiple = {
//   template: formLayoutMultipleTrees,
//   ...schemaOptionsMultipleTrees
// };

export default class RegisterTrees extends Component {
  static data = {
    tabs: [
      {
        name: i18n.t('label.individual'),
        id: 'single-tree'
      },
      {
        name: i18n.t('label.many_trees'),
        id: 'multiple-trees'
      }
    ]
  };

  constructor() {
    super();

    this.state = {
      mode: '',
      individual: {
        treeCount: 1
      }
    };

    // Bind Local method
    this.onSubmitClick = this.onSubmitClick.bind(this);
    this.handleModeOptionChange = this.handleModeOptionChange.bind(this);
    this.handleGeoLocationChange = this.handleGeoLocationChange.bind(this);
  }

  onSubmitClick() {
    this.props.onSubmit(this.state.mode);
  }

  handleModeOptionChange(tab) {
    this.setState({ mode: tab });
  }

  handleGeoLocationChange(geoLocation) {
    console.log(geoLocation);
  }

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.loginHeader}>
          <Text style={styles.titleText}>
            {i18n.t('label.heading_register_trees')}
          </Text>
          <View style={styles.titleTextUnderline} />
          <Text style={styles.descriptionText}>
            {i18n.t('label.register_description')}
          </Text>
        </View>
        <View style={styles.inputContainer}>
          {/* <TouchableNativeFeedback onPress={this.handleModeOptionChange}>
        <Text>{RegisterTrees.data.tabs}</Text>
        </TouchableNativeFeedback> */}
          {/* {this.state.mode === RegisterTrees.data.tabs[0].id ? ( */}
          {/* <Form
                ref="registerTreeForm"
                type={singleTreeRegisterFormSchema}
                options={schemaOptionsSingle}
                // value={this.state.individual}
              /> */}
          {/* ) : (
              <Form
                ref="registerTreeForm"
                type={multipleTreesRegisterFormSchema}
                options={schemaOptionsMultiple}
              />
            )} */}
        </View>
        {/* 
        <CardLayout>
          <Tabs
            data={RegisterTrees.data.tabs}
            onTabChange={this.handleModeOptionChange}
          >
            {this.state.mode === RegisterTrees.data.tabs[0].id ? (
              <TCombForm
                ref="registerTreeForm"
                type={singleTreeRegisterFormSchema}
                options={schemaOptionsSingle}
                value={this.state.individual}
              />
            ) : (
              <TCombForm
                ref="registerTreeForm"
                type={multipleTreesRegisterFormSchema}
                options={schemaOptionsMultiple}
              />
            )}
          </Tabs>
          <PrimaryButton onClick={this.onSubmitClick}>
            {i18n.t('label.register')}
          </PrimaryButton>
        </CardLayout> */}
      </ScrollView>
    );
  }
}

RegisterTrees.propTypes = {
  onSubmit: PropTypes.func.isRequired
};
