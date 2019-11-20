import React, { Component, lazy, useState, useEffect } from 'react';
import { Image, Text, TouchableOpacity, View, Keyboard } from 'react-native';

const CardLayout = lazy(() => import('../Common/Card'));

import PropTypes from 'prop-types';
import t from 'tcomb-form-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { competitionFormSchema } from '../../server/parsedSchemas/competition';
import i18n from '../../locales/i18n';
import { competitionDetailSelector } from '../../selectors';
import { fetchCompetitionDetail } from '../../actions/competition';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import imagestyles from '../../styles/file_picker.native';
import styles from '../../styles/competition/mine.native';
import imageUpload from '../../assets/images/icons/upload_image.png';
import close_green from '../../assets/images/icons/close_green.png';
import ImagePicker from 'react-native-image-picker';
import { getDateFromMySQL } from './../../helpers/utils';
import { FormikForm } from './editFormComponents.native';

const UserProfileImage = lazy(() =>
  import('../Common/UserProfileImage.native')
);
const PrimaryButton = lazy(() => import('../Common/Button/PrimaryButton'));

function EditCompetition(props) {
  const [buttonType, setButtonType] = useState('competition');

  const keyboardDidShow = () => {
    setButtonType('>');
  };

  const keyboardDidHide = () => {
    setButtonType('competition');
  };

  useEffect(() => {
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      keyboardDidShow
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      keyboardDidHide
    );

    if (props.competition_id) {
      props.fetchCompetitionDetail(props.competition_id);
    }

    // clean up
    return () => {
      this.keyboardDidShowListener.remove();
      this.keyboardDidHideListener.remove();
    };
  }, []);
  let formValue = {};
  if (props.competitionDetail) {
    formValue = props.competitionDetail;
  }
  const style = { backgroundColor: 'white', flex: 1 };
  return (
    <View style={style}>
      <FormikForm
        buttonType={buttonType}
        onEditCompetition={props.editCompetition}
        onDeleteCompetition={props.deleteCompetition}
        initialValues={{
          name: formValue.name,
          goal: formValue.goal,
          description: formValue.description ? formValue.description : '',
          access: formValue.access,
          endDate: new Date(getDateFromMySQL(formValue.endDate)),
          imageFile: formValue.image ? formValue.image : ''
        }}
        competition_id={props.competition_id}
        navigation={props.navigation}
      />
    </View>
  );
}

const mapStateToProps = state => ({
  competitionDetail: competitionDetailSelector(state)
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      fetchCompetitionDetail
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(EditCompetition);
EditCompetition.propTypes = {
  allCompetitions: PropTypes.any,
  editCompetition: PropTypes.any
};
