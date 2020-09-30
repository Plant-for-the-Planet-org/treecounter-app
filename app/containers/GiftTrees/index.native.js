import React from 'react';
import { connect } from 'react-redux';
import { setGiftContextDetails } from '../../components/DonateTrees/redux/action';
import NewGiftTrees from '../../components/NewGiftTrees/index.native';

const GiftTreesContainer = props => {
  return <NewGiftTrees {...props} />;
};

const mapStateToProps = state => ({
  contextType: state.donations.contextType,
  giftDetails: state.donations.giftDetails
});

const mapDispatchToProps = {
  setGiftContextDetails
};

export default connect(mapStateToProps, mapDispatchToProps)(GiftTreesContainer);
