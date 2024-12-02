import axios from 'axios';
import fs from 'fs';
axios({
  method: 'get',
  url: 'https://twitter.good6.top/api/base/apitools/search?any=ArZxZDZGPF3uq6rjPtduqi2HSujzGy43reM922depump&apiKey=1547220975078735873OGMweEFHRUFIUzJNEkycG54ZW54SEp&product=Latest',
})
  .then(function (response) {
    fs.writeFile('./xxx.json', response.data.data, (err) => {
      if (err) {
        console.error(err);
      }
      // file written successfully
    });
  })
  .catch(function (error) {
    console.log(error);
  });

// const options = { method: 'GET', headers: { accept: '*/*' } };

// fetch(
//   'https://twitter.good6.top/api/base/apitools/search?any=ArZxZDZGPF3uq6rjPtduqi2HSujzGy43reM922depump&apiKey=1547220975078735873OGMweEFHRUFIUzJNEkycG54ZW54SEp',
//   options
// )
//   .then((res) => res.json())
//   .then((res) => console.log(res))
//   .catch((err) => console.error(err));
