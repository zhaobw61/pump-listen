import express from 'express';
import {
  apiGetPairList,
  apiPostUpdatePair,
  apiDeletePair,
} from '../controllers/pairController.js';

import { getTwitterLog } from '../controllers/twitterLogController.js';
var app = express.Router();

// 获取代币的列表
app.get('/pairlist', apiGetPairList);

// 更新代币信息
app.post('/updatePair', apiPostUpdatePair);

// 删除交易对
app.post('/deletePair', apiDeletePair);

// 获取推特日志
app.post('/getTwitterLog', getTwitterLog);

export default app;
