import express from 'express';
import routes from './routes/index.js';
import './mongooseIndex.js';

// import { startGmgnListen } from './controllers/gmgnController.js';
import { startProgressCoinListen } from './controllers/progressCoinController.js';
import { startOpenedCoinListen } from './controllers/openedCoinController.js';
import { startListenTwitterLog } from './controllers/twitterLogController.js';

const app = express();
const port = 3000;

app.use(express.json());
app.use('/api', routes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// startGmgnListen(); // 监听已打满币种
startProgressCoinListen(); // 监听即将打满币种 有就推送
startOpenedCoinListen(); // 监听已开盘币种
startListenTwitterLog(); // 监听推特
