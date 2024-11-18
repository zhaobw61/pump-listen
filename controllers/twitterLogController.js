import { getTwitterLogService } from '../services/twitterLogService.js';

export const getTwitterLog = async (req, res) => {
  const { address } = req.body;
  const data = await getTwitterLogService(address);
  res.status(200).json({ success: true, data });
};
