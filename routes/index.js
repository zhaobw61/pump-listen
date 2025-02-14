import express from 'express';
import {
  apiGetPairList,
  apiPostUpdatePair,
  apiDeletePair,
  apiGetHotCoinList,
  apiGetProgressCoinList,
  apiGetOpenedCoinList,
} from '../controllers/pairController.js';

var app = express.Router();

// 获取代币的列表
app.get('/pairlist', apiGetPairList);

// 更新代币信息
app.post('/updatePair', apiPostUpdatePair);

// 删除交易对
app.post('/deletePair', apiDeletePair);

// 获取热门代币
app.get('/hotCoinlist', apiGetHotCoinList);

// 获取即将打满代币
app.get('/progressCoinList', apiGetProgressCoinList);

// 获取已开盘代币
app.get('/openedCoinList', apiGetOpenedCoinList);

export default app;
