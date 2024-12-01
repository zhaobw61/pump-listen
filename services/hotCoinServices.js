import hotCoin from '../models/hotCoinModels.js';
import { clearTwitterLogService } from '../services/lastTwitterLogService.js';
// 添加新的热门币种
export const addHotCoinService = async (params) => {
  const scoreRes = await hotCoin.findOne({
    address: params.address,
  });
  if (scoreRes == null) {
    let res = await new hotCoin(params).save();
    return res;
  }
};

// 删除热门币种
export const delHotCoinService = async (params) => {
  const res = await hotCoin.findOneAndDelete({
    address: params.address,
  });
  clearTwitterLogService(params.address, 0);
  return res;
};

// 查找热门币种
export const findHotCoinService = async (address) => {
  const res = await hotCoin.findOne({
    address: address,
  });
  return res;
};

// 查询所有热门币种
export const getAllHotCoinService = async () => {
  const list = await hotCoin.find();
  return list;
};
