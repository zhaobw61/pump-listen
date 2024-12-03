import axios from 'axios';
let axiosConfig = {};
let axiosInstance;
// if (process.env.NODE_ENV === 'development') {
//   axiosConfig = {
//     proxy: {
//       protocol: 'http',
//       host: '127.0.0.1',
//       port: '7890',
//     },
//   };
// }
axiosInstance = axios.create(axiosConfig);

export default axiosInstance;
