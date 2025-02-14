import '../mongooseIndex.js';
import { getProgressCoinListService } from '../services/gmgnServices.js';
import {
  addProgressCoinService,
  delProgressCoinService,
} from '../services/progressCoinServices.js';
import progressCoin from '../models/progressCoinModels.js';

async function getProgressCoinAddressList() {
  const res = await getProgressCoinListService();
  let list = res?.data?.rank;
  if (list && list.length) {
    for (let i = 0; i < list.length; i++) {
      let item = list[i];
      addProgressCoinService({
        address: item.address,
        symbol: item.symbol,
        creatTime: new Date().getTime(),
      });
      // // 即将打满
      // if (item.progress == '1') {
      //   addProgressCoinService({
      //     address: item.address,
      //     symbol: item.symbol,
      //     creatTime: new Date().getTime(),
      //   });
      // }
    }
  }
}

const deleteOverduProgressCoin = async () => {
  const coinlist = await progressCoin.find().sort({ _id: 1 });
  for (let i = 0; i < coinlist.length; i++) {
    // 获取当前时间的时间戳
    const now = Date.now(); // 当前时间（以毫秒为单位）

    // 假设有一个时间，比如过去的某个时间
    const pastTime = coinlist[i].creatTime; // 示例：过去时间的时间戳

    // 判断时间是否超过 8 分钟
    const eightMinutesInMs = 2 * 60 * 1000; // 8 分钟转换为毫秒
    if (now - pastTime > eightMinutesInMs) {
      delProgressCoinService({
        address: coinlist[i].address,
      });
    }
  }
};

let clearProgressCoinInter;
let listenPumpTime = 1000 * 3;
export const startProgressCoinListen = () => {
  if (clearProgressCoinInter) clearInterval(clearProgressCoinInter);
  clearProgressCoinInter = setInterval(() => {
    getProgressCoinAddressList();
    deleteOverduProgressCoin();
  }, listenPumpTime);
};

console.log('开始gmg监听即将打满代币', process.env.NODE_ENV);
