import mongoose from 'mongoose';
const hotCoinSchema = new mongoose.Schema({}, { strict: false });

const hotCoin = mongoose.model('hotCoin', hotCoinSchema);
export default hotCoin;
