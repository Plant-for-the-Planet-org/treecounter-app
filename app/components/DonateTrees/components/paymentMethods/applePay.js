import axios from 'axios';

export const handleApplePayPress = async (props) => {
    try {
        props.setApplePayStatus('')
        props.setToken(null)
        const token = await props.stripe.paymentRequestWithNativePay({
            requiredBillingAddressFields: ['all'],
            currencyCode: props.currency_code
        },
            [{
                label: 'Donation to Plant for the Planet',
                amount: props.totalPrice,
            },
            ]).then(token => {
                let loggedIn = props.currentUserProfile;
                let plantProject = '1';
                console.log("Token apple pay", token)

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
                console.log('loggedIn', loggedIn)
                props.createDonation(newData, plantProject, loggedIn, donationType);
                console.log('Donation ID', props.context.donationID)
                const data = {
                    type: 'card',
                    card: { token: token.tokenId },
                    key: 'pk_test_9L6XVwL1f0D903gMcdbjRabp00Zf7jYJuw',
                }

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
                })
                    .catch(error => {
                        console.log(error.response)
                    });
            }).catch(error => {
                console.log(error)
            })

        props.setToken(token)

        // if (applePayComplete) {
        //     await props.stripe.completeNativePayRequest()
        //     props.setApplePayStatus('Apple Pay payment completed')
        //     console.log('Entered if')
        // } else {
        //     await props.stripe.cancelNativePayRequest()
        //     props.setApplePayStatus('Apple Pay payment cancelled')
        //     console.log('Entered else')
        // }
    } catch (error) {
        props.setApplePayStatus(`Error: ${error.message}`)
        console.log('Error', error.message)
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