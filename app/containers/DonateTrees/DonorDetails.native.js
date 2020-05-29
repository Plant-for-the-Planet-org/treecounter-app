import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setDonationDetails, setDonorDetails, setPaymentDetails, setPaymentResponse, setPledgeDetails, setSelectedProjectDetails } from '../../components/DonateTrees/redux/action';
import DonorDetailsNative from '../../components/DonateTrees/screens/DonorDetails.native';
import { currentUserProfileSelector } from '../../selectors/index';
const DonorDetails = (props) => {

    return (
        <DonorDetailsNative
            navigation={props.navigation}
            context={{
                contextType: props.contextType,
                giftDetails: props.giftDetails,
                projectDetails: props.projectDetails,
                supportTreeCounterDetails: props.supportTreeCounterDetails,
                donationDetails: props.donationDetails,
                donorDetails: props.donorDetails,
                paymentDetails: props.paymentDetails,
                pledgeDetails: props.pledgeDetails
            }}
            contextActions={{
                setDonationDetails: props.setDonationDetails,
                setDonorDetails: props.setDonorDetails,
                setPaymentDetails: props.setPaymentDetails
            }}
            currentUserProfile={props.currentUserProfile}
            paymentSetup={props.navigation.getParam('paymentSetup')}
        />
    )
}


const mapStateToProps = state => {
    return {
        contextType: state.donations.contextType,
        giftDetails: state.donations.giftDetails,
        projectDetails: state.donations.projectDetails,
        supportTreeCounterDetails: state.donations.supportTreeCounterDetails,
        donationDetails: state.donations.donationDetails,
        donorDetails: state.donations.donorDetails,
        paymentDetails: state.donations.paymentDetails,
        pledgeDetails: state.donations.pledgeDetails,
        currentUserProfile: currentUserProfileSelector(state)
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            setDonationDetails,
            setDonorDetails,
            setPaymentDetails,
            setSelectedProjectDetails,
            setPaymentResponse,
            setPledgeDetails
        },
        dispatch
    );
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DonorDetails);
