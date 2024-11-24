import express from 'express';
import routes from './routes/index.js';
import './mongooseIndex.js';
import { startPumpListen } from './controllers/pumpController.js';
import { startListenTwitterLog } from './controllers/twitterLogController.js';

const app = express();
const port = 3000;

app.use(express.json());
app.use('/api', routes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

startPumpListen(); // 监听pump
startListenTwitterLog(); // 监听推特
