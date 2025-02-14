import opendedCoin from '../models/opendedCoinModels.js';
import { clearTwitterLogService } from '../services/lastTwitterLogService.js';
// 添加新的热门币种
export const addOpenedCoinService = async (params) => {
  const scoreRes = await opendedCoin.findOne({
    address: params.address,
  });
  if (scoreRes == null) {
    let res = await new opendedCoin(params).save();
    return res;
  }
};

// 删除热门币种
export const delOpenedCoinService = async (params) => {
  const res = await opendedCoin.findOneAndDelete({
    address: params.address,
  });
  clearTwitterLogService(params.address, 0);
  return res;
};

// 查找热门币种
export const findOpenedCoinService = async (address) => {
  const res = await opendedCoin.findOne({
    address: address,
  });
  return res;
};

// 查询所有热门币种
export const getAllOpenedCoinService = async () => {
  const list = await opendedCoin.find();
  return list;
};
