import axios from 'axios';
import fs from 'fs';
axios({
  method: 'get',
  url: 'https://twitter.good6.top/api/base/apitools/search?any=ArZxZDZGPF3uq6rjPtduqi2HSujzGy43reM922depump&apiKey=1547220975078735873OGMweEFHRUFIUzJNEkycG54ZW54SEp&product=Latest',
})
  .then(function (response) {
    console.log(response.data.data);
  })
  .catch(function (error) {
    console.log(error);
  });
