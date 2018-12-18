const axios = require('axios');
const fs = require('fs');

const list = [
  {
    objectKey: 'targetUpdate_form',
    file: 'target.js'
  },
  {
    objectKey: 'donationContribution_form',
    file: 'donateTrees.js'
  },
  {
    objectKey: 'giftDonationContribution_form',
    file: 'giftTrees.js'
  },
  {
    objectKey: 'plantContribution_forms',
    file: 'registerTrees.js'
  },
  {
    objectKey: 'signup_forms',
    file: 'signup.js'
  },
  {
    objectKey: 'auth_forgotPassword_form',
    file: 'forgotpassword.js'
  },
  {
    objectKey: 'auth_login_form',
    file: 'login.js'
  },
  {
    objectKey: 'eventPledge_form',
    file: 'pledge.js'
  },
  {
    objectKey: 'auth_resetPassword_form',
    file: 'resetPassword.js'
  },
  {
    objectKey: 'profileUpdate_forms',
    file: 'editProfile.js'
  },
  {
    objectKey: 'plantProject_form',
    file: 'plantProject.js'
  }
];

axios
  .get('https://www.trilliontreecampaign.org/public/v1.0/en/forms')
  .then(response => {
    if (response.status >= 200 && response.status < 300) {
      return response;
    } else {
      let error = new Error(response);
      throw error;
    }
  })
  .then(response => {
    for (let i in list) {
      fs.writeFile(
        './app/server/formSchemas/temp.js',
        'export default ' + JSON.stringify(response.data),
        function(err) {
          if (err) {
            return console.log(err);
          }

          console.log('The file was saved!');
        }
      );
      if (list[i].file === 'signup.js') {
        for (let type of Object.keys(response.data[list[i].objectKey])) {
          response.data[list[i].objectKey][type] =
            response.data[list[i].objectKey][type].schema;
        }
        fs.writeFile(
          './app/server/formSchemas/' + list[i].file,
          'export default ' + JSON.stringify(response.data[list[i].objectKey]),
          function(err) {
            if (err) {
              return console.log(err);
            }

            console.log('The file was saved!');
          }
        );
      } else if (list[i].file === 'registerTrees.js') {
        let newFormat = {};
        for (let type of Object.keys(response.data[list[i].objectKey].data)) {
          newFormat[type] = response.data[list[i].objectKey].data[type].schema;
        }
        fs.writeFile(
          './app/server/formSchemas/' + list[i].file,
          'export default ' + JSON.stringify(newFormat),
          function(err) {
            if (err) {
              return console.log(err);
            }

            console.log('The file was saved!');
          }
        );
      } else if (list[i].file === 'editProfile.js') {
        fs.writeFile(
          './app/server/formSchemas/' + list[i].file,
          'export default ' + JSON.stringify(response.data[list[i].objectKey]),
          function(err) {
            if (err) {
              return console.log(err);
            }

            console.log('The file was saved!');
          }
        );
      } else {
        fs.writeFile(
          './app/server/formSchemas/' + list[i].file,
          'export default ' +
            JSON.stringify(response.data[list[i].objectKey].data.schema),
          function(err) {
            if (err) {
              return console.log(err);
            }

            console.log('The file was saved!');
          }
        );
      }
    }
  })
  .catch(err => console.log(err));
