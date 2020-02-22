import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { competitionDetailSelector } from '../../selectors';
import { fetchCompetitionDetail } from '../../actions/competition';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getDateFromMySQL } from './../../helpers/utils';
import HeaderNew from './../Header/HeaderNew.native';

import { View, Keyboard } from 'react-native';
import { FormikForm } from './editFormComponents.native';

function EditCompetition(props) {
  const [buttonType, setButtonType] = useState('competition');

  const keyboardDidShow = () => {
    setButtonType('>');
  };

  const keyboardDidHide = () => {
    setButtonType('competition');
  };

  let keyboardDidShowListener;
  let keyboardDidHideListener;
  useEffect(() => {
    keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      keyboardDidShow
    );
    keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      keyboardDidHide
    );

    if (props.competition_id) {
      props.fetchCompetitionDetail(props.competition_id);
    }

    // clean up
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);
  let formValue = {};
  if (props.competitionDetail) {
    formValue = props.competitionDetail;
  }
  const style = { backgroundColor: 'white', flex: 1 };
  return (
    <View style={style}>
      <HeaderNew title={''} navigation={props.navigation} />
      <View style={{ marginTop: Platform.OS === 'ios' ? 80 : 40 }} />
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
