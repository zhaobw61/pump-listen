import {
  getTwitterLogService,
  clearTwitterLogService,
} from '../services/twitterLogService.js';
import { getAllPairListService } from '../services/newPairService.js';
// 获取推特日志
export const getTwitterLog = async (req, res) => {
  const { address } = req.body;
  const data = await getTwitterLogService(address);
  res.status(200).json({ success: true, data });
};

// 获取代币的热度
export const getAddressHot = async (req, res) => {
  const { address } = req.body;
  const logList = await getTwitterLogService(address);
  let hotList = [];
  logList.forEach((item) => {
    let hotItem = {};
    let { tweetList, lastTweetList, topTweetList } = item.logInfo;
    console.log('tweetList', tweetList);
    hotItem['proTweetScore'] =
      tweetList == 'UserNotFound'
        ? 0
        : tweetList
            .map((logItem) => {
              return (
                logItem.reply_count * 0.15 +
                logItem.favorite_count * 0.1 +
                Number(logItem.view_count) * 0.1 +
                logItem.retweet_count * 0.2
              );
            })
            .reduce((acc, curr) => acc + curr, 0);
    hotItem['topScore'] =
      topTweetList == 'UserNotFound'
        ? 0
        : topTweetList
            .map((logItem) => {
              return (
                logItem.reply_count * 0.15 +
                logItem.favorite_count * 0.1 +
                Number(logItem.view_count) * 0.1 +
                logItem.retweet_count * 0.2
              );
            })
            .reduce((acc, curr) => acc + curr, 0);
    hotItem['lastTweetScore'] =
      lastTweetList == 'UserNotFound'
        ? 0
        : lastTweetList
            .map((logItem) => {
              return (
                logItem.reply_count * 0.15 +
                logItem.favorite_count * 0.1 +
                Number(logItem.view_count) * 0.1 +
                logItem.retweet_count * 0.2
              );
            })
            .reduce((acc, curr) => acc + curr, 0);
    hotItem['time'] = item.time;
    hotList.push(hotItem);
  });
  res.status(200).json({ success: true, data: hotList });
};

let clearLogInter;
let spareNum = 120,
  clearLogTime = 1000 * 60 * 10;
// 删除日志
export const startClearTwitterLog = async () => {
  if (clearLogInter) clearInterval(clearLogInter);
  clearLogInter = setInterval(async () => {
    const pairList = await getAllPairListService();
    pairList.forEach((item) => {
      const { address } = item;
      clearTwitterLogService(address, spareNum);
    });
  }, clearLogTime);
};
