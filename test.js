import axios from 'axios';
import fs from 'fs';
axios({
  method: 'get',
  url: 'https://api.apidance.pro/sapi/Search?q=7RVwnhX56GaYQcsxisJ7wCaMMnJam7TNjYiNm9tGpump&cursor&sort_by=Latest',
  headers: {
    apikey: 'gx8oca02jom03zrtf0ef5ign86ahdi',
  },
  // redirect: 'follow',
})
  .then(function (response) {
    fs.writeFile('./zzz.js', JSON.stringify(response.data), (err) => {
      if (err) {
        console.error(err);
      }
      // file written successfully
    });
    console.log(JSON.stringify(response.data));
  })
  .catch(function (error) {
    console.log(error);
  });
