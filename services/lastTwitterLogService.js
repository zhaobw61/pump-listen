import lastTwitterlogs from '../models/lastTwitterLogs.js';

// 增加新的日志
export const addTwitterLogService = async (params) => {
  let res = await new lastTwitterlogs(params).save();
  return res;
};
// 查询日志
export const getTwitterLogService = async (
  address,
  logNum = 60 * 4,
  sort = 1
) => {
  const results = await lastTwitterlogs
    .find({ address: address })
    .sort({ _id: sort }) // 1 是增序 -1 是降序
    .limit(logNum);
  return results;
};

// 查询所有日志
export const getAllTwitterLogService = async () => {
  const list = await lastTwitterlogs.find();
  return list;
};

// 过滤日志
export const filterTwitterLogService = async (params) => {
  const list = await lastTwitterlogs.findOne(params);
  return list;
};

// 更新日志
export const updateTwitterLogService = async (twitterId, params) => {
  console.log(twitterId, params);
  const list = await lastTwitterlogs.updateOne(
    {
      twitterId: twitterId,
    },
    { $set: { ...params } }
  );
  return list;
};

// 定时删除日志
// count 是保留的数量
export const clearTwitterLogService = async (address, count) => {
  const logCount = await lastTwitterlogs.countDocuments({ address: address });
  const spareNum = logCount - count;
  if (spareNum > 0) {
    const results = await lastTwitterlogs
      .find({ address: address }, { _id: 1 })
      .sort({ _id: 1 });
    // 获取需要删除的文档的id
    const excessIds = results.splice(0, spareNum).map((doc) => doc._id);
    // 删除多余的文档
    await lastTwitterlogs.deleteMany({ _id: { $in: excessIds } });
  }
};
