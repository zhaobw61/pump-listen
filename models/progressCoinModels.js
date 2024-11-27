import mongoose from 'mongoose';
const progressCoinSchema = new mongoose.Schema({}, { strict: false });

const progressCoin = mongoose.model('progressCoin', progressCoinSchema);
export default progressCoin;
