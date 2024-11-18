import twitterLog from '../models/twitterLog.js';

// 查询一个交易对
export const getTwitterLogService = async (address) => {
  console.log(address);
  const logRes = await twitterLog.find({
    address: address,
  });
  return logRes;
};
