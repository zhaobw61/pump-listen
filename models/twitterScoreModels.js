import mongoose from 'mongoose';
const twitterScoreSchema = new mongoose.Schema({
  // address
  twitterName: {
    type: String,
  },
  // 推特账户
  twitterScore: {
    type: String,
  },
});

const twitterScore = mongoose.model('TwitterScore', twitterScoreSchema);
export default twitterScore;
