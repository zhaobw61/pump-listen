import twitterLog from '../models/twitterLog.js';

// 查询日志
export const getTwitterLogService = async (
  address,
  logNum = 60 * 4,
  sort = 1
) => {
  const results = await twitterLog
    .find({ address: address })
    .sort({ _id: sort }) // 1 是增序 -1 是降序
    .limit(logNum);
  return results;
};

// 定时删除日志
// count 是保留的数量
export const clearTwitterLogService = async (address, count) => {
  const logCount = await twitterLog.countDocuments({ address: address });
  const spareNum = logCount - count;
  if (spareNum > 0) {
    const results = await twitterLog
      .find({ address: address }, { _id: 1 })
      .sort({ _id: 1 });
    // 获取需要删除的文档的id
    const excessIds = results.splice(0, spareNum).map((doc) => doc._id);
    // 删除多余的文档
    await twitterLog.deleteMany({ _id: { $in: excessIds } });
  }
};
