import mongoose from 'mongoose';
const openedCoinSchema = new mongoose.Schema({}, { strict: false });

const openedCoin = mongoose.model('openedCoin', openedCoinSchema);
export default openedCoin;
