import mongoose from 'mongoose';
const pairSchema = new mongoose.Schema({
  // 代币地址
  address: {
    type: String,
    default: '',
  },
  // 代币简称
  ticker: {
    type: String,
    default: '',
  },
  // 代币logo
  imageUrl: {
    type: String,
    default: '',
  },
  // 创建时间
  creationTime: {
    type: String,
    default: '',
  },
  // 推特账户
  twitterAccount: {
    type: String,
    default: '',
  },
  // 电报账户
  telegramAccount: {
    type: String,
    default: '',
  },
});

const pair = mongoose.model('NewPair', pairSchema);
export default pair;
