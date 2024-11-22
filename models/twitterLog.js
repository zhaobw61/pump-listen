import mongoose from 'mongoose';
const twitterLogSchema = new mongoose.Schema({
  // 时间
  time: {
    type: Number,
  },
  // address
  address: {
    type: String,
  },
  // 推特账户
  twitterAccountName: {
    type: String,
  },
  // 推特信息
  logInfo: {
    type: Object,
  },
  // 检查新的推特，并且估计分数
  checkNewTwitterStatus: {
    type: Boolean,
    default: false,
  },
});

const twitterLog = mongoose.model('TwitterLog', twitterLogSchema);
export default twitterLog;
