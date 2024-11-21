import { getAllPairListService } from '../services/newPairService.js';
import { getTwitterLogService } from '../services/twitterLogService.js';
import { sendMessage } from '../services/discordServices.js';
let alarmInter;
let alarmTime = 1000 * 60 * 1; // 1分钟

// 开始警报
export const startAlarm = async () => {
  console.log('开始警报');
  if (alarmInter) clearInterval(alarmInter);
  alarmInter = setInterval(async () => {
    const pairList = await getAllPairListService();
    pairList.forEach(async (item) => {
      const { address } = item;
      const logList = await getTwitterLogService(address, 2, -1);
      if (logList.length > 0) {
        let hotList = [];
        logList.forEach((item) => {
          let hotItem = {};
          let { tweetList, lastTweetList, topTweetList } = item.logInfo;
          hotItem['lastScore'] =
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
          hotItem['caTwitterScore'] =
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
          hotList.push(hotItem);
        });
        let newCount =
          hotList[0].lastScore +
          hotList[0].topScore +
          hotList[0].caTwitterScore;
        let oldCount =
          hotList[hotList.length - 1].lastScore +
          hotList[hotList.length - 1].topScore +
          hotList[hotList.length - 1].caTwitterScore;
        let averageRate = (newCount - oldCount) / oldCount;
        if (averageRate >= 0.2) {
          sendMessage({
            content: `${address} 热度上涨, 当前热度 ${newCount}`,
            username: '警报狗',
          });
        }
      }
    });
  }, alarmTime);
};
