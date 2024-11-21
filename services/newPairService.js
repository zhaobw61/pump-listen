import pair from '../models/pairModels.js';

// 添加交易对
const addPairService = async (params) => {
  const pariRes = await pair.findOne({
    address: params.address,
  });
  if (pariRes == null) {
    let res = await new pair(params).save();
    return res;
  }
};
// 查询一个交易对
const getPairService = async (params) => {
  const pariRes = await pair.findOne({
    address: params.address,
  });
  return pariRes;
};

// 查询所有交易对
const getPairListService = async (params) => {
  const { pageIndex = 1, pageSize = 10 } = params;
  const totalCount = await pair.countDocuments();
  const list = await pair
    .find()
    .skip((pageIndex - 1) * pageSize)
    .limit(pageSize)
    .exec();
  return {
    totalCount,
    list,
  };
};

// 查询所有交易对
const getAllPairListService = async () => {
  const list = await pair.find();
  return list;
};

// 删除交易对
const deletePairService = async (address) => {
  const res = await pair.findOneAndDelete({ address: address });
  return res;
};

// 修改交易对
const updatePairService = async (address, params) => {
  const pariRes = await pair.updateOne(
    {
      address: address,
    },
    { $set: { ...params } }
  );
  return pariRes;
};

export {
  addPairService,
  getPairService,
  getPairListService,
  getAllPairListService,
  deletePairService,
  updatePairService,
};
