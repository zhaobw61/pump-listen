import '../mongooseIndex.js';
import { getHotCoinListService } from '../services/gmgnServices.js';
import {
  addHotCoinService,
  delHotCoinService,
} from '../services/hotCoinServices.js';
import hotCoin from '../models/hotCoinModels.js';

async function getAddressList() {
  const res = await getHotCoinListService();
  let list = res?.data?.rank;
  if (list && list.length) {
    for (let i = 0; i < 3; i++) {
      let item = list[i];
      if (item.creator_close) {
        addHotCoinService({
          address: item.address,
          creatTime: new Date().getTime(),
        });
      }
    }
  }
}

const deleteOverduHotCoin = async () => {
  const coinCount = await hotCoin.countDocuments();
  const spareNum = coinCount - 10;
  if (spareNum > 0) {
    const results = await hotCoin.find().sort({ _id: 1 });
    const deleteList = results.splice(0, spareNum);
    // 获取需要删除的文档的id
    const excessIds = deleteList.map((doc) => doc._id);
    // 删除多余的文档
    hotCoin.deleteMany({ _id: { $in: excessIds } });
    // 删除推特日志
    deleteList.forEach((item) => {
      delHotCoinService({
        address: item.address,
      });
    });
  }
};

let clearPumpInter;
let listenPumpTime = 1000 * 1; // 1分钟
export const startGmgnListen = () => {
  if (clearPumpInter) clearInterval(clearPumpInter);
  clearPumpInter = setInterval(() => {
    getAddressList();
    deleteOverduHotCoin();
  }, listenPumpTime);
};

console.log('开始gmgn监听热门代币', process.env.NODE_ENV);
