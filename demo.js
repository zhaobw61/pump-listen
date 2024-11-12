import cryptoJS from 'crypto-js';
import axios from 'axios';
const apiBaseUrl = 'https://www.okx.com/'; // Define the underlying path of the request
const secretKey = '385EC9036801FF22A8F600B7F793D021'; // The key obtained from the previous application
const apiKey = '89193b17-8abe-4a9d-89c4-c49315d833ae'; // The api Key obtained from the previous application
const passphrase = '9ol.)P:?'; // The password created when applying for the key
const date = new Date(); // Get the current time
const timestamp = date.toISOString(); // Convert the current time to the desired format
// Construct full API request URL
const getRequestUrl = (apiBaseUrl, api, queryParams) => {
  return apiBaseUrl + api + '?' + new URLSearchParams(queryParams).toString();
};

/*
'/api/v5/wallet/token/token-detail?chainIndex=56&tokenAddress=0x6f620ec89b8479e97a6985792d0c64f237566746'
*/

const apiRequestUrl = getRequestUrl('', '/api/v5/wallet/token/token-detail', {
  chainIndex: 501,
  tokenAddress: 'BRVpaB8sPhXzGzNamK4X3xR9NVu9ZtH2tEjnWNwapump',
});
const headersParams = {
  'Content-Type': 'application/json',
  'OK-ACCESS-KEY': apiKey,
  'OK-ACCESS-SIGN': cryptoJS.enc.Base64.stringify(
    cryptoJS.HmacSHA256(timestamp + 'GET' + apiRequestUrl, secretKey)
  ),
  'OK-ACCESS-TIMESTAMP': timestamp,
  'OK-ACCESS-PASSPHRASE': passphrase,
};
console.log(apiRequestUrl);
console.log(headersParams);

const axiosInstance = axios.create({
  baseURL: apiBaseUrl,
  headers: headersParams,
  proxy: {
    protocol: 'http',
    host: '127.0.0.1',
    port: '7890',
  },
});
console.log('start');
const res = await axiosInstance.get(apiRequestUrl);
console.log(res.data);
const data = res.data;
console.log('end');
