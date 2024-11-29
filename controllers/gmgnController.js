import '../mongooseIndex.js';
import { getHotCoinListService } from '../services/gmgnServices.js';
import { addHotCoinService } from '../services/hotCoinServices.js';

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

let clearPumpInter;
let listenPumpTime = 1000 * 1; // 1分钟
export const startGmgnListen = () => {
  if (clearPumpInter) clearInterval(clearPumpInter);
  clearPumpInter = setInterval(() => {
    getAddressList();
  }, listenPumpTime);
};

console.log('开始gmgn监听热门代币', process.env.NODE_ENV);
