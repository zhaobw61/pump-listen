import '../mongooseIndex.js';
import { getHotCoinListService } from '../services/gmgnServices.js';
import { addHotCoinService } from '../services/hotCoinServices.js';
import hotCoin from '../models/hotCoinModels.js';

async function getAddressList() {
  const res = await getHotCoinListService();
  let list = res?.data?.rank;
  if (list && list.length) {
    for (let i = 0; i < 3; i++) {
      let item = list[i];
      addHotCoinService({
        address: item.address,
        creatTime: new Date().getTime(),
      });
    }
  }
}

const deleteOverduHotCoin = async () => {
  const coinCount = await hotCoin.countDocuments();
  const spareNum = coinCount - 30;
  if (spareNum > 0) {
    const results = await hotCoin.find().sort({ _id: 1 });
    // 获取需要删除的文档的id
    const excessIds = results.splice(0, spareNum).map((doc) => doc._id);
    // 删除多余的文档
    await hotCoin.deleteMany({ _id: { $in: excessIds } });
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
