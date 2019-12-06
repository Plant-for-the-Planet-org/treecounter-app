import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { competitionDetailSelector } from '../../selectors';
import { fetchCompetitionDetail } from '../../actions/competition';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getDateFromMySQL } from './../../helpers/utils';

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
