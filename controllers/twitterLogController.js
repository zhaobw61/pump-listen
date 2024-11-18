import { getTwitterLogService } from '../services/twitterLogService.js';

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
    hotItem['lastScore'] = tweetList
      .map((logItem) => {
        return (
          logItem.reply_count * 0.15 +
          logItem.favorite_count * 0.1 +
          Number(logItem.view_count) * 0.1 +
          logItem.retweet_count * 0.2
        );
      })
      .reduce((acc, curr) => acc + curr, 0);
    hotItem['topScore'] = topTweetList
      .map((logItem) => {
        return (
          logItem.reply_count * 0.15 +
          logItem.favorite_count * 0.1 +
          Number(logItem.view_count) * 0.1 +
          logItem.retweet_count * 0.2
        );
      })
      .reduce((acc, curr) => acc + curr, 0);
    hotItem['caTwitterScore'] = lastTweetList
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
  console.log(hotList);
  res.status(200).json({ success: true, data: hotList });
};
