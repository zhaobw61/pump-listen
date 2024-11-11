import { getAddressListService } from './services/pumpService.js';

async function getAddressList() {
  const list = await getAddressListService();
  console.log(list[0]);
}

getAddressList();
