// import axios from 'axios';
// import fs from 'fs';
// axios({
//   method: 'get',
//   url: 'https://twitter.good6.top/api/base/apitools/search?any=ArZxZDZGPF3uq6rjPtduqi2HSujzGy43reM922depump&apiKey=1547220975078735873OGMweEFHRUFIUzJNEkycG54ZW54SEp&product=Latest',
// })
//   .then(function (response) {
//     console.log(JSON.parse(response.data.data));
//     const searchList = JSON.parse(response.data.data);
//     const oriList =
//       searchList.data.search_by_raw_query.search_timeline.timeline
//         .instructions[0].entries;
//     console.log(oriList);
//   })
//   .catch(function (error) {
//     console.log(error);
//   });
import { sendMessage } from './services/discordServices.js';

sendMessage({
  content: `
  内转外
  币名字 xxx
  合约地址 xxxx
  用户名 xxx
  推特分数 xxxx
  推特创建时间 xxx
  `,
  username: '内转外-警报',
});
