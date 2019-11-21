import React, { Component, lazy } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import styles from '../../../styles/competition/competition-master.native';
import scrollStyle from '../../../styles/common/scrollStyle.native';
import imagestyles from '../../../styles/file_picker.native';
const CompetitionSnippet = lazy(() => import('../CompetitionSnippet.native'));

import ActionButton from 'react-native-action-button';

const CardLayout = lazy(() => import('../../Common/Card'));

import PropTypes from 'prop-types';
import { trees } from './../../../assets';
import i18n from '../../../locales/i18n';
const PrimaryButton = lazy(() => import('../../Common/Button/PrimaryButton'));
const UserProfileImage = lazy(() => import('../../Common/UserProfileImage'));

import close_green from '../../../assets/images/icons/close_green.png';
import imageUpload from '../../../assets/images/icons/upload_image.png';
import ImagePicker from 'react-native-image-picker';

// let Form = t.form.Form;

// const getCompFormLayoutTemplate = () => {
//   const formLayoutTreesTemplate = locals => {
//     return (
//       <View style={styles.competitonCreateMain}>
//         {locals.inputs.name}
//         <View style={styles.competition_create_row}>
//           <View style={{ flex: 1 }}>{locals.inputs.goal}</View>
//           <View style={{ flex: 1 }}>{locals.inputs.endDate}</View>
//         </View>
//         <View style={styles.competition_create_row}>
//           <View style={{ flex: 1 }}>{locals.inputs.access}</View>
//         </View>
//         <View style={styles.competition_image}>
//           <View style={{ flex: 1 }}>
//             <Text style={styles.addImageTextStyle}>
//               {i18n.t('label.add_image')}
//             </Text>
//           </View>
//           <View style={{ flex: 1 }}>{locals.input.imageFile}</View>
//         </View>
//         {locals.inputs.description}
//       </View>
//     );
//   };
//   return formLayoutTreesTemplate;
// };
const getCompFormImageLayoutTemplate = () => {
  console.log('formlayout');
  const formLayoutTreesTemplate = locals => {
    console.log(locals);

    const options = {
      title: i18n.t('label.add_image_title'),
      cancelButtonTitle: i18n.t('label.cancel'),
      takePhotoButtonTitle: i18n.t('label.take_photo'),
      chooseFromLibraryButtonTitle: i18n.t('label.choose_from_library'),
      'permissionDenied.title': i18n.t('label.permission_denied_title'),
      'permissionDenied.text': i18n.t('label.permission_denied_text'),
      'permissionDenied.reTryTitle': i18n.t(
        'label.permission_denied_retry_title'
      ),
      'permissionDenied.okTitle': i18n.t('label.permission_denied_ok_title'),
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    };

    return (
      <View style={imagestyles.filePickerContainer}>
        <View style={{ flex: 1 }}>
          <Text style={styles.addImageTextStyle}>
            {i18n.t('label.add_image')}
          </Text>
        </View>
        <TouchableOpacity
          style={{ flex: 1 }}
          onPress={
            (/* event */) => {
              ImagePicker.showImagePicker(options, response => {
                // console.log('Response = ', response);

                if (response.didCancel) {
                  //console.log('User cancelled image picker');
                } else if (response.error) {
                  //console.log('ImagePicker Error: ', response.error);
                } else if (response.customButton) {
                  // console.log('User tapped custom button: ', response.customButton);
                } else {
                  // let source = { uri: response.uri };
                  locals.onChange('data:image/jpeg;base64,' + response.data);
                }
              });
            }
          }
        >
          {!locals.value ? (
            <Image source={imageUpload} style={{ height: 40, width: 40 }} />
          ) : (
            <View>
              <UserProfileImage profileImage={locals.value} />
              <View style={styles.profileImageBackground}>
                <Image
                  resizeMode="contain"
                  style={imagestyles.addIcon}
                  source={close_green}
                />
              </View>
            </View>
          )}
        </TouchableOpacity>
      </View>
    );
  };
  return formLayoutTreesTemplate;
};

export default class MineCompetitions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myCompetitions: []
    };
  }

  componentDidMount() {
    let { allCompetitions } = this.props;
    let myCompetitions = [];
    if (allCompetitions.length > 0) {
      allCompetitions.forEach(val => {
        if (val.category === 'mine') {
          val.competitions.forEach(comp => {
            myCompetitions.push(comp);
          });
        }
      });
    }
    this.setState({
      myCompetitions: myCompetitions
    });
  }

  componentWillReceiveProps(nextProps) {
    let { allCompetitions } = nextProps;
    if (allCompetitions !== this.props.allCompetitions) {
      let myCompetitions = [];
      if (allCompetitions.length > 0) {
        allCompetitions.forEach(val => {
          if (val.category === 'mine') {
            val.competitions.forEach(comp => {
              myCompetitions.push(comp);
            });
          }
        });
      }
      this.setState({
        myCompetitions: myCompetitions
      });
    }
  }

  render() {
    let { myCompetitions } = this.state;

    return (
      <ScrollView
        contentContainerStyle={[
          scrollStyle.styleContainer,
          { paddingBottom: 72 }
        ]}
      >
        <View style={styles.headerView}>
          <Text style={styles.headerTitle}>
            {myCompetitions.length > 0
              ? i18n.t('label.mine_compeition_tab_header')
              : i18n.t('label.mine_compeition_tab_header_null')}
          </Text>
          <Image
            source={trees}
            style={{ height: 60, flex: 1 }}
            resizeMode="contain"
          />
        </View>
        {myCompetitions.length > 0
          ? myCompetitions.map(competition => (
              <CompetitionSnippet
                key={'competition' + competition.id}
                cardStyle={styles.cardStyle}
                onMoreClick={id => this.props.onMoreClick(id, competition.name)}
                competition={competition}
                leaveCompetition={id => this.props.leaveCompetition(id)}
                enrollCompetition={id => this.props.enrollCompetition(id)}
                editCompetition={this.props.editCompetition}
                type="mine"
              />
            ))
          : null}
      </ScrollView>
    );
  }
}
MineCompetitions.propTypes = {
  allCompetitions: PropTypes.any,
  onMoreClick: PropTypes.any,
  leaveCompetition: PropTypes.any,
  enrollCompetition: PropTypes.any,
  onCreateCompetition: PropTypes.any,
  editCompetition: PropTypes.any
};
