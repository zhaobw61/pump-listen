import '../mongooseIndex.js';
import { getProgressCoinListService } from '../services/gmgnServices.js';
import { addProgressCoinService } from '../services/progressCoinServices.js';

async function getProgressCoinAddressList() {
  const res = await getProgressCoinListService();
  let list = res?.data?.rank;
  if (list && list.length) {
    for (let i = 0; i < list.length; i++) {
      let item = list[i];
      addProgressCoinService({
        address: item.address,
        creatTime: new Date().getTime(),
      });
    }
  }
}

let clearPumpInter;
let listenPumpTime = 1000 * 60 * 5; // 5分钟
export const startProgressCoinListen = () => {
  // if (clearPumpInter) clearInterval(clearPumpInter);
  // clearPumpInter = setInterval(() => {
  //   getAddressList();
  // }, listenPumpTime);
  getProgressCoinAddressList();
};

console.log('开始gmgn监听热门代币', process.env.NODE_ENV);
