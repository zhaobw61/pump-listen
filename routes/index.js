import express from 'express';
import {
  apiGetPairList,
  apiPostUpdatePair,
  apiDeletePair,
} from '../controllers/pairController.js';
var app = express.Router();

// 获取代币的列表
app.get('/pairlist', apiGetPairList);

// 更新代币信息
app.post('/updatePair', apiPostUpdatePair);

// 删除交易对
app.post('/deletePair', apiDeletePair);

export default app;
