import mongoose from 'mongoose';
console.log('mongoose', process.env.NODE_ENV);
// 本地测试
const dbName = 'pump-listen';
let dbUrl = '127.0.0.1';
if (process.env.NODE_ENV === 'development') {
  dbUrl = '43.155.83.101';
} else {
  dbUrl = '127.0.0.1';
}

const otherString =
  'directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.1.0';
const replicaSet = 'rs0';
const port = 27017;
mongoose
  .connect(
    `mongodb://${dbUrl}:${port}/${dbName}?${otherString}&replicaSet=${replicaSet}`,
    {}
  )
  .then(() => console.warn('服务器连接成功'))
  .catch((err) => console.error('error: 服务器连接失败', err));
