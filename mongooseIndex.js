import mongoose from 'mongoose';
// 本地测试
const dbName = 'pump-listen';
const otherString =
  'directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.1.0';
const replicaSet = 'rs0';
const port = 27017;
console.log(
  `mongodb://127.0.0.1:${port}/${dbName}?${otherString}&replicaSet=${replicaSet}`
);
mongoose
  .connect(
    `mongodb://127.0.0.1:${port}/${dbName}?${otherString}&replicaSet=${replicaSet}`,
    {}
  )
  .then(() => console.warn('服务器连接成功'))
  .catch((err) => console.error('error: 服务器连接失败', err));
