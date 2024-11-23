import mongoose from 'mongoose';
const lastTwitterlogsSchema = new mongoose.Schema({}, { strict: false });

const lastTwitterlogs = mongoose.model('LastTwitterLog', lastTwitterlogsSchema);
export default lastTwitterlogs;
