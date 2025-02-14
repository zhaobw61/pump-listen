import '../mongooseIndex.js';
import { getOpenedCoinListService } from '../services/gmgnServices.js';
import {
    addOpenedCoinService,
    delOpenedCoinService,
} from '../services/openedCoinServices.js';
import openedCoin from '../models/opendedCoinModels.js';

async function getOpenedCoinAddressList() {
  const res = await getOpenedCoinListService();
  let list = res?.data?.pairs;
  if (list && list.length) {
    for (let i = 0; i < 3; i++) {
      let item = list[i];
      addOpenedCoinService({
				address: item.address,
				symbol: item.base_token_info.symbol,
				creatTime: new Date().getTime(),
			});
    }
  }
}

const deleteOverduOpenedCoin = async () => {
  const coinCount = await openedCoin.countDocuments();
  const spareNum = coinCount - 30;
  if (spareNum > 0) {
    const results = await openedCoin.find().sort({ _id: 1 });
    const deleteList = results.splice(0, spareNum);
    // 获取需要删除的文档的id
    const excessIds = deleteList.map((doc) => doc._id);
    // 删除多余的文档
    openedCoin.deleteMany({ _id: { $in: excessIds } });
    // 删除推特日志
    deleteList.forEach((item) => {
      delOpenedCoinService({
        address: item.address,
      });
    });
  }
};

let clearPumpInter;
let listenPumpTime = 1000 * 5; // 1秒钟
export const startOpenedCoinListen = () => {
  if (clearPumpInter) clearInterval(clearPumpInter);
  clearPumpInter = setInterval(() => {
    getOpenedCoinAddressList();
    deleteOverduOpenedCoin();
  }, listenPumpTime);
};

console.log('开始gmgn监听已开盘的代币', process.env.NODE_ENV);
