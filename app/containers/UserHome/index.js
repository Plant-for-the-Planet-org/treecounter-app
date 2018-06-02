import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { userTreecounterDataSelector } from '../../selectors';
import UserHome from '../../components/UserHome';

class UserHomeContainer extends React.Component {
  render() {
    console.log('Home Component Render with props- ', this.props);

    const { treecounterData } = this.props;

    return <UserHome treecounterData={treecounterData} />;
  }
}

const mapStateToProps = state => ({
  treecounterData: userTreecounterDataSelector(state)
});

export default connect(mapStateToProps)(UserHomeContainer);

UserHomeContainer.propTypes = {
  treecounterData: PropTypes.object
};
