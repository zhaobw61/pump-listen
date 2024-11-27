import axios from 'axios';

var config = {
  method: 'get',
  url: 'https://api.apidance.pro/key/gx8oca02jom03zrtf0ef5ign86ahdi',
};

axios(config)
  .then(function (response) {
    console.log(JSON.stringify(response.data));
  })
  .catch(function (error) {
    console.log(error);
  });
