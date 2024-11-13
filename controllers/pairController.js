import {
  getPairListService,
  updatePairService,
} from '../services/newPairService.js';

export const apiGetPairList = async (req, res) => {
  const { pageIndex = 1, pageSize = 10 } = req.query;
  const data = await getPairListService({ pageIndex, pageSize });
  res.status(200).json({ success: true, data });
};

export const apiPostUpdatePair = async (req, res) => {
  console.log('apiPostUpdatePair', req.body);
  const { address } = req.body;
  updatePairService(address, {
    ...req.body,
  });
  res.status(200).json({ success: true });
};
