import moment from 'moment';
import {
  addTwitterLogService,
  filterTwitterLogService,
} from '../services/lastTwitterLogService.js';
import { getAllHotCoinService } from '../services/hotCoinServices.js';
import { getAllProgressCoinService } from '../services/progressCoinServices.js';
import { getLastSearchServices } from '../services/twitterApiServices.js';

import {
  checkScoreService,
  addScoreService,
  findScoreService,
} from '../services/twitterScoreServices.js';

import { sendMessage } from '../services/discordServices.js';

// 查询分数
const findScore = async (userscreenName) => {
  let findRes = await findScoreService(userscreenName);
  if (findRes === null) {
    const scoreInfo = await checkScoreService(userscreenName);
    if (scoreInfo === false) {
      return false;
    }
    await addScoreService({
      twitterName: userscreenName,
      twitterScore: scoreInfo.score,
    });
    return scoreInfo.score;
  } else {
    return findRes.twitterScore;
  }
};

function getUtcTimeDifferenceInMinutes(now, previousUtcTime) {
  const previous = new Date(previousUtcTime); // 将之前的 UTC 时间字符串解析为 Date 对象

  // 计算时间差（毫秒）
  const differenceMs = now.getTime() - previous.getTime();

  // 转换为分钟
  const differenceMinutes = Math.floor(differenceMs / (1000 * 60));

  return differenceMinutes;
}

// 添加新的推特记录
const addTwitterLog = async (list, searchContent, cointType) => {
  let oneMinutePeopleNum = 0;
  const now = new Date(); // 获取当前时间
  for (let i = 0; i < list.length; i++) {
    if (getUtcTimeDifferenceInMinutes(now, list[i].created_at) > 1) {
      break;
    }
    oneMinutePeopleNum++;
    const findRes = await filterTwitterLogService({
      tweet_id: list[i].tweet_id,
    });
    if (findRes) {
      break;
    }
    let twitterScore = await findScore(list[i].screen_name);
    if (twitterScore == false) return;
    if (twitterScore > 500) {
      const createdAtTime = moment(list[i].created_at).format(
        'YYYY-MM-DD HH:mm:ss'
      );
      if (cointType == 'HOT') {
        sendMessage({
          content: `排行榜合约地址 ${searchContent} 用户名 ${list[i].screen_name} 推特分数 ${twitterScore} 推特创建时间 ${createdAtTime}`,
          username: '排行榜-警报',
        });
      } else if (cointType == 'PROGRESS') {
        sendMessage({
          content: `内转外合约地址 ${searchContent} 用户名 ${list[i].screen_name} 推特分数 ${twitterScore} 推特创建时间 ${createdAtTime}`,
          username: '内转外-警报',
        });
      }
    }
    addTwitterLogService({
      address: searchContent,
      tweet_id: list[i].tweet_id,
      user_id: list[i].user_id,
      text: list[i].text,
      created_at: list[i].created_at,
      screen_name: list[i].screen_name,
      twitterScore: twitterScore,
      cointType: cointType,
    });
  }
  if (oneMinutePeopleNum >= 4) {
    if (cointType == 'HOT') {
      sendMessage({
        content: `排行榜合约地址 ${searchContent} 人数 ${oneMinutePeopleNum}`,
        username: '人数-警报',
      });
    } else if (cointType == 'PROGRESS') {
      sendMessage({
        content: `内转外合约地址 ${searchContent} 人数 ${oneMinutePeopleNum}`,
        username: '人数-警报',
      });
    }
  }
};

// 监听热门币种
const listenHotCoin = async () => {
  let index = 0;
  setInterval(async () => {
    const hotCoinList = await getAllHotCoinService();
    if (hotCoinList.length == 0) return;
    let item = hotCoinList[index];
    const twitterSearchList = await getLastSearchServices(item.address);
    if (twitterSearchList.tweets) {
      addTwitterLog(twitterSearchList.tweets, item.address, 'HOT');
    }
    index++;
    if (index > hotCoinList.length - 1) {
      index = 0;
    }
  }, 1000);
};

// 监听即将打满币种
const listenProgressCoin = async () => {
  let index = 0;
  setInterval(async () => {
    const progressCoinList = await getAllProgressCoinService();
    if (progressCoinList.length == 0) return;
    let item = progressCoinList[index];
    const twitterSearchList = await getLastSearchServices(item.address);
    if (twitterSearchList.tweets) {
      addTwitterLog(twitterSearchList.tweets, item.address, 'PROGRESS');
    }
    index++;
    if (index > progressCoinList.length - 1) {
      index = 0;
    }
  }, 1000);
};

// 更新热门推特记录
export const startListenTwitterLog = async () => {
  listenHotCoin(); // 监听热门币种
  listenProgressCoin(); // 监听即将打满币种
};
