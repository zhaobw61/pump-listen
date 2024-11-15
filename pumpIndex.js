import './mongooseIndex.js';
import {
  getAddressListService,
  getCoinDetailService,
} from './services/pumpService.js';
import { addPairService, getPairService } from './services/newPairService.js';

async function getAddressList() {
  const list = await getAddressListService();
  if (list && list.length) {
    list.forEach(async (item) => {
      const checkRes = await getPairService({
        address: item.coinMint,
      });
      if (checkRes === null) {
        console.log('find new address');
        const detailData = await getCoinDetailService(item.coinMint);
        if (detailData === false) return;
        const cleanedText = detailData.replace(/\\[nt"\\]/g, '');
        const regex = /twitter:https:\/\/x\.com\/[a-zA-Z0-9_]+/;
        const matchRes = cleanedText.match(regex);
        const addRes = await addPairService({
          address: item.coinMint,
          ticker: item.ticker,
          imageUrl: item.imageUrl,
          creationTime: item.creationTime,
          twitterAccount: matchRes ? matchRes[0].split('twitter:')[1] : false,
        });
        if (addRes) {
          console.log('add success');
        }
      }
    });
  }
}

setInterval(() => {
  getAddressList();
}, 1000 * 60 * 5); // 5分钟
getAddressList();
console.log('listen pump start');
