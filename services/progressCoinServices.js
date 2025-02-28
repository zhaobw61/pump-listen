import progressCoin from '../models/progressCoinModels.js';
// 添加新的热门币种
export const addProgressCoinService = async (params) => {
  const scoreRes = await progressCoin.findOne({
    address: params.address,
  });
  if (scoreRes == null) {
    let res = await new progressCoin(params).save();
    return res;
  }
};

// 删除热门币种
export const delProgressCoinService = async (params) => {
  const res = await progressCoin.findOneAndDelete({
    address: params.address,
  });
  return res;
};

// 查找热门币种
export const findProgressCoinService = async (address) => {
  const res = await progressCoin.findOne({
    address: address,
  });
  return res;
};

// 查询所有热门币种
export const getAllProgressCoinService = async () => {
  const list = await progressCoin.find();
  return list;
};

// 给即将开盘的代币添加推特用户信息
export const addTwitterUserInfoToOpenedCoinService = async (params) => {
  let res = await progressCoin.updateOne(
    {
      address: params.address,
    },
    { $set: { ...params } }
  );
  return res;
};
