import axios from 'axios';

export const handleAndroidPayPress = async (props) => {
    try {
        props.setToken(null)

        const token = await props.stripe.paymentRequestWithNativePay({
            total_price: props.totalPrice,
            currency_code: props.currency_code,
            billing_address_required: true,
            // phone_number_required: true,
            line_items: [{
                currency_code: props.currency_code,
                description: 'Donation to Plant for the Planet',
                total_price: props.totalPrice,
                unit_price: props.amountPerTree,
                quantity: props.totalTreeCount,
            }],
        }).then(
            token => {
                console.log('Token from GPAY --- ', token)
                // let donorValues = {
                //     firstname: token.card.name,
                //     lastname: token.card.name,
                //     email: 'a@b.com',
                //     address: token.card.addressLine1,
                //     zipCode: token.card.addressZip,
                //     city: token.card.addressCity,
                //     country: token.card.addressCountry,
                //     isCompany: false
                // }
                // console.log('Donor Details', donorValues)
                // props.setDonorDetails(donorValues)

                // Create Donation API
                let loggedIn = props.currentUserProfile;
                let plantProject = '1';
                let newData = {
                    "amount": Number(props.totalPrice),
                    "currency": props.currency_code,
                    "recipientType": 'individual',
                    "treeCount": Number(props.totalTreeCount),
                    "receiptIndividual": {
                        "firstname": token.card.name,
                        "lastname": token.card.name,
                        "email": "a@b.com",
                        "address": token.card.addressLine1,
                        "zipCode": token.card.addressZip,
                        "city": token.card.addressCity,
                        "country": token.card.addressCountry
                    }
                };

                let donationType = props.context.contextType;
                console.log('Donation Type', donationType)
                console.log('newData', newData)
                props.createDonation(newData, plantProject, loggedIn, donationType);
                console.log('Donation ID', props.context.donationID)
                const data = {
                    type: 'card',
                    card: { token: token.tokenId },
                    key: 'pk_test_9L6XVwL1f0D903gMcdbjRabp00Zf7jYJuw',
                }
                // console.log('Data', data)
                const paymentMethod = axios.post('https://api.stripe.com/v1/payment_methods', JSON_to_URLEncoded(data), {
                    headers: {
                        Authorization: 'Bearer sk_test_pvrGEhOIEu3HwYdLTMhqznnl00kFjZUvMD',
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                    }
                }).then(response => {
                    console.log('Payment Method', response)

                    let payData = {
                        "paymentProviderRequest": {
                            "account": token.card.cardId,
                            "gateway": "stripe",
                            "source": {
                                "id": response.data.id,
                                "object": response.data.object
                            }
                        }
                    }
                    console.log('Pay Data', payData)


                    // props.donationPay(payData, donationID, loggedIn);
                    // Send this payment method to the backend to make the payment

                    // Donation Pay API
                })
                    .catch(error => {
                        console.log(error.response)
                    });
            }
        ).catch(err => {
            console.log('error gpay', err)
        })
        props.setToken(token)
    } catch (error) {
        console.log('Error', error)
    }
}

function JSON_to_URLEncoded(element, key, list) {
    var list = list || [];
    if (typeof (element) == 'object') {
        for (var idx in element)
            JSON_to_URLEncoded(element[idx], key ? key + '[' + idx + ']' : idx, list);
    } else {
        list.push(key + '=' + encodeURIComponent(element));
    }
    return list.join('&');
}