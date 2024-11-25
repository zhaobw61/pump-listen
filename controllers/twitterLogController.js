import {
  getTwitterLogService,
  addTwitterLogService,
  filterTwitterLogService,
} from '../services/lastTwitterLogService.js';
import { getAllPairListService } from '../services/newPairService.js';
import { getLastSearchServices } from '../services/twitterApiServices.js';
import lastTwitterlogs from '../models/lastTwitterLogs.js';
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

// 添加新的推特记录
const addTwitterLog = async (list, searchContent) => {
  for (let i = 0; i < list.length; i++) {
    const findRes = await filterTwitterLogService({
      tweet_id: list[i].tweet_id,
    });
    if (findRes) {
      break;
    }
    let twitterScore = await findScore(list[i].user.screen_name);
    if (twitterScore == false) return;
    if (twitterScore > 300) {
      sendMessage({
        content: `合约地址 ${searchContent} 用户名 ${list[i].user.screen_name} 推特分数 ${twitterScore} 时间 ${list[i].created_at}`,
        username: '警报狗',
      });
    }
    addTwitterLogService({
      tweet_id: list[i].tweet_id,
      user_id: list[i].user_id,
      text: list[i].text,
      created_at: list[i].created_at,
      screen_name: list[i].user.screen_name,
      twitterScore: twitterScore,
    });
  }
};

let listenTwitterInter;
let listenTwitterTime = 1000 * 30;

// 更新推特记录
export const startListenTwitterLog = async () => {
  if (listenTwitterInter) clearInterval(listenTwitterInter);
  listenTwitterInter = setInterval(async () => {
    const pairList = await getAllPairListService();
    pairList.forEach(async (item) => {
      const twitterSearchList = await getLastSearchServices(item.address);
      if (twitterSearchList.tweets) {
        addTwitterLog(twitterSearchList.tweets, item.address);
      }
    });
  }, listenTwitterTime);
};
