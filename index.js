import { getAddressListService } from './services/pumpService.js';
import './mongooseIndex.js';
import { addPairService } from './services/newPairService.js';

async function getAddressList() {
  const list = await getAddressListService();
  if (list && list.length) {
    list.forEach(async (item) => {
      const addRes = await addPairService({
        address: item.coinMint,
        ticker: item.ticker,
        imageUrl: item.imageUrl,
        creationTime: item.creationTime,
      });
      console.log('addRes', addRes);
    });
  }
}

getAddressList();
