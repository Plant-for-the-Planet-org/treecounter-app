const axios = require('axios');
const fs = require('fs');

const list = [
  {
    api: 'https://www.trilliontreecampaign.org/public/v1.0/en/forms',
    file: 'signup.js'
  }
];

for (let i in list) {
  axios
    .get(list[i]['api'])
    .then(response => {
      if (response.status >= 200 && response.status < 300) {
        return response;
      } else {
        let error = new Error(response);
        throw error;
      }
    })
    .then(response => {
      console.log(JSON.stringify(response.data.targetUpdate_form.data.schema));
      fs.writeFile(
        './app/server/formSchemas/' + list[i]['file'],
        'export default ' +
          JSON.stringify(response.data.targetUpdate_form.data.schema),
        function(err) {
          if (err) {
            return console.log(err);
          }

          console.log('The file was saved!');
        }
      );
    })
    .catch(err => console.log(err));
}
