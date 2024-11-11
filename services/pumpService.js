import axios from 'axios';
const axiosInstance = axios.create({
  proxy: {
    protocol: 'http',
    host: '127.0.0.1',
    port: '7890',
  },
});

// 获取代币的列表
const getAddressListService = async () => {
  const res = await axiosInstance.get(
    'https://advanced-api.pump.fun/coins/creation-time?marketCapFrom=8000&numHoldersFrom=20'
  );
  const data = res.data;
  return data;
};

// 获取代币的详情
const getCoinDetailService = async (coinAddress) => {
  const res = await axiosInstance.get(
    `https://pump.mypinata.cloud/ipfs/${coinAddress}`
  );
  const data = res.data;
  return data;
};

export { getAddressListService, getCoinDetailService };
