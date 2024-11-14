import axios from 'axios';
// const axiosInstance = axios.create({
//   proxy: {
//     protocol: 'http',
//     host: '127.0.0.1',
//     port: '7890',
//   },
// });
const axiosInstance = axios.create();
// 获取代币的列表
const getAddressListService = async () => {
  try {
    const res = await axiosInstance.get(
      'https://advanced-api.pump.fun/coins/creation-time?marketCapFrom=8000&numHoldersFrom=20'
    );
    const data = res.data;
    return data;
  } catch (error) {
    console.log('获取代币列表出错');
    return false;
  }
};

// 获取代币的详情
const getCoinDetailService = async (coinAddress) => {
  try {
    const res = await axiosInstance.get(
      ` https://pump.fun/coin/${coinAddress}`
    );
    const data = res.data;
    return data;
  } catch (error) {
    console.log('获取代币详情出错');
    return false;
  }
};

export { getAddressListService, getCoinDetailService };
