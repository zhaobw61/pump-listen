import {
  getAddressListService,
  getCoinDetailService,
} from './services/pumpService.js';
import './mongooseIndex.js';
import { addPairService, getPairService } from './services/newPairService.js';

async function getAddressList() {
  const list = await getAddressListService();
  console.log('list', list.length);
  if (list && list.length) {
    list.forEach(async (item) => {
      const checkRes = await getPairService({
        address: item.coinMint,
      });
      console.log('checkRes', checkRes);
      if (checkRes === null) {
        const detailData = await getCoinDetailService(item.coinMint);
        const cleanedText = detailData.replace(/\\[nt"\\]/g, '');
        const regex = /twitter:https:\/\/x\.com\/[a-zA-Z0-9_]+/;
        const matchRes = cleanedText.match(regex);
        if (matchRes) {
          const addRes = await addPairService({
            address: item.coinMint,
            ticker: item.ticker,
            imageUrl: item.imageUrl,
            creationTime: item.creationTime,
            twitterAccount: matchRes[0].split('twitter:')[1],
          });
        }
      }
    });
  }
  console.log('end');
}

getAddressList();
